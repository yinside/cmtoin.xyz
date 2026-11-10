import { SITE } from "@/lib/site";

/**
 * Structured-data helpers. These describe only content that is actually
 * visible on the page. Structured data helps search engines understand a
 * page; it does not guarantee any particular search result treatment.
 */

export type JsonLdObject = Record<string, unknown>;

export function websiteSchema(): JsonLdObject {
  return {
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: `${SITE.url}/`,
    name: SITE.name,
    description: SITE.description,
    inLanguage: SITE.language,
  };
}

export function webPageSchema({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}): JsonLdObject {
  const url = new URL(path, SITE.url).toString();
  return {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: SITE.language,
    isPartOf: {
      "@id": `${SITE.url}/#website`,
    },
  };
}

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export function breadcrumbSchema(items: BreadcrumbItem[]): JsonLdObject {
  return {
    "@type": "BreadcrumbList",
    "@id": `${new URL(items[items.length - 1]?.href ?? "/", SITE.url).toString()}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: new URL(item.href, SITE.url).toString(),
    })),
  };
}

export interface FaqItem {
  question: string;
  answer: string;
}

export function faqSchema(items: FaqItem[]): JsonLdObject {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
