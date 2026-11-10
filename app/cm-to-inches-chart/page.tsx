import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Ruler, TableProperties } from "lucide-react";
import { AdSlot } from "@/components/AdSlot";
import { ConversionTable } from "@/components/ConversionTable";
import { FAQ } from "@/components/FAQ";
import { JsonLd } from "@/components/JsonLd";
import { PageLayout, SectionHeading } from "@/components/PageLayout";
import { RelatedTools } from "@/components/RelatedTools";
import {
  CHART_RANGES,
  getChartRows,
} from "@/lib/chart-data";
import { chartFaqs } from "@/lib/faqs";
import { createMetadata } from "@/lib/metadata";
import { webPageSchema } from "@/lib/schema";

const pagePath = "/cm-to-inches-chart/";
const pageTitle = "CM to Inches Conversion Chart";
const pageDescription =
  "Browse a complete centimeter to inches chart from 1 to 300 cm. Values are accurate to four decimal places, with jump links by range and a converter for custom values.";

export const metadata: Metadata = createMetadata({
  title: "CM to Inches Conversion Chart – 1 to 300 cm",
  description: pageDescription,
  path: pagePath,
});

const chartSections = CHART_RANGES.map((range) => ({
  ...range,
  rows: getChartRows(range).map((row) => ({
    key: `chart-${row.cm}`,
    highlight: row.cm % 10 === 0,
    cells: [row.cm, row.inches],
  })),
}));

const quickFacts = [
  { label: "1 cm", value: "0.3937 in" },
  { label: "50 cm", value: "19.685 in" },
  { label: "100 cm", value: "39.3701 in" },
  { label: "300 cm", value: "118.1102 in" },
];

export default function CmToInchesChartPage() {
  return (
    <PageLayout
      eyebrow="Conversion charts"
      title={pageTitle}
      description="Every whole centimeter from 1 to 300, converted to inches and rounded to four decimal places. Use the range links to jump straight to the value you need."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "CM to Inches Chart", href: pagePath },
      ]}
      introExtra={
        <div className="flex flex-wrap gap-2">
          <Link
            href="/cm-to-inches/"
            className="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-3 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-brand-700"
          >
            Open the converter
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600">
            <Ruler className="h-3.5 w-3.5 text-brand-600" aria-hidden="true" />
            1 in = 2.54 cm exactly
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600">
            <TableProperties
              className="h-3.5 w-3.5 text-brand-600"
              aria-hidden="true"
            />
            300 values
          </span>
        </div>
      }
    >
      <JsonLd
        data={webPageSchema({
          name: pageTitle,
          description: pageDescription,
          path: pagePath,
        })}
      />

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {quickFacts.map((fact) => (
          <div
            key={fact.label}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <p className="text-xs font-medium uppercase tracking-[0.1em] text-slate-500">
              {fact.label}
            </p>
            <p className="mt-2 text-xl font-bold tracking-[-0.02em] text-navy tabular-nums">
              {fact.value}
            </p>
          </div>
        ))}
      </section>

      <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-brand-100 bg-brand-50/70 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <p className="text-sm font-semibold text-navy">
            Need a value that is not a whole number?
          </p>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            The calculator accepts decimals, zero, and large values, and it
            converts in both directions.
          </p>
        </div>
        <Link
          href="/cm-to-inches/"
          className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
        >
          Convert a custom value
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>

      <nav
        aria-label="Jump to a chart range"
        className="mt-10 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
          Jump to a range
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {CHART_RANGES.map((range) => (
            <a
              key={range.id}
              href={`#${range.id}`}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700"
            >
              {range.label}
            </a>
          ))}
        </div>
      </nav>

      <section className="mt-12" aria-labelledby="chart-heading">
        <SectionHeading
          eyebrow="Full chart"
          title="Centimeters to inches, 1–300 cm"
          description="Each table uses the exact conversion factor. Multiples of ten are highlighted to make scanning easier."
          id="chart-heading"
        />

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {chartSections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              aria-labelledby={`${section.id}-heading`}
              className="rounded-2xl border border-slate-200 bg-slate-50/60 p-3 sm:p-4"
            >
              <div className="flex items-baseline justify-between gap-3 px-1 pb-3">
                <h3
                  id={`${section.id}-heading`}
                  className="text-sm font-bold text-navy"
                >
                  {section.label}
                </h3>
                <span className="text-[0.65rem] uppercase tracking-[0.1em] text-slate-500">
                  cm → in
                </span>
              </div>
              <ConversionTable
                caption={`Centimeters to inches conversion chart for ${section.label}`}
                columns={[
                  { header: "cm" },
                  { header: "in", align: "right" },
                ]}
                rows={section.rows}
                dense
                className="[&>div]:rounded-xl [&>div]:shadow-none"
              />
            </section>
          ))}
        </div>
      </section>

      <AdSlot placement="chartBelowContent" className="my-14 sm:my-16" />

      <section className="border-t border-slate-200 pt-12 sm:pt-14">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-700">
              <span className="h-px w-6 bg-brand-400" aria-hidden="true" />
              Using the chart
            </p>
            <h2 className="mt-2.5 text-[1.65rem] font-bold leading-tight tracking-[-0.03em] text-navy sm:text-[2rem]">
              How to read and round the values
            </h2>
          </div>
          <div className="prose-cm max-w-3xl text-[0.95rem]">
            <p>
              Find the centimeter measurement in the left column and read the
              matching number of inches on the right. The values are rounded to
              four decimal places. For example, 180 cm appears as 70.8661 in.
              The exact value has more digits, but four decimal places are
              enough for most everyday measurements.
            </p>
            <p>
              If you need a fractional inch for a tape measure, convert the
              decimal part to sixteenths or thirty-seconds. For 70.8661 inches,
              0.8661 × 16 ≈ 13.86, so the nearest sixteenth is 14/16, or 7/8.
              The result is about 70 ⅞ inches. The nearest thirty-second may be
              more appropriate for fine woodworking.
            </p>
            <p>
              Values that would round to zero at four decimal places are not
              shown in this whole-centimeter chart, but the{" "}
              <Link href="/cm-to-inches/">centimeter to inch calculator</Link>{" "}
              handles very small decimal inputs and displays a &ldquo;less
              than&rdquo; indicator. You can also read the{" "}
              <Link href="/guides/how-to-convert-cm-to-inches/">
                conversion guide
              </Link>{" "}
              for the formula and mental-math shortcut.
            </p>
          </div>
        </div>
      </section>

      <div className="mt-16 sm:mt-20">
        <FAQ items={chartFaqs} />
      </div>

      <RelatedTools
        className="mt-16 sm:mt-20"
        hrefs={[
          "/cm-to-inches/",
          "/inches-to-cm/",
          "/cm-to-feet/",
          "/cm-to-feet-inches/",
          "/cm-to-in/",
          "/mm-to-inches/",
        ]}
      />
    </PageLayout>
  );
}
