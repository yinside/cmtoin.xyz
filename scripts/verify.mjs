#!/usr/bin/env node
/**
 * Basic production smoke test for CMtoIN.
 *
 * Usage:
 *   node scripts/verify.mjs
 *   BASE_URL=http://127.0.0.1:3000 node scripts/verify.mjs
 *
 * The production server must be running before this script is executed.
 */

const BASE_URL = process.env.BASE_URL ?? "http://127.0.0.1:3000";

const pages = [
  ["/", "CM to IN – Unit Conversion Made Easy"],
  ["/cm-to-inches/", "Centimeters to Inches Converter"],
  ["/cm-to-in/", "CM to IN Converter"],
  ["/inches-to-cm/", "Inches to Centimeters Converter"],
  ["/cm-to-feet/", "Centimeters to Feet Converter"],
  ["/cm-to-feet-inches/", "CM to Feet and Inches Converter"],
  ["/cm-to-inches-chart/", "CM to Inches Conversion Chart"],
  ["/mm-to-inches/", "Millimeters to Inches Converter"],
  ["/meters-to-feet/", "Meters to Feet Converter"],
  ["/guides/", "Measurement Conversion Guides"],
  ["/guides/how-to-convert-cm-to-inches/", "How to Convert CM to Inches"],
  [
    "/guides/cm-to-feet-and-inches/",
    "CM to Feet and Inches, Explained",
  ],
  [
    "/guides/inches-vs-centimeters/",
    "Inches vs. Centimeters: What's the Difference?",
  ],
  ["/about/", "About CMtoIN"],
  ["/contact/", "Contact CMtoIN"],
  ["/privacy-policy/", "Privacy Policy"],
  ["/terms/", "Terms of Use"],
  ["/disclaimer/", "Disclaimer"],
];

const requiredText = {
  "/": ["180 cm in inches", "View the full 1–300 cm chart"],
  "/cm-to-inches/": ["1 in = 2.54 cm", "70.8661"],
  "/cm-to-feet-inches/": ["5 ft 10.87 in"],
  "/cm-to-inches-chart/": ["118.1102", "1–50 cm", "251–300 cm"],
  "/contact/": ["contact@cmtoin.xyz"],
  "/privacy-policy/": ["Template notice", "Google AdSense", "Cookies"],
  "/terms/": ["Template notice", "Governing law"],
  "/disclaimer/": ["informational", "precision is critical"],
};

const failures = [];
const titles = new Map();
const descriptions = new Map();
const internalLinks = new Set();
const htmlByPage = new Map();

function fail(message) {
  failures.push(message);
}

