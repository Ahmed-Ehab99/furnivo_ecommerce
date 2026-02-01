import { prisma } from "@/lib/db";
import { env } from "@/lib/env";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const headerList = await headers();
  const signature = headerList.get("Stripe-Signature");

  if (!signature) {
    console.error("Missing Stripe signature");
    return new Response("Missing Stripe signature", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (error) {
    console.error("Webhook signature verification failed:", error);
    return new Response("Webhook error", { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === "checkout.session.completed") {
    const orderId = session.metadata?.orderId;
    const userId = session.metadata?.userId;
    const customerId = session.customer as string;

    if (!orderId) {
      console.error("Order ID not found in metadata");
      return new Response("Order ID not found", { status: 400 });
    }

    if (!userId) {
      console.error("User ID not found in metadata");
      return new Response("User ID not found", { status: 400 });
    }

    try {
      // Verify the user
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
          stripeCustomerId: customerId,
        },
      });

      if (!user) {
        console.error("User not found or customer ID mismatch");
        return new Response("User not found", { status: 400 });
      }

      // Update order status
      const order = await prisma.order.update({
        where: {
          id: orderId,
        },
        data: {
          paymentStatus: "PAID",
          status: "PROCESSING",
        },
        include: {
          user: {
            include: {
              cart: true,
            },
          },
        },
      });

      // Clear user's cart
      if (order.user.cart) {
        await prisma.cartItem.deleteMany({
          where: {
            cartId: order.user.cart.id,
          },
        });
      }

      return new Response(null, { status: 200 });
    } catch (error) {
      console.error("Error processing webhook:", error);
      return new Response("Error processing payment", { status: 500 });
    }
  }

  // Return 200 for other event types
  return new Response(null, { status: 200 });
}
