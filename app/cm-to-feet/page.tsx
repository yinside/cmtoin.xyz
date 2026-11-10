import type { Metadata } from "next";
import Link from "next/link";
import { Footprints, MoveVertical } from "lucide-react";
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
import {
  cmToFeet,
  cmToFeetAndInches,
  formatDecimal,
} from "@/lib/conversions";
import { cmToFeetFaqs } from "@/lib/faqs";
import { createMetadata } from "@/lib/metadata";
import { webPageSchema } from "@/lib/schema";

const pagePath = "/cm-to-feet/";
const pageTitle = "Centimeters to Feet Converter";
const pageDescription =
  "Convert centimeters to feet with the exact 30.48 factor. Get decimal feet instantly, see worked examples, compare feet and inches, and review common questions.";

export const metadata: Metadata = createMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
});

const heightValues = [120, 150, 160, 170, 175, 180, 185, 190, 200];

const tableRows = heightValues.map((cm) => {
  const height = cmToFeetAndInches(cm);
  return {
    key: `height-${cm}`,
    highlight: cm === 180,
    cells: [
      formatDecimal(cm, 2),
      formatDecimal(cmToFeet(cm), 4),
      `${height.feet} ft ${height.inchesDisplay} in`,
    ],
  };
});

const examples = [
  { cm: "100 cm", calculation: "100 ÷ 30.48", feet: "3.2808 ft" },
  { cm: "180 cm", calculation: "180 ÷ 30.48", feet: "5.9055 ft" },
  { cm: "200 cm", calculation: "200 ÷ 30.48", feet: "6.5617 ft" },
];

