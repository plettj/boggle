import { BASE_URL } from "@/lib/constants";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${BASE_URL}`,
      lastModified: "2024-11-29",
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
