import { env } from "@/lib/env";
import { MetadataRoute } from "next";

const baseUrl = env.BETTER_AUTH_URL;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/shop", "/category/", "/product/"],
        disallow: [
          "/auth",
          "/cart",
          "/checkout",
          "/payment",
          "/payment/",
          "/search",
          "/*?*",
        ],
      },

      {
        userAgent: "Googlebot",
        allow: ["/", "/shop", "/category/", "/product/"],
        disallow: ["/auth", "/cart", "/checkout", "/payment", "/search"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
