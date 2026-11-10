import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeftRight,
  ArrowRight,
  BookOpen,
  Check,
  Footprints,
  Milestone,
  MousePointerClick,
  MoveHorizontal,
  MoveVertical,
  Ruler,
  TableProperties,
  Target,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { AdSlot } from "@/components/AdSlot";
import { ConversionCalculator } from "@/components/ConversionCalculator";
import { ConversionCard } from "@/components/ConversionCard";
import { ConversionTable } from "@/components/ConversionTable";
import { FAQ } from "@/components/FAQ";
import { FormulaCard } from "@/components/FormulaCard";
import { JsonLd } from "@/components/JsonLd";
import { SectionHeading } from "@/components/PageLayout";
import { cmToInches, formatDecimal } from "@/lib/conversions";
import { CM_TO_INCHES_PREVIEW } from "@/lib/chart-data";
import { homeFaqs } from "@/lib/faqs";
import { createMetadata } from "@/lib/metadata";
import { webPageSchema, websiteSchema } from "@/lib/schema";
import { GUIDE_LINKS } from "@/lib/site";

export const metadata: Metadata = createMetadata({
  title: "CMtoIN – CM to Inches Converter & Conversion Charts",
  description:
    "Convert centimeters to inches instantly with CMtoIN. Free, accurate length converters, a 1–300 cm chart, height tools, and plain-English guides.",
  path: "/",
  absoluteTitle: true,
  ogTitle: "CMtoIN – CM to Inches Converter & Conversion Charts",
});

const popularConversions: Array<{
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
}> = [
  {
    title: "CM to Inches",
    description:
      "Convert centimeters to inches with the exact 2.54 factor. Includes a chart, formula, and examples.",
    href: "/cm-to-inches/",
    icon: Ruler,
  },
  {
    title: "Inches to CM",
    description:
      "Go the other way. Turn inches into centimeters for dimensions, plans, and everyday projects.",
    href: "/inches-to-cm/",
    icon: ArrowLeftRight,
  },
  {
    title: "CM to Feet",
    description:
      "Express a centimeter measurement in decimal feet for height, rooms, and construction notes.",
    href: "/cm-to-feet/",
    icon: Footprints,
  },
  {
    title: "CM to Feet and Inches",
    description:
      "Get height in whole feet plus remaining inches — for example, 180 cm is 5 ft 10.87 in.",
    href: "/cm-to-feet-inches/",
    icon: MoveVertical,
  },
  {
    title: "MM to Inches",
    description:
      "Convert small metric measurements to inches for parts, materials, and precise dimensions.",
    href: "/mm-to-inches/",
    icon: MoveHorizontal,
  },
  {
    title: "Meters to Feet",
    description:
      "Convert meters to feet for room sizes, land measurements, and longer distances.",
    href: "/meters-to-feet/",
    icon: Milestone,
  },
];

const whyCards = [
  {
    title: "Instant Results",
    description:
      "The result updates as you type. There is no submit button, no reload, and no waiting.",
    icon: Zap,
  },
  {
    title: "Accurate Conversions",
    description:
      "Every result uses the exact international factor of 2.54 centimeters per inch — never a rounded shortcut.",
    icon: Target,
  },
  {
    title: "Easy to Use",
    description:
      "Preset values, a copy button, a clear button, and a swap control keep the tool simple on any screen.",
    icon: MousePointerClick,
  },
];

