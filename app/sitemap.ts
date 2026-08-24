import type { MetadataRoute } from "next";
import { getVehicles } from "@/services/vehicle.service";

const baseUrl = "https://autostockbd.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { items: vehicles } = await getVehicles({ pageSize: 200 });

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/inventory`, changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/sell-your-car`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/contact`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/about`, changeFrequency: "monthly", priority: 0.4 },
  ];

  const vehicleRoutes: MetadataRoute.Sitemap = vehicles.map((vehicle) => ({
    url: `${baseUrl}/inventory/${vehicle.slug}`,
    lastModified: vehicle.updatedAt,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...vehicleRoutes];
}
