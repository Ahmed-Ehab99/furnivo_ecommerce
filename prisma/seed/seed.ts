import { prisma } from "@/lib/db";
import fs from "fs/promises";
import path from "path";

interface CategoryTranslation {
  locale: string;
  title: string;
  description: string;
}

interface CategorySeed {
  slug: string;
  thumbnail: string;
  imageAlt: string;
  translations: CategoryTranslation[];
}

interface ProductImageSeed {
  url: string;
  alt: string;
  order: number;
}

interface ProductTranslation {
  type: string;
  locale: string;
  title: string;
  description: string;
}

interface ProductSeed {
  slug: string;
  price: string;
  quantity: number;
  categorySlug: string;
  images: ProductImageSeed[];
  translations: ProductTranslation[];
}

async function main() {
  console.log("🌱 Starting seed...");

  // Clear existing data (in correct order due to relations)
  await prisma.productTranslation.deleteMany();
  await prisma.categoryTranslation.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  console.log("🗑️ Cleared existing data");

  // Read categories JSON file
  const categoriesData = await readJson<CategorySeed[]>("categories.json");

  // Read all product JSON files
  const livingRoomProducts = await readJson<ProductSeed[]>(
    "living-room-products.json",
  );
  const bedRoomProducts = await readJson<ProductSeed[]>(
    "bed-room-products.json",
  );
  const kitchenProducts = await readJson<ProductSeed[]>(
    "kitchen-products.json",
  );

  // Combine all products
  const allProducts = [
    ...livingRoomProducts,
    ...bedRoomProducts,
    ...kitchenProducts,
  ];

  // Create categories with translations
  const categoryMap = new Map<string, string>();
  for (const cat of categoriesData) {
    const { translations, ...categoryData } = cat;
    const created = await prisma.category.create({
      data: {
        ...categoryData,
        translations: {
          create: translations,
        },
      },
    });
    categoryMap.set(created.slug, created.id);
    console.log(
      `📁 Created category: ${created.slug} (${translations.length} languages)`,
    );
  }

  console.log(`✅ Created ${categoriesData.length} categories`);

  // Create products with translations
  let imageCount = 0;
  let productCount = 0;

  for (const prod of allProducts) {
    const categoryId = categoryMap.get(prod.categorySlug);

    if (!categoryId) {
      console.warn(
        `⚠️  Skipping product "${prod.slug}" - Category not found: ${prod.categorySlug}`,
      );
      continue;
    }

    const {
      images,
      translations,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      categorySlug,
      ...productData
    } = prod;

    await prisma.product.create({
      data: {
        ...productData,
        categoryId,
        images: {
          create: images,
        },
        translations: {
          create: translations,
        },
      },
    });

    productCount++;
    imageCount += images.length;
    console.log(`  ✓ Created product: ${prod.slug} (${images.length} images)`);
  }

  console.log(`✅ Created ${productCount} products with ${imageCount} images`);
  console.log(`
    📊 Summary:
    - Categories: ${categoriesData.length}
    - Products: ${productCount}
      • Living Room: ${livingRoomProducts.length}
      • Bed Room: ${bedRoomProducts.length}
      • Kitchen: ${kitchenProducts.length}
    - Product Images: ${imageCount}
    - Languages: English (en) + Arabic (ar)
  `);
  console.log("🎉 Seed completed successfully!");
}

async function readJson<T>(filename: string): Promise<T> {
  const filePath = path.join(__dirname, filename);
  const content = await fs.readFile(filePath, "utf-8");
  return JSON.parse(content) as T;
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