const chartPreviewRows = CM_TO_INCHES_PREVIEW.map((cm) => ({
  key: `preview-${cm}`,
  highlight: cm === 180,
  cells: [cm, formatDecimal(cmToInches(cm), 4)],
}));

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={[
          websiteSchema(),
          webPageSchema({
            name: "CMtoIN – CM to Inches Converter & Conversion Charts",
            description:
              "Free, accurate converters for centimeters, inches, feet, millimeters, and meters, with charts and practical guides.",
            path: "/",
          }),
        ]}
      />

      <main id="main-content">
        <section className="relative overflow-hidden border-b border-slate-100">
          <div
            className="pointer-events-none absolute inset-0 ruler-grid opacity-60"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -right-32 -top-32 h-[32rem] w-[32rem] rounded-full bg-brand-50/80 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-10 sm:px-6 sm:pb-16 sm:pt-14 lg:px-8 lg:pb-20 lg:pt-16 xl:grid xl:grid-cols-[1fr_540px] xl:items-center xl:gap-16">
            <div className="max-w-2xl">
              <p className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.13em] text-brand-700 shadow-sm">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-brand-600"
                  aria-hidden="true"
                />
                Free length conversion tools
              </p>

              <h1 className="mt-5 text-balance text-[2.55rem] font-bold leading-[1.04] tracking-[-0.045em] text-navy sm:text-[3.35rem] lg:text-[3.65rem]">
                CM to IN <span className="text-brand-600">–</span> Unit
                Conversion Made Easy
              </h1>
              <p className="mt-5 max-w-xl text-pretty text-lg leading-8 text-slate-600 sm:text-xl">
                Instantly convert centimeters to inches, inches to centimeters,
                and more.
              </p>
              <p className="mt-3 hidden max-w-lg text-[0.95rem] leading-7 text-slate-500 sm:block">
                A fast, focused converter built on exact standards. Enter a
                value and get a precise result in four decimal places — no
                sign-up, no clutter.
              </p>

              <div className="mt-7 flex flex-wrap gap-2">
                {[
                  "Exact 2.54 factor",
                  "4-decimal results",
                  "Works on any screen",
                ].map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-600"
                  >
                    <Check
                      className="h-3.5 w-3.5 text-brand-600"
                      aria-hidden="true"
                    />
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-8 hidden flex-wrap items-center gap-x-5 gap-y-2 border-t border-slate-200 pt-5 text-sm sm:flex">
                <span className="font-medium text-slate-500">
                  Start here:
                </span>
                <Link
                  href="/cm-to-inches/"
                  className="font-semibold text-brand-700 underline decoration-brand-200 underline-offset-4 hover:decoration-brand-600"
                >
                  CM to Inches
                </Link>
                <Link
                  href="/inches-to-cm/"
                  className="font-semibold text-brand-700 underline decoration-brand-200 underline-offset-4 hover:decoration-brand-600"
                >
                  Inches to CM
                </Link>
                <Link
                  href="/cm-to-feet-inches/"
                  className="font-semibold text-brand-700 underline decoration-brand-200 underline-offset-4 hover:decoration-brand-600"
                >
                  Height converter
                </Link>
              </div>
            </div>

            <div className="mt-10 lg:mt-12 xl:mt-0">
              <ConversionCalculator
                from="cm"
                to="in"
                initialValue="10"
                id="calculator"
                description="Centimeters to inches, calculated exactly and shown to four decimal places."
              />
            </div>
          </div>
        </section>

        <AdSlot placement="homeBelowHero" className="my-8 px-4 sm:my-10 sm:px-6" />

        <section
          id="popular-conversions"
          className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
        >
          <SectionHeading
            eyebrow="Popular conversions"
            title="The conversions people need most"
            description="Start with a dedicated converter, each with a formula, worked examples, a reference chart, and answers to common questions."
            action={{
              label: "See all conversion charts",
              href: "/cm-to-inches-chart/",
            }}
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {popularConversions.map((conversion) => (
              <ConversionCard
                key={conversion.href}
                title={conversion.title}
                description={conversion.description}
                href={conversion.href}
                icon={conversion.icon}
              />
            ))}
          </div>
        </section>

        <section className="border-y border-slate-200 bg-slate-50/70">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start lg:gap-16">
              <div>
                <SectionHeading
                  eyebrow="Conversion chart"
                  title="Centimeters to inches at a glance"
                  description="Use this quick reference for common centimeter values, from a single centimeter up to two hundred."
                />

                <dl className="mt-6 space-y-3">
                  <div className="flex items-baseline justify-between gap-4 border-b border-slate-200 pb-3">
                    <dt className="text-sm text-slate-600">1 centimeter</dt>
                    <dd className="font-semibold text-navy tabular-nums">
                      0.3937 inches
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4 border-b border-slate-200 pb-3">
                    <dt className="text-sm text-slate-600">1 inch</dt>
                    <dd className="font-semibold text-navy tabular-nums">
                      2.54 centimeters
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="text-sm text-slate-600">100 centimeters</dt>
                    <dd className="font-semibold text-navy tabular-nums">
                      39.3701 inches
                    </dd>
                  </div>
                </dl>

                <Link
                  href="/cm-to-inches-chart/"
                  className="mt-7 inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-700"
                >
                  View the full 1–300 cm chart
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>

              <div>
                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                    <TableProperties
                      className="h-4 w-4 text-brand-600"
                      aria-hidden="true"
                    />
                    Chart preview
                  </p>
                  <span className="text-xs text-slate-500">
                    Rounded to 4 decimals
                  </span>
                </div>
                <ConversionTable
                  caption="Preview of common centimeter to inch conversions"
                  columns={[
                    { header: "Centimeters (cm)" },
                    { header: "Inches (in)", align: "right" },
                  ]}
                  rows={chartPreviewRows}
                  dense
                />
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <SectionHeading
            eyebrow="Why use CMtoIN"
            title="A converter that stays out of your way"
            description="No account, no pop-ups, and no distracting detours. Just the measurement you need, converted correctly."
            align="center"
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {whyCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <span
                    className="absolute right-5 top-4 text-4xl font-bold tracking-tighter text-slate-100"
                    aria-hidden="true"
                  >
                    0{index + 1}
                  </span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-base font-semibold text-navy">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {card.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <AdSlot
          placement="homeMidContent"
          className="my-4 px-4 sm:my-8 sm:px-6"
        />

        <section className="border-t border-slate-200">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
              <div>
                <SectionHeading
                  eyebrow="The formula"
                  title="The math behind every result"
                  description="The inch is defined against the centimeter, so the conversion is a single, reliable division — not an approximation."
                />
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  One inch is exactly 2.54 centimeters. To go from centimeters
                  to inches, divide by 2.54. To go from inches to centimeters,
                  multiply by 2.54. Read the{" "}
                  <Link
                    href="/guides/how-to-convert-cm-to-inches/"
                    className="font-medium text-brand-700 underline decoration-brand-200 underline-offset-4 hover:decoration-brand-600"
                  >
                    full cm-to-inches guide
                  </Link>{" "}
                  for worked examples and a mental-math shortcut.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <FormulaCard
                  title="Centimeters to inches"
                  equation="in = cm ÷ 2.54"
                  description="Divide the centimeter value by 2.54 to get inches."
                  example="20 cm ÷ 2.54 = 7.8740 in"
                />
                <FormulaCard
                  title="Inches to centimeters"
                  equation="cm = in × 2.54"
                  description="Multiply the inch value by 2.54 to get centimeters."
                  example="12 in × 2.54 = 30.48 cm"
                />
                <FormulaCard
                  title="Worked example"
                  equation="180 ÷ 2.54 = 70.8661"
                  description="So 180 centimeters equals 70.8661 inches."
                  example="In height form: 5 ft 10.87 in"
                  className="sm:col-span-2"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-slate-200 bg-slate-50/70">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <SectionHeading
              eyebrow="Guides"
              title="Understand the numbers, not just the result"
              description="Short, practical explanations of the units and formulas behind the calculators."
              action={{ label: "Browse all guides", href: "/guides/" }}
            />
            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {GUIDE_LINKS.map((guide, index) => (
                <Link
                  key={guide.href}
                  href={guide.href}
                  className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-card"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                      {index === 0 ? (
                        <BookOpen className="h-5 w-5" aria-hidden="true" />
                      ) : index === 1 ? (
                        <Ruler className="h-5 w-5" aria-hidden="true" />
                      ) : (
                        <TableProperties
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      )}
                    </span>
                    <ArrowRight
                      className="h-4 w-4 text-slate-300 transition-colors group-hover:text-brand-600"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="mt-5 text-base font-semibold text-navy">
                    {guide.label}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-7 text-slate-600">
                    {guide.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-slate-200">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <FAQ
              items={homeFaqs}
              title="CM to inches, answered"
              description="The essentials of converting between centimeters and inches, including the exact factor and a common height example."
            />
          </div>
        </section>

        <section className="border-t border-slate-200 bg-white">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-12 sm:flex-row sm:items-center sm:px-6 lg:px-8">
            <div>
              <h2 className="text-xl font-bold tracking-[-0.02em] text-navy">
                Need a conversion right now?
              </h2>
              <p className="mt-1.5 text-sm text-slate-600">
                Jump back to the calculator or open the full reference chart.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/#calculator"
                className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
              >
                Open the converter
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/cm-to-inches-chart/"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700"
              >
                View the chart
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
