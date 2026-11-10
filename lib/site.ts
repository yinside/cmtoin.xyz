export const SITE = {
  name: "CMtoIN",
  url: "https://www.cmtoin.xyz",
  tagline: "Convert measurements instantly.",
  description:
    "Convert centimeters to inches, inches to centimeters, and other length units with fast, accurate calculators, conversion charts, and practical guides.",
  email: "huyinside@gmail.com",
  locale: "en_US",
  language: "en-US",
  copyrightYear: 2026,
} as const;

export type NavItem = {
  label: string;
  href: string;
};

export type ConverterLink = {
  href: string;
  label: string;
  shortLabel: string;
  description: string;
  icon:
    | "ruler"
    | "swap"
    | "feet"
    | "height"
    | "millimeter"
    | "meter";
};

export const CONVERTER_LINKS: ConverterLink[] = [
  {
    href: "/cm-to-inches/",
    label: "CM to Inches",
    shortLabel: "Centimeters → inches",
    description: "Convert centimeters to inches with the exact 2.54 factor.",
    icon: "ruler",
  },
  {
    href: "/cm-to-in/",
    label: "CM to IN",
    shortLabel: "Centimeters → inches",
    description: "A quick centimeters-to-inches converter and reference.",
    icon: "swap",
  },
  {
    href: "/inches-to-cm/",
    label: "Inches to CM",
    shortLabel: "Inches → centimeters",
    description: "Convert inches to centimeters for dims and DIY projects.",
    icon: "swap",
  },
  {
    href: "/cm-to-feet/",
    label: "CM to Feet",
    shortLabel: "Centimeters → feet",
    description: "Convert centimeters to decimal feet for height and space.",
    icon: "feet",
  },
  {
    href: "/cm-to-feet-inches/",
    label: "CM to Feet and Inches",
    shortLabel: "Centimeters → feet + inches",
    description: "Get height results as feet and remaining inches.",
    icon: "height",
  },
  {
    href: "/mm-to-inches/",
    label: "MM to Inches",
    shortLabel: "Millimeters → inches",
    description: "Convert millimeters to inches for small measurements.",
    icon: "millimeter",
  },
  {
    href: "/meters-to-feet/",
    label: "Meters to Feet",
    shortLabel: "Meters → feet",
    description: "Convert meters to feet for rooms, land, and distances.",
    icon: "meter",
  },
];

export const PRIMARY_NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Conversion Charts", href: "/cm-to-inches-chart/" },
  { label: "Guides", href: "/guides/" },
  { label: "About", href: "/about/" },
];

export const GUIDE_LINKS = [
  {
    href: "/guides/how-to-convert-cm-to-inches/",
    label: "How to Convert CM to Inches",
    description:
      "The exact formula, worked examples, and a simple mental-math shortcut.",
  },
  {
    href: "/guides/cm-to-feet-and-inches/",
    label: "CM to Feet and Inches, Explained",
    description:
      "How to turn a centimeter height into feet and remaining inches.",
  },
  {
    href: "/guides/inches-vs-centimeters/",
    label: "Inches vs. Centimeters",
    description:
      "Where each unit comes from, when to use it, and how they relate.",
  },
] as const;

export const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy/" },
  { label: "Terms of Use", href: "/terms/" },
  { label: "Disclaimer", href: "/disclaimer/" },
] as const;

export const FOOTER_TOOL_LINKS = CONVERTER_LINKS.map((link) => ({
  label: link.label,
  href: link.href,
}));

export const FOOTER_RESOURCE_LINKS = [
  { label: "Conversion Charts", href: "/cm-to-inches-chart/" },
  { label: "Guides", href: "/guides/" },
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" },
] as const;
