import {Elysia, t} from "elysia";

export const carts = new Elysia({ prefix: '/carts' })
  .get("/:userId", async ({ params, db }) => {
    try {
      const userId = parseInt(params.userId, 10);
      // Retrieve all items in the user's cart
      const cartItems = await db.cart.findMany({
        where: { userId },
        include: { product: true },
      });

      return cartItems;
    } catch (error) {
      throw error;
    }
  })
  .post("/", async ({ body, db }) => {
    try {
      const { userId, productId, quantity } = body;

      // Check if the user and product exist
      const user = await db.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        return {
          success: false,
          message: "User not found",
        };
      }

      const product = await db.product.findUnique({
        where: { id: productId },
      });

      if (!product) {
        return {
          success: false,
          message: "Product not found",
        };
      }

      // Create a new item in the user's cart
      const cartItem = await db.cart.create({
        data: {
          userId,
          productId,
          quantity,
        },
      });

      return cartItem;
    } catch (error) {
      throw error;
    }
  },{
    body: t.Object({
        userId: t.Number(),
        productId: t.Number(),
        quantity: t.Number()
    })
  })
  .patch("/:id", async ({ params, body, db }) => {
    try {
      const cartItemId = parseInt(params.id, 10);
      const { quantity } = body;

      // Find the cart item by ID
      const existingCartItem = await db.cart.findUnique({
        where: { id: cartItemId },
      });

      if (!existingCartItem) {
        return {
          success: false,
          message: "Cart item not found",
        };
      }

      // Update the quantity of the cart item
      const updatedCartItem = await db.cart.update({
        where: { id: cartItemId },
        data: { quantity },
      });

      return updatedCartItem;
    } catch (error) {
      throw error;
    }
  }, {
    body: t.Object({
        quantity: t.Number()
    })
  })
  .delete("/:id", async ({ params, db }) => {
    try {
      const cartItemId = parseInt(params.id, 10);

      // Find the cart item by ID
      const existingCartItem = await db.cart.findUnique({
        where: { id: cartItemId },
      });

      if (!existingCartItem) {
        return {
          success: false,
          message: "Cart item not found",
        };
      }

      // Delete the cart item
      await db.cart.delete({
        where: { id: cartItemId },
      });

      return {
        success: true,
        message: "Cart item deleted successfully",
      };
    } catch (error) {
      throw error;
    }
});