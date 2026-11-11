import { CONVERTER_LINKS, GUIDE_LINKS, LEGAL_LINKS } from "@/lib/site";

export interface SitemapLink {
  href: string;
  label: string;
  description: string;
}

export interface SitemapGroup {
  title: string;
  description: string;
  links: SitemapLink[];
}

export const SITEMAP_PAGE_PATH = "/sitemap/";

const legalDescriptions: Record<string, string> = {
  "/privacy-policy/":
    "How the site handles cookies, analytics, advertising, and privacy.",
  "/terms/":
    "The terms that apply when you use CMtoIN and its conversion tools.",
  "/disclaimer/":
    "The limits of the conversions and the importance of verifying critical measurements.",
};

export const SITEMAP_GROUPS: SitemapGroup[] = [
  {
    title: "Length converters",
    description:
      "The working calculators for the most common metric and imperial conversions.",
    links: CONVERTER_LINKS.map((link) => ({
      href: link.href,
      label: link.label,
      description: link.description,
    })),
  },
  {
    title: "Conversion charts",
    description:
      "Lookup tables for quick reference without entering a value.",
    links: [
      {
        href: "/cm-to-inches-chart/",
        label: "CM to Inches Chart",
        description:
          "Every whole centimeter from 1 to 300 converted to inches.",
      },
    ],
  },
  {
    title: "Guides",
    description:
      "Plain-English explanations of the formulas, rounding, and units.",
    links: [
      {
        href: "/guides/",
        label: "All measurement guides",
        description:
          "The guide index, including the cm-to-inches and height explanations.",
      },
      ...GUIDE_LINKS.map((guide) => ({
        href: guide.href,
        label: guide.label,
        description: guide.description,
      })),
    ],
  },
  {
    title: "About & contact",
    description:
      "Information about the site and the best way to get in touch.",
    links: [
      {
        href: "/",
        label: "Home",
        description:
          "The main calculator, popular conversions, and site overview.",
      },
      {
        href: "/about/",
        label: "About CMtoIN",
        description:
          "How the independent tool approaches accuracy, clarity, and speed.",
      },
      {
        href: "/contact/",
        label: "Contact",
        description:
          "Email huyinside@gmail.com with questions or correction requests.",
      },
    ],
  },
  {
    title: "Legal",
    description:
      "The policies and notices that apply to the site and its content.",
    links: LEGAL_LINKS.map((link) => ({
      href: link.href,
      label: link.label,
      description:
        legalDescriptions[link.href] ??
        "Site policy and legal information.",
    })),
  },
];

export const SITEMAP_ROUTES = Array.from(
  new Set([
    "/",
    SITEMAP_PAGE_PATH,
    ...SITEMAP_GROUPS.flatMap((group) =>
      group.links.map((link) => link.href),
    ),
  ]),
);
