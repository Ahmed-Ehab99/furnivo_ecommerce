"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export const getUser = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session?.user || null;
};

export const getOrCreateCart = async (userId: string) => {
  let cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          product: {
            include: {
              translations: true,
              images: {
                orderBy: { order: "asc" },
                take: 1,
              },
            },
          },
        },
      },
    },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId },
      include: {
        items: {
          include: {
            product: {
              include: {
                translations: true,
                images: {
                  orderBy: { order: "asc" },
                  take: 1,
                },
              },
            },
          },
        },
      },
    });
  }

  return cart;
};

export const getCart = async (locale: string = "en") => {
  try {
      const user = await getUser();
      
      if (!user) {
      return {
        success: true,
        cart: {
          id: null,
          items: [],
          total: 0,
        },
      };
      }
      
    const cart = await getOrCreateCart(user.id);

    // Format cart items with translated data
    const formattedItems = cart.items.map((item) => {
      const translation = item.product.translations.find(
        (t) => t.locale === locale,
      );
      const image = item.product.images[0];

      return {
        id: item.id,
        productId: item.product.id,
        slug: item.product.slug,
        title: translation?.title || "",
        description: translation?.description || "",
        type: translation?.type || "",
        price: Number(item.product.price),
        discount: item.product.discount ? Number(item.product.discount) : null,
        quantity: item.quantity,
        maxQuantity: item.product.quantity,
        image: image?.url || "",
        imageAlt: image?.alt || "",
      };
    });

    // Calculate total
    const total = formattedItems.reduce((sum, item) => {
      const itemPrice = item.discount || item.price;
      return sum + itemPrice * item.quantity;
    }, 0);

    return {
      success: true,
      cart: {
        id: cart.id,
        items: formattedItems,
        total,
      },
    };
  } catch {
    return { success: false, error: "error.getCart" };
  }
};

export const addToCart = async (productId: string, quantity: number = 1) => {
  try {
    const user = await getUser();

    if (!user) {
      return { success: false, error: "error.requiredAuth" };
    }

    const cart = await getOrCreateCart(user.id);

    // Check if product exists and has stock
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return { success: false, error: "error.productNotFound" };
    }

    if (product.quantity <= 0) {
      return { success: false, error: "error.productOutOfStock" };
    }

    // Validate quantity
    if (quantity < 1) {
      return { success: false, error: "error.invalid-quantity" };
    }

    if (quantity > product.quantity) {
      return { success: false, error: "error.exceedAvailableStock" };
    }

    // Check if item already in cart
    const existingItem = await prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
    });

    if (existingItem) {
      // Check if we can add the requested quantity
      const newQuantity = existingItem.quantity + quantity;

      if (newQuantity > product.quantity) {
        return { success: false, error: "error.exceedAvailableStock" };
      }

      // Update quantity
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: newQuantity },
      });
    } else {
      // Create new cart item with specified quantity
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
        },
      });
    }
    revalidatePath("/cart");
    return { success: true, message: "success.addToCart" };
  } catch {
    return { success: false, error: "error.addToCart" };
  }
};

export const updateCartItemQuantity = async (
  cartItemId: string,
  quantity: number,
) => {
  try {
      const user = await getUser();
      
      if (!user) {
      return { success: false, error: "error.requiredAuth" };
      }

    // Verify cart item belongs to user
    const cartItem = await prisma.cartItem.findUnique({
      where: { id: cartItemId },
      include: {
        cart: true,
        product: true,
      },
    });

    if (!cartItem || cartItem.cart.userId !== user.id) {
      return { success: false, error: "error.itemNotFound" };
    }

    // Validate quantity
    if (quantity < 1) {
      return { success: false, error: "error.limitQuantity" };
    }

    if (quantity > cartItem.product.quantity) {
      return { success: false, error: "error.exceedAvailableStock" };
    }

    await prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity },
    });

    revalidatePath("/cart");
    return { success: true, message: "success.quantityUpdate" };
  } catch {
    return { success: false, error: "error.quantityUpdate" };
  }
};

export const removeItemFromCart = async (cartItemId: string) => {
  try {
      const user = await getUser();
      
      if (!user) {
      return { success: false, error: "error.requiredAuth" };
      }

    // Verify cart item belongs to user
    const cartItem = await prisma.cartItem.findUnique({
      where: { id: cartItemId },
      include: { cart: true },
    });

    if (!cartItem || cartItem.cart.userId !== user.id) {
      return { success: false, error: "error.itemNotFound" };
    }

    await prisma.cartItem.delete({
      where: { id: cartItemId },
    });

    revalidatePath("/cart");
    return { success: true, message: "success.removeItem" };
  } catch {
    return { success: false, error: "error.removeItem" };
  }
};

export const clearCart = async () => {
  try {
      const user = await getUser();
      
      if (!user) {
      return { success: false, error: "error.requiredAuth" };
      }
      
    const cart = await prisma.cart.findUnique({
      where: { userId: user.id },
    });

    if (cart) {
      await prisma.cartItem.deleteMany({
        where: { cartId: cart.id },
      });
    }

    revalidatePath("/cart");
    return { success: true, message: "success.clearCart" };
  } catch {
    return { success: false, error: "error.clearCart" };
  }
};

export type GetOrCreateCartType = Awaited<ReturnType<typeof getOrCreateCart>>;
export type GetCartType = Awaited<ReturnType<typeof getCart>>;
export type AddToCartType = Awaited<ReturnType<typeof addToCart>>;
export type UpdateCartItemQuantityType = Awaited<ReturnType<typeof updateCartItemQuantity>>;
export type RemoveItemFromCartType = Awaited<ReturnType<typeof removeItemFromCart>>;
export type ClearCartType = Awaited<ReturnType<typeof clearCart>>;