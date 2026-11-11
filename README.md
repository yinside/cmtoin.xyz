# CMtoIN

A production-ready measurement conversion website for **www.cmtoin.xyz**, built with Next.js App Router, TypeScript, Tailwind CSS, and React.

CMtoIN provides fast, accurate length converters, a complete centimeter-to-inch chart, and practical guides. The primary tools are:

- Centimeters to inches (and the reverse)
- Inches to centimeters
- Centimeters to decimal feet
- Centimeters to feet and inches
- Millimeters to inches
- Meters to feet

## Tech stack

- **Next.js 16** (App Router, static generation)
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **Lucide React** icons
- **Vercel Web Analytics** via `@vercel/analytics`

## Getting started

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

### Production build

```bash
pnpm build
pnpm start
```

The build script uses `next build --webpack` for a deterministic production bundle. Pages that do not need client interactivity are statically generated.

### Type checking and conversion tests

```bash
pnpm typecheck
pnpm test
```

The conversion tests cover exact factors, formatting, height rounding and
rollover, input parsing, formulas, presets, and the 1–300 cm chart data. They
run through Node's native TypeScript execution, which requires Node 22.18 or
newer; the production build itself supports Node 20.9 and newer.

### Production smoke test

With `pnpm start` running in another terminal:

```bash
node scripts/verify.mjs
```

This checks every route, title/description uniqueness, canonicals, Open Graph,
JSON-LD, internal links, sitemap, robots.txt, anchors, and required page copy.

## Project structure

```text
app/
  layout.tsx                 Root layout, fonts, metadata, header/footer
  page.tsx                   Homepage
  cm-to-inches/              Main converter page
  cm-to-in/                  "cm to in" keyword page
  inches-to-cm/              Reverse converter
  cm-to-feet/                Decimal feet converter
  cm-to-feet-inches/         Height converter
  cm-to-inches-chart/        Full 1–300 cm chart
  mm-to-inches/              Millimeter converter
  meters-to-feet/            Meter converter
  guides/                    Guides index and three articles
  about/, contact/           Informational pages
  sitemap/                   Human-readable site index
  privacy-policy/, terms/,
  disclaimer/                Legal templates
  sitemap.ts, robots.ts      SEO routes
  manifest.ts, icon.svg      Brand assets

components/
  Header.tsx                 Responsive navigation and converters menu
  Footer.tsx                 Site footer
  ConversionCalculator.tsx   Bidirectional cm/in/ft/mm/m calculator
  ConversionRuler.tsx        Responsive cm/inch visual scale synced to the calculator
  HeightConverter.tsx        cm → feet + inches
  ConversionTable.tsx        Reusable accessible table
  ConversionCard.tsx         Popular converter cards
  FAQ.tsx                    Native details/summary FAQ + FAQPage JSON-LD
  Breadcrumbs.tsx            Breadcrumb UI + BreadcrumbList JSON-LD
  PageLayout.tsx             Interior page shell and section heading
  AdSlot.tsx, AdUnit.tsx     Disabled-by-default AdSense integration
  ...

lib/
  conversions.ts             Unit definitions, exact conversion engine, formatting
  ruler.ts                   Ruler ranges, zoom windows, and tick calculations
  number-input.ts            Shared positive-decimal parser
  site.ts                    Navigation and site constants
  metadata.ts                Canonical, Open Graph, and Twitter metadata helper
  schema.ts                  WebSite, WebPage, BreadcrumbList, FAQPage JSON-LD
  chart-data.ts              Chart ranges and generated rows
  faqs.ts                    FAQ content
  ads.ts                     Advertising configuration
```

## Conversion engine

Every unit is defined by its exact relationship to the meter:

- 1 inch = 0.0254 m (2.54 cm)
- 1 foot = 0.3048 m (30.48 cm)
- 1 millimeter = 0.001 m
- 1 centimeter = 0.01 m
- 1 meter = 1 m

`convertLength()` converts through the shared base unit, so adding a new length unit only requires adding a definition to `LENGTH_UNITS`. Formatting is limited to four decimal places for display, trailing zeros are removed, and values too small to display are shown with a `<` indicator instead of rounding to zero.

## SEO

- Unique title and description per page
- Canonical URLs with trailing slashes
- Open Graph and Twitter card metadata
- Semantic heading hierarchy and breadcrumbs
- `WebSite`, `WebPage`, `BreadcrumbList`, and valid `FAQPage` JSON-LD
- `app/sitemap.ts` and `app/robots.ts`
- All content is server-rendered HTML; client JavaScript is limited to the header, calculators, and lightweight Vercel Analytics

Structured data describes visible page content only. It does not guarantee any particular search result treatment.

## Analytics

Vercel Web Analytics is mounted once in `app/layout.tsx` with the official
`@vercel/analytics/next` component. It activates on Vercel deployments and
provides cookieless, aggregated traffic reporting. No custom events are sent,
and calculator inputs or results are never included in analytics data.

The privacy policy describes the current Vercel Analytics setup. Review the
provider configuration, consent requirements, and retention settings before
publishing in a regulated region.

## Advertising

Google AdSense support is prepared but **disabled by default**. No publisher ID is included. To enable it:

1. Copy `.env.example` to `.env.local`.
2. Set `NEXT_PUBLIC_ADSENSE_ENABLED=true`.
3. Set `NEXT_PUBLIC_ADSENSE_CLIENT_ID`.
4. Set the slot IDs for the placements you want to use.
5. Configure consent and review AdSense policies before publishing ads.

`AdSlot` renders nothing unless ads are enabled and that placement has a client ID and slot ID. There are no placeholders or simulated ad banners. Placements are separated from calculator controls and kept intentionally modest.

## Content and legal review

The privacy policy, terms of use, and disclaimer are clearly marked templates. They require review by a qualified professional and must be adapted to the actual hosting, analytics (currently Vercel Web Analytics), advertising, and jurisdiction before publication.

## Verification

- `pnpm build` succeeds
- All required routes are statically generated
- Conversion factors are exact and shared across calculators
- Internal links, sitemap entries, canonical paths, and required pages are covered
- The calculators support decimals, zero, large and small positive values, copy, clear, and swap
- Ads remain disabled by default

## Contact

`huyinside@gmail.com`
