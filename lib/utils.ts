import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { OGData } from "./types";
import { OG_NAME, OG_SITE_NAME } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isProd(): boolean {
  return process.env.NODE_ENV === "production";
}

export function getOGData({
  type,
  url,
  title,
  description,
  previewImage,
}: OGData) {
  return {
    type: type || "website",
    siteName: OG_SITE_NAME,
    title: `${title} | ${OG_NAME}`,
    description,
    url,
    // images: [
    //   previewImage || {
    //     url: `${BASE_URL}/icons/favicon32.png`,
    //     width: 32,
    //     height: 32,
    //     alt: "J logo",
    //   },
    // ],
  };
}
