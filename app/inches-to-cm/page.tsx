import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeftRight, Ruler } from "lucide-react";
import { AdSlot } from "@/components/AdSlot";
import { CalculatorWorkspace } from "@/components/CalculatorWorkspace";
import { ConversionCalculator } from "@/components/ConversionCalculator";
import { ConversionTable } from "@/components/ConversionTable";
import { FAQ } from "@/components/FAQ";
import { FormulaCard } from "@/components/FormulaCard";
import { JsonLd } from "@/components/JsonLd";
import { PageLayout, SectionHeading } from "@/components/PageLayout";
import { QuickReference } from "@/components/QuickReference";
import { RelatedTools } from "@/components/RelatedTools";
import { formatDecimal, inchesToCm } from "@/lib/conversions";
import { inchesToCmFaqs } from "@/lib/faqs";
import { createMetadata } from "@/lib/metadata";
import { webPageSchema } from "@/lib/schema";

const pagePath = "/inches-to-cm/";
const pageTitle = "Inches to Centimeters Converter";
const pageDescription =
  "Convert inches to centimeters instantly with the exact 2.54 factor. Includes a quick conversion table, worked examples, the formula, and common questions.";

export const metadata: Metadata = createMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
});

const inchValues = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 18, 20, 24, 30, 36, 40, 50, 60, 70,
  100,
];

const tableRows = inchValues.map((inches) => ({
  key: `in-${inches}`,
  highlight: inches === 12,
  cells: [formatDecimal(inches, 2), formatDecimal(inchesToCm(inches), 4)],
}));

const examples = [
  { inches: "1 in", calculation: "1 × 2.54", result: "2.54 cm" },
  { inches: "12 in", calculation: "12 × 2.54", result: "30.48 cm" },
  { inches: "70 in", calculation: "70 × 2.54", result: "177.8 cm" },
];

