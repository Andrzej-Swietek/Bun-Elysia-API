import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

const main = async (): Promise<void> => {
    for (let i = 0; i < 10; i++) {
        await client.user.create({
          data: {
            email: `user-${i}@example.com`,
            name: `user-${i}`,
            password: `zaq1@WSX`,
            role: 'USER',
            profile: {
              create: {
                bio: `Lorem ipsum Dolor sit amet`,
              },
            },
          },
        });
    }

    const categories = ['Electronics', 'Clothing', 'Books', 'Home Decor'];

    for (const categoryName of categories) {
      await client.category.create({
        data: {
          name: categoryName,
        },
      });
    }

    // Seed products
    for (let i = 0; i < 20; i++) {
        await client.product.create({
            data: {
            name: `product-${i}`,
            categories: {
                connect: {
                id: getRandomCategoryId(categories.length),
                },
            },
            },
        });
    }
}

const getRandomCategoryId = (max: number): number => {
    return Math.floor(Math.random() * max) + 1;
  };

try {
    await main();
    client.$disconnect();
    process.exit(0);
} catch(e) {
    console.log(e);
    client.$disconnect();
    process.exit(1);
}