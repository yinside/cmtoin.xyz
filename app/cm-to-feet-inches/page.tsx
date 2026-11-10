import type { Metadata } from "next";
import Link from "next/link";
import { MoveVertical } from "lucide-react";
import { AdSlot } from "@/components/AdSlot";
import { CalculatorWorkspace } from "@/components/CalculatorWorkspace";
import { ConversionTable } from "@/components/ConversionTable";
import { FAQ } from "@/components/FAQ";
import { FormulaCard } from "@/components/FormulaCard";
import { HeightConverter } from "@/components/HeightConverter";
import { JsonLd } from "@/components/JsonLd";
import { PageLayout, SectionHeading } from "@/components/PageLayout";
import { QuickReference } from "@/components/QuickReference";
import { RelatedTools } from "@/components/RelatedTools";
import {
  cmToFeetAndInches,
  formatDecimal,
} from "@/lib/conversions";
import { cmToFeetInchesFaqs } from "@/lib/faqs";
import { createMetadata } from "@/lib/metadata";
import { webPageSchema } from "@/lib/schema";

const pagePath = "/cm-to-feet-inches/";
const pageTitle = "CM to Feet and Inches Converter";
const pageDescription =
  "Convert centimeters to feet and inches instantly. See 180 cm as 5 ft 10.87 in, with a height chart, the conversion method, rounding details, and common questions.";

export const metadata: Metadata = createMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
});

const heightValues = [150, 155, 160, 165, 170, 175, 180, 185, 190, 195, 200];

const tableRows = heightValues.map((cm) => {
  const height = cmToFeetAndInches(cm);
  return {
    key: `height-${cm}`,
    highlight: cm === 180,
    cells: [
      formatDecimal(cm, 2),
      formatDecimal(height.totalInches, 4),
      `${height.feet} ft ${height.inchesDisplay} in`,
    ],
  };
});

const examples = [
  {
    cm: "152 cm",
    math: "152 ÷ 2.54 = 59.8425 in",
    result: "4 ft 11.84 in",
  },
  {
    cm: "170 cm",
    math: "170 ÷ 2.54 = 66.9291 in",
    result: "5 ft 6.93 in",
  },
  {
    cm: "180 cm",
    math: "180 ÷ 2.54 = 70.8661 in",
    result: "5 ft 10.87 in",
  },
];

