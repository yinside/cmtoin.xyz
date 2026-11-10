import type { Metadata } from "next";
import { SITE } from "@/lib/site";

const DEFAULT_OG_IMAGE = "/og-image.png";

export interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  /** Use the title exactly as written, without the root title template. */
  absoluteTitle?: boolean;
  ogTitle?: string;
  ogDescription?: string;
  type?: "website" | "article";
  noIndex?: boolean;
}

export function absoluteUrl(path: string): string {
  return new URL(path, SITE.url).toString();
}

export function createMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  ogTitle,
  ogDescription,
  type = "website",
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const canonical = absoluteUrl(path);
  const socialTitle = ogTitle ?? (absoluteTitle ? title : `${title} | ${SITE.name}`);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      type,
      url: canonical,
      title: socialTitle,
      description: ogDescription ?? description,
      siteName: SITE.name,
      locale: SITE.locale,
      images: [
        {
          url: absoluteUrl(DEFAULT_OG_IMAGE),
          width: 1200,
          height: 630,
          alt: `${SITE.name} — ${SITE.tagline}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: ogDescription ?? description,
      images: [absoluteUrl(DEFAULT_OG_IMAGE)],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}
