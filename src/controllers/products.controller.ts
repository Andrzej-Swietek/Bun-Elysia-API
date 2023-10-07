import {Elysia, t} from "elysia";


export const products = new Elysia({ prefix: '/products' })
  .get("/all", async ({ db }) => {
    try {
        const allProducts = await db.product.findMany();
        return allProducts;
    } catch (error) {
        throw error;
    }
  })
  .get("/:id", async ({ params, db }) => {
    try {
      const productId = parseInt(params.id, 10);
      const product = await db.product.findUnique({
        where: { id: productId },
      });

      if (!product)
        return {
          success: false,
          message: "Product not found",
        };
      

      return product;
    } catch (error) {
      throw error;
    }
  })
  .post("/", async ({ body, db }) => {
    try {
      const newProduct = await db.product.create({
        data: body,
      });

      return newProduct;
    } catch (error) {
      throw error;
    }
  })
  .put("/:id", async ({ params, body, db }) => {
    try {
      const productId = parseInt(params.id, 10);

      const existingProduct = await db.product.findUnique({
        where: { id: productId },
      });

      if (!existingProduct) 
        return {
          success: false,
          message: "Product not found",
        };
      

      const updatedProduct = await db.product.update({
        where: { id: productId },
        data: body,
      });

      return updatedProduct;
    } catch (error) {
      throw error;
    }
  })
  .delete("/:id", async ({ params, db }) => {
    try {
      const productId = parseInt(params.id, 10);

      // Find the product by ID
      const existingProduct = await db.product.findUnique({
        where: { id: productId },
      });

      if (!existingProduct) 
        return {
          success: false,
          message: "Product not found",
        };
      

      await db.product.delete({
        where: { id: productId },
      });

      return {
        success: true,
        message: "Product deleted successfully",
      };
    } catch (error) {
      throw error;
    }
});