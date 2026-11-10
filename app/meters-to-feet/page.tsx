import type { Metadata } from "next";
import Link from "next/link";
import { Milestone } from "lucide-react";
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
import { convertLength, formatDecimal } from "@/lib/conversions";
import { metersToFeetFaqs } from "@/lib/faqs";
import { createMetadata } from "@/lib/metadata";
import { webPageSchema } from "@/lib/schema";

const pagePath = "/meters-to-feet/";
const pageTitle = "Meters to Feet Converter";
const pageDescription =
  "Convert meters to feet instantly with the exact 0.3048 factor. See the formula, common conversions, a quick reference table, and answers to frequent questions.";

export const metadata: Metadata = createMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
});

const meterValues = [0.5, 1, 1.5, 1.8, 2, 2.5, 3, 5, 10, 20, 50, 100];

const tableRows = meterValues.map((meters) => ({
  key: `m-${meters}`,
  highlight: meters === 10,
  cells: [
    formatDecimal(meters, 2),
    formatDecimal(convertLength(meters, "m", "ft"), 4),
  ],
}));

export default function MetersToFeetPage() {
  return (
    <PageLayout
      eyebrow="Converters"
      title={pageTitle}
      description="Convert meters to feet with the exact 0.3048 factor. Enter a value for an instant result, then review the formula and a table of common distances."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Meters to Feet", href: pagePath },
      ]}
      introExtra={
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-600">
            <Milestone
              className="h-3.5 w-3.5 text-brand-600"
              aria-hidden="true"
            />
            1 m = 3.2808 ft
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-600">
            1 ft = 0.3048 m exactly
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
            from="m"
            to="ft"
            initialValue="10"
            id="meters-to-feet-calculator"
            description="Enter a meter value to get the equivalent in feet."
          />
        }
        sidebar={
          <QuickReference
            rows={[
              { label: "1 m", value: "3.2808 ft" },
              { label: "1.8 m", value: "5.9055 ft" },
              { label: "2 m", value: "6.5617 ft" },
              { label: "5 m", value: "16.4042 ft" },
              { label: "10 m", value: "32.8084 ft" },
              { label: "100 m", value: "328.084 ft" },
            ]}
            formula="feet = meters ÷ 0.3048"
            formulaNote="One foot is exactly 0.3048 meters, so divide by 0.3048 to convert meters to feet."
            chartHref="/cm-to-inches-chart/"
            chartDescription="For smaller measurements, browse the centimeter chart."
          />
        }
      />

      <AdSlot placement="converterBelowCalculator" className="my-12 sm:my-14" />

      <section className="mt-16 grid gap-10 sm:mt-20 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Formula"
            title="How to convert meters to feet"
            description="Divide the meter value by 0.3048. The result is the length in feet, with the same precision as the input."
          />
          <div className="prose-cm mt-5 text-[0.95rem]">
            <p>
              A meter is the base unit of length in the International System of
              Units. A foot is defined as exactly 0.3048 meters. To convert
              meters to feet, divide by 0.3048: 10 m ÷ 0.3048 = 32.8084 ft.
              Multiplying by 3.280839895 gives the same result.
            </p>
            <p>
              This conversion appears in real estate, architecture, sports, and
              travel, where the same distance may be listed in either unit. For
              heights and shorter lengths, the{" "}
              <Link href="/cm-to-feet/">centimeters to feet converter</Link>{" "}
              may be a better fit. To go the other way, swap the calculator
              direction and enter feet.
            </p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormulaCard
            title="Meters → feet"
            equation="ft = m ÷ 0.3048"
            description="Divide the meter value by 0.3048 to get feet."
            example="10 m ÷ 0.3048 = 32.8084 ft"
          />
          <FormulaCard
            title="Feet → meters"
            equation="m = ft × 0.3048"
            description="Multiply the foot value by 0.3048 to return to meters."
            example="30 ft × 0.3048 = 9.144 m"
          />
          <div className="rounded-2xl border border-brand-100 bg-brand-50/70 p-5 sm:col-span-2 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-700">
              Useful reference
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {[
                { label: "1 meter", value: "3.2808 ft" },
                { label: "1.8 meters", value: "5.9055 ft" },
                { label: "100 meters", value: "328.084 ft" },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-sm text-slate-500">{item.label}</p>
                  <p className="mt-1 text-lg font-semibold text-navy tabular-nums">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-16 sm:mt-20" aria-labelledby="meters-table-heading">
        <SectionHeading
          eyebrow="Quick table"
          title="Meters to feet conversion table"
          description="Common distances, from half a meter through one hundred meters."
          id="meters-table-heading"
        />
        <ConversionTable
          className="mt-7"
          caption="Meters to feet conversion table"
          columns={[
            { header: "Meters (m)" },
            { header: "Feet (ft)", align: "right" },
          ]}
          rows={tableRows}
          dense
          footnote="Values are calculated with the exact factor 1 ft = 0.3048 m and rounded to four decimal places."
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
              Meters, feet, and everyday distances
            </h2>
          </div>
          <div className="prose-cm max-w-3xl text-[0.95rem]">
            <p>
              Most of the world uses meters for official measurements, while
              feet remain common in the United States for real estate,
              construction, and aviation. A room listed as 5 meters by 4 meters
              is about 16.4 feet by 13.1 feet. A 100-meter sprint is about 328
              feet, or just over 109 yards.
            </p>
            <p>
              When converting areas or volumes, remember that the linear factor
              must be squared or cubed. A square meter is about 10.7639 square
              feet, not 3.2808. This page converts linear distance only. The{" "}
              <Link href="/cm-to-inches/">centimeter converter</Link> and{" "}
              <Link href="/cm-to-feet-inches/">
                height converter
              </Link>{" "}
              cover shorter lengths.
            </p>
          </div>
        </div>
      </section>

      <div className="mt-16 sm:mt-20">
        <FAQ items={metersToFeetFaqs} />
      </div>

      <RelatedTools
        className="mt-16 sm:mt-20"
        hrefs={[
          "/cm-to-feet/",
          "/cm-to-feet-inches/",
          "/cm-to-inches/",
          "/inches-to-cm/",
          "/mm-to-inches/",
          "/cm-to-in/",
        ]}
      />
    </PageLayout>
  );
}