export default function InchesToCmPage() {
  return (
    <PageLayout
      eyebrow="Converters"
      title={pageTitle}
      description="Convert inches to centimeters with the exact 2.54 factor. Enter inches for an instant result, swap direction when needed, and use the table for quick lookups."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Inches to Centimeters", href: pagePath },
      ]}
      introExtra={
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-600">
            <Ruler className="h-3.5 w-3.5 text-brand-600" aria-hidden="true" />
            1 in = 2.54 cm
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-600">
            <ArrowLeftRight
              className="h-3.5 w-3.5 text-brand-600"
              aria-hidden="true"
            />
            Swap to cm → in at any time
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

      <CalculatorWorkspace
        calculator={
          <ConversionCalculator
            from="in"
            to="cm"
            initialValue="12"
            id="inches-to-cm-calculator"
            description="Enter an inch value to convert it to centimeters instantly."
          />
        }
        sidebar={
          <QuickReference
            rows={[
              { label: "1 in", value: "2.54 cm" },
              { label: "6 in", value: "15.24 cm" },
              { label: "12 in (1 ft)", value: "30.48 cm" },
              { label: "36 in (1 yd)", value: "91.44 cm" },
              { label: "70 in", value: "177.8 cm" },
              { label: "100 in", value: "254 cm" },
            ]}
            formula="centimeters = inches × 2.54"
            formulaNote="One inch is exactly 2.54 centimeters, so multiplication gives an exact result."
            chartHref="/cm-to-inches-chart/"
            chartDescription="Looking for the other direction? Use the centimeter-to-inch chart."
          />
        }
      />

      <AdSlot placement="converterBelowCalculator" className="my-12 sm:my-14" />

      <section className="mt-16 grid gap-10 sm:mt-20 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Formula"
            title="How to convert inches to cm"
            description="Multiply the number of inches by 2.54. The same exact factor applies whether you are measuring a phone screen or a doorway."
          />
          <div className="prose-cm mt-5 text-[0.95rem]">
            <p>
              The inch and the centimeter are linked by an exact definition:
              one inch is 2.54 centimeters. That makes the arithmetic simple.
              For example, 12 inches × 2.54 = 30.48 centimeters. Because 12
              inches is one foot, 30.48 centimeters is also the metric length
              of one foot.
            </p>
            <p>
              To go back to inches, divide the centimeter result by 2.54, or
              use the swap button in the calculator. The{" "}
              <Link href="/cm-to-inches/">
                centimeters to inches converter
              </Link>{" "}
              handles that direction with the same precision.
            </p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormulaCard
            title="Inches → centimeters"
            equation="cm = in × 2.54"
            description="Multiply the inch value by 2.54 to get centimeters."
            example="12 in × 2.54 = 30.48 cm"
          />
          <FormulaCard
            title="Centimeters → inches"
            equation="in = cm ÷ 2.54"
            description="Divide the centimeter value by 2.54 to return to inches."
            example="91.44 cm ÷ 2.54 = 36 in"
          />
          <div className="rounded-2xl border border-brand-100 bg-brand-50/70 p-5 sm:col-span-2 sm:p-6">
            <div className="grid gap-5 sm:grid-cols-3">
              {examples.map((example) => (
                <div key={example.inches}>
                  <p className="text-xs font-medium uppercase tracking-[0.1em] text-brand-700/70">
                    {example.inches}
                  </p>
                  <p className="mt-2 text-sm text-slate-500 tabular-nums">
                    {example.calculation}
                  </p>
                  <p className="mt-1 text-lg font-semibold text-navy tabular-nums">
                    = {example.result}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-16 sm:mt-20" aria-labelledby="inches-table-heading">
        <SectionHeading
          eyebrow="Quick table"
          title="Inches to centimeters conversion table"
          description="Common inch values, from a single inch up to one hundred inches."
          id="inches-table-heading"
        />
        <ConversionTable
          className="mt-7"
          caption="Inches to centimeters conversion table"
          columns={[
            { header: "Inches (in)" },
            { header: "Centimeters (cm)", align: "right" },
          ]}
          rows={tableRows}
          dense
          footnote="Values are calculated with the exact factor 1 in = 2.54 cm and rounded to four decimal places."
        />
      </section>

      <AdSlot placement="converterInContent" className="my-14 sm:my-16" />

      <section className="border-t border-slate-200 pt-12 sm:pt-14">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-700">
              <span className="h-px w-6 bg-brand-400" aria-hidden="true" />
              Context
            </p>
            <h2 className="mt-2.5 text-[1.65rem] font-bold leading-tight tracking-[-0.03em] text-navy sm:text-[2rem]">
              Why inches still matter
            </h2>
          </div>
          <div className="prose-cm max-w-3xl text-[0.95rem]">
            <p>
              Inches remain the default unit for many products and trades in
              the United States, including lumber, screens, pipes, and clothing
              sizes. International products and technical specifications often
              use centimeters instead. Converting between the two is a routine
              part of shopping, building, and comparing measurements across
              countries.
            </p>
            <p>
              The conversion is exact, but the way a measurement is rounded can
              still affect a project. A nominal 2×4 piece of lumber, for
              example, is not exactly 2 inches by 4 inches. Always use the
              actual measured dimensions when precision matters rather than the
              product&apos;s name or nominal size.
            </p>
            <p>
              For related tools, see the{" "}
              <Link href="/cm-to-feet/">
                centimeters to feet converter
              </Link>{" "}
              and the{" "}
              <Link href="/guides/inches-vs-centimeters/">
                comparison of inches and centimeters
              </Link>
              . Both explain how the units are used and where rounding can
              matter.
            </p>
          </div>
        </div>
      </section>

      <div className="mt-16 sm:mt-20">
        <FAQ items={inchesToCmFaqs} />
      </div>

      <RelatedTools
        className="mt-16 sm:mt-20"
        hrefs={[
          "/cm-to-inches/",
          "/cm-to-in/",
          "/cm-to-feet/",
          "/cm-to-feet-inches/",
          "/mm-to-inches/",
          "/meters-to-feet/",
        ]}
      />
    </PageLayout>
  );
}
