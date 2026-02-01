import { prisma } from "@/lib/db";
import { getImageKitUrl } from "@/lib/imagekit";
import dotenv from "dotenv";
import fs from "fs/promises";
import path from "path";

// Load environment variables from .env file
dotenv.config();

// Validate required environment variables
if (!process.env.IMAGEKIT_URL_ENDPOINT) {
  throw new Error(
    "IMAGEKIT_URL_ENDPOINT is not defined in environment variables",
  );
}

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
  discount?: number;
  quantity: number;
  categorySlug: string;
  images: ProductImageSeed[];
  translations: ProductTranslation[];
}

/**
 * Convert local path to ImageKit URL
 * Removes leading slash and constructs ImageKit URL directly
 */
function normalizeImagePath(localPath: string): string {
  // Remove leading slash if present
  return localPath.startsWith("/") ? localPath.slice(1) : localPath;
}

async function main() {
  console.log("🌱 Starting seed with ImageKit URLs...");
  console.log("📡 ImageKit Endpoint:", process.env.IMAGEKIT_URL_ENDPOINT);

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
    const { translations, thumbnail, ...categoryData } = cat;

    // Convert thumbnail to ImageKit URL
    const imagekitThumbnail = getImageKitUrl(normalizeImagePath(thumbnail), {
      width: 600,
      quality: 80,
      format: "webp",
    });

    console.log(`  Converting: ${thumbnail}`);
    console.log(`  To: ${imagekitThumbnail}`);

    const created = await prisma.category.create({
      data: {
        ...categoryData,
        thumbnail: imagekitThumbnail, // Use ImageKit URL
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

    // Convert image URLs to ImageKit URLs
    const imagekitImages = images.map((img) => ({
      ...img,
      url: getImageKitUrl(normalizeImagePath(img.url), {
        width: 900,
        quality: 80,
        format: "webp",
      }),
    }));

    await prisma.product.create({
      data: {
        ...productData,
        categoryId,
        images: {
          create: imagekitImages, // Use ImageKit URLs
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
    - Product Images: ${imageCount} (all using ImageKit URLs)
    - Languages: English (en) + Arabic (ar)
  `);
  console.log("\n📝 Example ImageKit URL:");
  console.log(
    `   ${normalizeImagePath("/categories/living-room/products/chair1.webp")}`,
  );
  console.log("\n🎉 Seed completed successfully!");
}

async function readJson<T>(filename: string): Promise<T> {
  const filePath = path.join(__dirname, filename);
  const content = await fs.readFile(filePath, "utf-8");
  return JSON.parse(content) as T;
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    console.error("\nPlease check:");
    console.error("  1. Your .env file exists");
    console.error("  2. IMAGEKIT_URL_ENDPOINT is set correctly");
    console.error("  3. Database connection is working");
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