export default function CmToFeetPage() {
  return (
    <PageLayout
      eyebrow="Converters"
      title={pageTitle}
      description="Convert centimeters to decimal feet with the exact 30.48 factor. For a height in feet and inches instead, the table and linked converter have you covered."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Centimeters to Feet", href: pagePath },
      ]}
      introExtra={
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-600">
            <Footprints
              className="h-3.5 w-3.5 text-brand-600"
              aria-hidden="true"
            />
            1 ft = 30.48 cm
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-600">
            Results in decimal feet
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
            from="cm"
            to="ft"
            initialValue="180"
            id="cm-to-feet-calculator"
            description="Enter a centimeter value to get the equivalent in decimal feet."
          />
        }
        sidebar={
          <QuickReference
            rows={[
              { label: "30.48 cm", value: "1 ft" },
              { label: "100 cm", value: "3.2808 ft" },
              { label: "150 cm", value: "4.9213 ft" },
              { label: "170 cm", value: "5.5774 ft" },
              { label: "180 cm", value: "5.9055 ft" },
              { label: "200 cm", value: "6.5617 ft" },
            ]}
            formula="feet = centimeters ÷ 30.48"
            formulaNote="One foot is exactly 30.48 centimeters. Decimal feet are useful for calculations and drawings."
            chartHref="/cm-to-feet-inches/"
            chartLabel="Need feet and inches?"
            chartDescription="Convert a centimeter height into whole feet plus remaining inches."
          />
        }
      />

      <AdSlot placement="converterBelowCalculator" className="my-12 sm:my-14" />

      <section className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Formula"
            title="How to convert cm to feet"
            description="Divide the centimeter value by 30.48. That is all there is to the decimal-feet conversion."
          />
          <div className="prose-cm mt-5 text-[0.95rem]">
            <p>
              A foot is defined as 0.3048 meters, which is the same as 30.48
              centimeters. Divide a centimeter measurement by 30.48 to express
              it in feet. For example, 180 cm ÷ 30.48 = 5.9055 feet.
            </p>
            <p>
              Decimal feet are common in construction, engineering, and
              spreadsheet calculations because you can keep calculating without
              converting fractions. If you need a human-readable height, the{" "}
              <Link href="/cm-to-feet-inches/">
                cm to feet and inches converter
              </Link>{" "}
              shows the whole feet plus the remaining inches.
            </p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormulaCard
            title="Centimeters → feet"
            equation="ft = cm ÷ 30.48"
            description="Divide the centimeter value by 30.48 to get decimal feet."
            example="180 cm ÷ 30.48 = 5.9055 ft"
          />
          <FormulaCard
            title="Feet → centimeters"
            equation="cm = ft × 30.48"
            description="Multiply the decimal feet by 30.48 to return to centimeters."
            example="6 ft × 30.48 = 182.88 cm"
          />
          <div className="rounded-2xl border border-brand-100 bg-brand-50/70 p-5 sm:col-span-2 sm:p-6">
            <div className="grid gap-5 sm:grid-cols-3">
              {examples.map((example) => (
                <div key={example.cm}>
                  <p className="text-xs font-medium uppercase tracking-[0.1em] text-brand-700/70">
                    {example.cm}
                  </p>
                  <p className="mt-2 text-sm text-slate-500 tabular-nums">
                    {example.calculation}
                  </p>
                  <p className="mt-1 text-lg font-semibold text-navy tabular-nums">
                    = {example.feet}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-16 sm:mt-20" aria-labelledby="feet-table-heading">
        <SectionHeading
          eyebrow="Reference"
          title="Centimeters to feet and inches"
          description="Decimal feet and the feet-and-inches form side by side, using common adult heights."
          id="feet-table-heading"
        />
        <ConversionTable
          className="mt-7"
          caption="Centimeters converted to decimal feet and to feet and inches"
          columns={[
            { header: "Centimeters (cm)" },
            { header: "Feet (ft)", align: "right" },
            { header: "Feet & inches", align: "right" },
          ]}
          rows={tableRows}
          dense
          footnote="Decimal feet are rounded to four decimal places. Remaining inches are rounded to two decimal places."
        />
      </section>

      <AdSlot placement="converterInContent" className="my-14 sm:my-16" />

      <section className="border-t border-slate-200 pt-12 sm:pt-14">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-700">
              <span className="h-px w-6 bg-brand-400" aria-hidden="true" />
              Which format?
            </p>
            <h2 className="mt-2.5 text-[1.65rem] font-bold leading-tight tracking-[-0.03em] text-navy sm:text-[2rem]">
              Decimal feet vs. feet and inches
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
              <div className="flex items-center gap-2">
                <Footprints
                  className="h-4 w-4 text-brand-600"
                  aria-hidden="true"
                />
                <h3 className="text-sm font-semibold text-navy">
                  Decimal feet
                </h3>
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Best for calculations, floor plans, and spreadsheets. A value
                like 5.9055 ft is easy to multiply or divide, but it is not how
                most people describe their height.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
              <div className="flex items-center gap-2">
                <MoveVertical
                  className="h-4 w-4 text-brand-600"
                  aria-hidden="true"
                />
                <h3 className="text-sm font-semibold text-navy">
                  Feet and inches
                </h3>
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Better for height and everyday measurements. 5.9055 ft becomes
                5 ft 10.87 in. The conversion uses whole feet first, then
                expresses the remainder in inches.
              </p>
            </div>
            <div className="rounded-2xl border border-brand-100 bg-brand-50/60 p-5 sm:col-span-2 sm:p-6">
              <p className="text-sm leading-7 text-slate-700">
                To convert a height in feet and inches back to centimeters,
                multiply the feet by 30.48 and the inches by 2.54, then add the
                results. For 5 ft 10.87 in: (5 × 30.48) + (10.87 × 2.54) ≈
                180 cm. The{" "}
                <Link
                  href="/guides/cm-to-feet-and-inches/"
                  className="font-medium text-brand-700 underline decoration-brand-200 underline-offset-4 hover:decoration-brand-600"
                >
                  full height conversion guide
                </Link>{" "}
                walks through the rounding.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-16 sm:mt-20">
        <FAQ items={cmToFeetFaqs} />
      </div>

      <RelatedTools
        className="mt-16 sm:mt-20"
        hrefs={[
          "/cm-to-feet-inches/",
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