function decodeEntities(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&#x2013;|&ndash;/g, "–")
    .replace(/&#x2014;|&mdash;/g, "—");
}

function textOf(html) {
  return decodeEntities(html.replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

function metaContent(html, attr, value) {
  const regex = new RegExp(
    `<meta[^>]+${attr}="${value}"[^>]+content="([^"]*)"`,
    "i",
  );
  const match = html.match(regex);
  if (match) return decodeEntities(match[1]);

  const reverse = new RegExp(
    `<meta[^>]+content="([^"]*)"[^>]+${attr}="${value}"`,
    "i",
  );
  return reverse.test(html) ? decodeEntities(html.match(reverse)[1]) : null;
}

function canonicalOf(html) {
  const match = html.match(
    /<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i,
  );
  return match ? decodeEntities(match[1]) : null;
}

function jsonLdTypes(html) {
  const types = [];
  const scripts = [
    ...html.matchAll(
      /<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi,
    ),
  ];

  for (const [, raw] of scripts) {
    try {
      const parsed = JSON.parse(raw);
      const graph = parsed["@graph"] ?? [parsed];
      for (const node of graph) {
        if (node["@type"]) {
          if (Array.isArray(node["@type"])) types.push(...node["@type"]);
          else types.push(node["@type"]);
        }
      }
    } catch (error) {
      fail(`Invalid JSON-LD: ${error.message}`);
    }
  }

  return types;
}

async function fetchPage(path) {
  const response = await fetch(`${BASE_URL}${path}`, {
    redirect: "follow",
    headers: { "user-agent": "CMtoIN production verifier" },
  });
  const html = await response.text();
  return { response, html };
}

for (const [path, expectedH1] of pages) {
  let response;
  let html;

  try {
    ({ response, html } = await fetchPage(path));
  } catch (error) {
    fail(`${path} could not be fetched: ${error.message}`);
    continue;
  }

  if (!response.ok) {
    fail(`${path} returned HTTP ${response.status}`);
    continue;
  }

  if (!response.url.endsWith(path)) {
    fail(`${path} resolved to unexpected URL ${response.url}`);
  }

  htmlByPage.set(path, html);

  const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? textOf(titleMatch[1]) : null;
  if (!title) {
    fail(`${path} has no <title>`);
  } else {
    if (titles.has(title)) {
      fail(`${path} duplicates title from ${titles.get(title)}: ${title}`);
    }
    titles.set(title, path);
  }

  const description = metaContent(html, "name", "description");
  if (!description) {
    fail(`${path} has no meta description`);
  } else {
    if (description.length < 70 || description.length > 180) {
      fail(`${path} description length is ${description.length}`);
    }
    if (descriptions.has(description)) {
      fail(
        `${path} duplicates description from ${descriptions.get(description)}`,
      );
    }
    descriptions.set(description, path);
  }

  const canonical = canonicalOf(html);
  const expectedCanonical = `https://cmtoin.xyz${path}`;
  if (canonical !== expectedCanonical) {
    fail(`${path} canonical is ${canonical}, expected ${expectedCanonical}`);
  }

  const openGraphTitle = metaContent(html, "property", "og:title");
  const openGraphImage = metaContent(html, "property", "og:image");
  if (!openGraphTitle) fail(`${path} has no og:title`);
  if (!openGraphImage?.includes("og-image.png")) {
    fail(`${path} has no og:image`);
  }

  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map(
    (match) => textOf(match[1]),
  );
  if (h1s.length !== 1) {
    fail(`${path} has ${h1s.length} H1 elements`);
  } else if (h1s[0] !== expectedH1) {
    fail(`${path} H1 is "${h1s[0]}", expected "${expectedH1}"`);
  }

  const types = jsonLdTypes(html);
  if (!types.includes("WebPage")) fail(`${path} has no WebPage JSON-LD`);
  if (path !== "/" && !types.includes("BreadcrumbList")) {
    fail(`${path} has no BreadcrumbList JSON-LD`);
  }
  if (
    [
      "/",
      "/cm-to-inches/",
      "/cm-to-in/",
      "/inches-to-cm/",
      "/cm-to-feet/",
      "/cm-to-feet-inches/",
      "/cm-to-inches-chart/",
      "/mm-to-inches/",
      "/meters-to-feet/",
    ].includes(path) &&
    !types.includes("FAQPage")
  ) {
    fail(`${path} has no FAQPage JSON-LD`);
  }
  if (path === "/" && !types.includes("WebSite")) {
    fail("/ has no WebSite JSON-LD");
  }

  const required = requiredText[path] ?? [];
  for (const phrase of required) {
    if (!textOf(html).includes(phrase)) {
      fail(`${path} is missing required text: "${phrase}"`);
    }
  }

  if (/[\u4e00-\u9fff]/.test(textOf(html))) {
    fail(`${path} contains Chinese characters`);
  }

  if (html.includes("ca-pub-")) {
    fail(`${path} contains an AdSense publisher ID`);
  }

  const hrefs = [...html.matchAll(/href="([^"]+)"/gi)].map((match) =>
    decodeEntities(match[1]),
  );

  for (const href of hrefs) {
    if (
      href.startsWith("/") &&
      !href.startsWith("//") &&
      !href.startsWith("/_next/")
    ) {
      const clean = href.split("#")[0].split("?")[0] || "/";
      if (clean) internalLinks.add(clean);
    }
  }
}

for (const value of ["/robots.txt", "/sitemap.xml", "/og-image.png"]) {
  const response = await fetch(`${BASE_URL}${value}`);
  if (!response.ok) fail(`${value} returned HTTP ${response.status}`);
}

const robots = await (await fetch(`${BASE_URL}/robots.txt`)).text();
if (!robots.includes("Sitemap: https://cmtoin.xyz/sitemap.xml")) {
  fail("robots.txt does not reference the sitemap");
}

const sitemap = await (await fetch(`${BASE_URL}/sitemap.xml`)).text();
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (match) => match[1],
);
if (sitemapUrls.length !== pages.length) {
  fail(
    `sitemap has ${sitemapUrls.length} URLs, expected ${pages.length}`,
  );
}
for (const [path] of pages) {
  if (!sitemapUrls.includes(`https://cmtoin.xyz${path}`)) {
    fail(`sitemap is missing ${path}`);
  }
}

for (const link of [...internalLinks].sort()) {
  if (/\.(ico|png|svg|webp|jpg|jpeg|txt|xml|webmanifest)$/.test(link)) {
    continue;
  }
  try {
    const response = await fetch(`${BASE_URL}${link}`, {
      redirect: "follow",
      headers: { "user-agent": "CMtoIN production verifier" },
    });
    if (!response.ok) {
      fail(`Internal link ${link} returned HTTP ${response.status}`);
    }
  } catch (error) {
    fail(`Internal link ${link} failed: ${error.message}`);
  }
}

// Verify anchor targets used by the chart's jump navigation.
const chartHtml = htmlByPage.get("/cm-to-inches-chart/") ?? "";
for (const anchor of [
  "cm-1-50",
  "cm-51-100",
  "cm-101-150",
  "cm-151-200",
  "cm-201-250",
  "cm-251-300",
]) {
  if (!chartHtml.includes(`id="${anchor}"`)) {
    fail(`Chart is missing anchor target #${anchor}`);
  }
}

if (failures.length > 0) {
  console.error(`\n✗ ${failures.length} verification issue(s):\n`);
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}

console.log(`\n✓ Verified ${pages.length} pages at ${BASE_URL}`);
console.log(`✓ ${internalLinks.size} unique internal links resolved`);
console.log(`✓ ${titles.size} unique titles, ${descriptions.size} unique descriptions`);
console.log(`✓ Canonicals, Open Graph, breadcrumbs, web pages, and FAQs present`);
console.log(`✓ Sitemap, robots.txt, and anchor targets valid`);