export default function CmToFeetInchesPage() {
  return (
    <PageLayout
      eyebrow="Converters"
      title={pageTitle}
      description="Convert centimeters into whole feet and remaining inches. Enter a height below to see the result, with the total inches and rounding shown for clarity."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "CM to Feet and Inches", href: pagePath },
      ]}
      introExtra={
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-600">
            <MoveVertical
              className="h-3.5 w-3.5 text-brand-600"
              aria-hidden="true"
            />
            180 cm = 5 ft 10.87 in
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-600">
            Inches rounded to 2 decimals
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
          <HeightConverter
            initialValue="180"
            id="cm-to-feet-inches-calculator"
          />
        }
        sidebar={
          <QuickReference
            rows={[
              { label: "150 cm", value: "4 ft 11.06 in" },
              { label: "160 cm", value: "5 ft 2.99 in" },
              { label: "170 cm", value: "5 ft 6.93 in" },
              { label: "180 cm", value: "5 ft 10.87 in" },
              { label: "190 cm", value: "6 ft 2.8 in" },
              { label: "200 cm", value: "6 ft 6.74 in" },
            ]}
            formula="total inches = cm ÷ 2.54 · 12 inches = 1 foot"
            formulaNote="The whole-number feet come out first. The remaining inches are what is left after subtracting those whole feet."
            chartHref="/cm-to-inches-chart/"
            chartLabel="Browse the cm to inches chart"
            chartDescription="See 1–300 cm converted to decimal inches."
          />
        }
      />

      <AdSlot placement="converterBelowCalculator" className="my-12 sm:my-14" />

      <section className="mt-16 grid gap-10 sm:mt-20 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Method"
            title="How cm becomes feet and inches"
            description="Two conversions happen in sequence: centimeters become inches, then the total inches are split into feet and a remainder."
          />
          <div className="prose-cm mt-5 text-[0.95rem]">
            <p>
              Divide the centimeter value by 2.54 to get total inches. Next,
              divide that total by 12 to find the number of whole feet. The
              remainder is the number of inches left over. For 180 cm, total
              inches are 70.8661; that is 5 whole feet and 10.8661 inches,
              which rounds to 5 ft 10.87 in.
            </p>
            <p>
              If the remaining inches round up to 12, the converter carries one
              extra foot, so a result never reads &ldquo;5 ft 12 in.&rdquo; This
              is the same way height is usually written in the United States.
              For decimal feet instead, use the{" "}
              <Link href="/cm-to-feet/">centimeters to feet converter</Link>.
            </p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormulaCard
            title="Step 1: total inches"
            equation="total in = cm ÷ 2.54"
            description="Convert centimeters to inches using the exact 2.54 factor."
            example="180 cm ÷ 2.54 = 70.8661 in"
          />
          <FormulaCard
            title="Step 2: split feet"
            equation="ft = total in ÷ 12"
            description="Take the whole-number part as feet and keep the decimal remainder as inches."
            example="70.8661 ÷ 12 = 5 ft + 10.8661 in"
          />
          <div className="rounded-2xl border border-brand-100 bg-brand-50/70 p-5 sm:col-span-2 sm:p-6">
            <div className="grid gap-5 sm:grid-cols-3">
              {examples.map((example) => (
                <div key={example.cm}>
                  <p className="text-xs font-medium uppercase tracking-[0.1em] text-brand-700/70">
                    {example.cm}
                  </p>
                  <p className="mt-2 text-xs leading-5 text-slate-500 tabular-nums">
                    {example.math}
                  </p>
                  <p className="mt-1 text-base font-semibold text-navy tabular-nums">
                    = {example.result}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-16 sm:mt-20" aria-labelledby="height-chart-heading">
        <SectionHeading
          eyebrow="Height chart"
          title="Centimeters to feet and inches"
          description="Common adult heights, shown with total inches and the feet-and-inches result."
          id="height-chart-heading"
        />
        <ConversionTable
          className="mt-7"
          caption="Centimeter heights converted to total inches and feet and inches"
          columns={[
            { header: "Centimeters (cm)" },
            { header: "Total inches (in)", align: "right" },
            { header: "Feet & inches", align: "right" },
          ]}
          rows={tableRows}
          dense
          footnote="Remaining inches are rounded to two decimal places. The calculator above accepts any positive centimeter value."
        />
      </section>

      <AdSlot placement="converterInContent" className="my-14 sm:my-16" />

      <section className="border-t border-slate-200 pt-12 sm:pt-14">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-700">
              <span className="h-px w-6 bg-brand-400" aria-hidden="true" />
              Rounding
            </p>
            <h2 className="mt-2.5 text-[1.65rem] font-bold leading-tight tracking-[-0.03em] text-navy sm:text-[2rem]">
              Why 180 cm is not exactly 5 ft 11 in
            </h2>
          </div>
          <div className="prose-cm max-w-3xl text-[0.95rem]">
            <p>
              Five feet 11 inches equals 71 inches, or 180.34 centimeters. A
              person who is 180 cm tall is therefore slightly shorter than
              5&apos;11&quot;. The exact result is 5 ft 10.8661 in, which rounds
              to 5 ft 10.87 in. The difference is only about a third of a
              centimeter, but it explains why height conversions sometimes
              appear to disagree.
            </p>
            <p>
              A person&apos;s measured height also changes throughout the day,
              and a tape measure can be read to different levels of precision.
              A conversion cannot add accuracy that was not present in the
              original measurement. When a form asks for height, use the
              convention it requests — for example, 5 ft 11 in rather than the
              decimal form.
            </p>
            <p>
              For more detail, read{" "}
              <Link href="/guides/cm-to-feet-and-inches/">
                the explanation of cm to feet and inches
              </Link>
              , or compare the same heights in the{" "}
              <Link href="/cm-to-inches-chart/">
                centimeter to inch chart
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <div className="mt-16 sm:mt-20">
        <FAQ items={cmToFeetInchesFaqs} />
      </div>

      <RelatedTools
        className="mt-16 sm:mt-20"
        hrefs={[
          "/cm-to-feet/",
          "/cm-to-inches/",
          "/inches-to-cm/",
          "/cm-to-in/",
          "/meters-to-feet/",
          "/mm-to-inches/",
        ]}
      />
    </PageLayout>
  );
}
