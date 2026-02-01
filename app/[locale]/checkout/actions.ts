"use server";

import { getUser } from "@/app/data/get-user";
import { prisma } from "@/lib/db";
import { env } from "@/lib/env";
import { stripe } from "@/lib/stripe";
import { CheckoutSessionInput } from "@/lib/types";
import { calculateFinalPrice } from "@/lib/utils";
import Stripe from "stripe";

export async function createCheckoutSession(input: CheckoutSessionInput) {
  const user = await getUser();

  try {
    // Check if user already a customer in stripe
    let stripeCustomerId: string;
    const userWithStripeCustomerId = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        stripeCustomerId: true,
      },
    });

    if (userWithStripeCustomerId?.stripeCustomerId) {
      stripeCustomerId = userWithStripeCustomerId.stripeCustomerId;
    } else {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name || undefined,
        metadata: {
          userId: user.id,
        },
      });
      stripeCustomerId = customer.id;

      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          stripeCustomerId,
        },
      });
    }

    // Create delivery address
    const address = await prisma.address.create({
      data: {
        userId: user.id,
        city: input.deliveryAddress.city,
        streetName: input.deliveryAddress.streetName,
        buildingName: input.deliveryAddress.buildingName,
      },
    });

    // Fetch full product details from database
    const productIds = input.items.map((item) => item.productId);
    const productsFromDb = await prisma.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
      select: {
        id: true,
        price: true,
        discount: true,
      },
    });

    // Create a map for quick lookup
    const productMap = new Map(
      productsFromDb.map((p) => [
        p.id,
        {
          price: Number(p.price),
          discount: p.discount ? Number(p.discount) : null,
        },
      ]),
    );

    // Calculate items with correct final prices
    const itemsWithFinalPrices = input.items.map((item) => {
      const dbProduct = productMap.get(item.productId);

      if (!dbProduct) {
        throw new Error(`Product not found: ${item.productId}`);
      }

      const finalPrice = calculateFinalPrice(
        dbProduct.price,
        dbProduct.discount,
      );

      return {
        ...item,
        originalPrice: dbProduct.price,
        discount: dbProduct.discount,
        finalPrice: finalPrice,
      };
    });

    // Calculate total with correct final prices
    const totalAmount = itemsWithFinalPrices.reduce(
      (sum, item) => sum + item.finalPrice * item.quantity,
      0,
    );

    // Generate order number
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Create order with correct prices
    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId: user.id,
        addressId: address.id,
        paymentMethod: input.paymentMethod,
        totalAmount,
        status: "PENDING",
        paymentStatus: "PENDING",
        items: {
          create: itemsWithFinalPrices.map((item) => ({
            product: {
              connect: {
                id: item.productId,
              },
            },
            quantity: item.quantity,
            price: item.finalPrice,
            discount: item.discount,
            productTitle: item.title,
            productPrice: item.originalPrice,
            productDescription: item.description || "",
            productImage: item.image,
            productSlug: item.slug,
            orderLocale: input.locale,
          })),
        },
      },
    });

    const successUrl = `${env.BETTER_AUTH_URL}/${input.locale}/payment/success`;
    const cancelUrl = `${env.BETTER_AUTH_URL}/${input.locale}/payment/cancel`;

    let currency = "usd";
    if (input.paymentMethod === "CARD" && input.locale === "ar") {
      currency = "egp";
    }

    try {
      const checkoutSession = await stripe.checkout.sessions.create({
        customer: stripeCustomerId,
        payment_method_types:
          input.paymentMethod === "CARD" ? ["card"] : ["amazon_pay"],
        line_items: itemsWithFinalPrices.map((item) => {
          const imageUrl = item.image.startsWith("http")
            ? item.image
            : undefined;

          return {
            price_data: {
              currency,
              product_data: {
                name: item.title,
                description: item.description || undefined,
                ...(imageUrl ? { images: [imageUrl] } : {}),
              },
              unit_amount: Math.round(item.finalPrice * 100),
            },
            quantity: item.quantity,
          };
        }),
        mode: "payment",
        success_url: successUrl,
        cancel_url: cancelUrl,
        metadata: {
          orderId: order.id,
          userId: user.id,
        },
      });

      await prisma.order.update({
        where: { id: order.id },
        data: { stripeSessionId: checkoutSession.id },
      });

      await prisma.cart.deleteMany({
        where: {
          userId: user.id,
        },
      });

      return {
        success: true,
        url: checkoutSession.url,
        orderId: order.id,
      };
    } catch (stripeError) {
      console.error("❌ Stripe error:", stripeError);

      // Clean up order
      await prisma.order.delete({
        where: { id: order.id },
      });

      if (stripeError instanceof Stripe.errors.StripeError) {
        console.error("Stripe error details:", {
          type: stripeError.type,
          code: stripeError.code,
          param: stripeError.param,
          message: stripeError.message,
        });

        return {
          success: false,
          error: `Stripe error: ${stripeError.message}`,
        };
      }

      return {
        success: false,
        error:
          stripeError instanceof Error
            ? stripeError.message
            : "Failed to create Stripe session",
      };
    }
  } catch (error) {
    console.error("Create checkout session error:", error);

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to create checkout session",
    };
  }
}

export async function verifyPayment(sessionId: string, orderId: string) {
  try {
    const user = await getUser();

    if (!user) {
      return { success: false, error: "Unauthorized" };
    }

    const stripeSession = await stripe.checkout.sessions.retrieve(sessionId);

    if (stripeSession.payment_status === "paid") {
      await prisma.order.update({
        where: { id: orderId },
        data: {
          paymentStatus: "PAID",
          status: "PROCESSING",
        },
      });

      const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: { user: { include: { cart: true } } },
      });

      if (order?.user.cart) {
        await prisma.cart.deleteMany({
          where: {
            userId: user.id,
          },
        });
      }

      return { success: true };
    }

    return { success: false, error: "Payment not completed" };
  } catch (error) {
    console.error("Verify payment error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to verify payment",
    };
  }
}

export async function getOrder(orderId: string) {
  try {
    const user = await getUser();

    if (!user) {
      return { success: false, error: "Unauthorized" };
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: true,
        address: true,
      },
    });

    if (!order || order.userId !== user.id) {
      return { success: false, error: "Order not found" };
    }

    return { success: true, order };
  } catch (error) {
    console.error("Get order error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to get order",
    };
  }
}

export type CreateCheckoutSessionType = Awaited<
  ReturnType<typeof createCheckoutSession>
>;
export type VerifyPaymentType = Awaited<ReturnType<typeof verifyPayment>>;
export type GetOrderType = Awaited<ReturnType<typeof getOrder>>;
