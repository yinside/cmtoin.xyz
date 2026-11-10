import type { Metadata } from "next";
import Link from "next/link";
import { MoveHorizontal, Ruler } from "lucide-react";
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
import { mmToInchesFaqs } from "@/lib/faqs";
import { createMetadata } from "@/lib/metadata";
import { webPageSchema } from "@/lib/schema";

const pagePath = "/mm-to-inches/";
const pageTitle = "Millimeters to Inches Converter";
const pageDescription =
  "Convert millimeters to inches instantly with the exact 25.4 factor. Includes a conversion table, formula, worked examples, and practical precision notes.";

export const metadata: Metadata = createMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
});

const mmValues = [
  1, 2, 3, 4, 5, 10, 15, 20, 25, 25.4, 30, 40, 50, 75, 100, 150, 200, 250, 500,
  1000,
];

const tableRows = mmValues.map((mm) => ({
  key: `mm-${mm}`,
  highlight: mm === 25.4,
  cells: [
    formatDecimal(mm, 2),
    formatDecimal(convertLength(mm, "mm", "in"), 4),
  ],
}));

export default function MmToInchesPage() {
  return (
    <PageLayout
      eyebrow="Converters"
      title={pageTitle}
      description="Convert millimeters to inches with the exact 25.4 factor. Enter a value for an instant result, then use the table for common small measurements."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Millimeters to Inches", href: pagePath },
      ]}
      introExtra={
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-600">
            <Ruler className="h-3.5 w-3.5 text-brand-600" aria-hidden="true" />
            25.4 mm = 1 in exactly
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-600">
            <MoveHorizontal
              className="h-3.5 w-3.5 text-brand-600"
              aria-hidden="true"
            />
            Bidirectional with swap
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
            from="mm"
            to="in"
            initialValue="100"
            id="mm-to-inches-calculator"
            description="Enter a millimeter value to get the equivalent in inches."
          />
        }
        sidebar={
          <QuickReference
            rows={[
              { label: "1 mm", value: "0.0394 in" },
              { label: "5 mm", value: "0.1969 in" },
              { label: "10 mm", value: "0.3937 in" },
              { label: "25.4 mm", value: "1 in" },
              { label: "50 mm", value: "1.9685 in" },
              { label: "100 mm", value: "3.937 in" },
            ]}
            formula="inches = millimeters ÷ 25.4"
            formulaNote="One inch is exactly 25.4 millimeters, so the conversion is a straightforward division."
            chartHref="/cm-to-inches-chart/"
            chartDescription="Need larger metric values? Use the full centimeter chart."
          />
        }
      />

      <AdSlot placement="converterBelowCalculator" className="my-12 sm:my-14" />

      <section className="mt-16 grid gap-10 sm:mt-20 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Formula"
            title="How to convert mm to inches"
            description="Divide the millimeter value by 25.4. The factor is exact because the inch is defined as 25.4 millimeters."
          />
          <div className="prose-cm mt-5 text-[0.95rem]">
            <p>
              Millimeters and inches are both used for small measurements, but
              they belong to different systems. A millimeter is one thousandth
              of a meter. An inch is 25.4 millimeters exactly. To convert, divide
              by 25.4; for example, 100 mm ÷ 25.4 = 3.9370 inches.
            </p>
            <p>
              This conversion is common in manufacturing, electronics, jewelry,
              and hobby work, where components may be specified in either unit.
              A part described as 25.4 mm is exactly 1 inch, but a part
              described as 25 mm is slightly smaller at 0.9843 inches.
            </p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormulaCard
            title="Millimeters → inches"
            equation="in = mm ÷ 25.4"
            description="Divide the millimeter value by 25.4 to get inches."
            example="50 mm ÷ 25.4 = 1.9685 in"
          />
          <FormulaCard
            title="Inches → millimeters"
            equation="mm = in × 25.4"
            description="Multiply the inch value by 25.4 to return to millimeters."
            example="2 in × 25.4 = 50.8 mm"
          />
          <div className="rounded-2xl border border-brand-100 bg-brand-50/70 p-5 sm:col-span-2 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-700">
              Watch the difference
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm text-slate-500">25 mm</p>
                <p className="mt-1 text-2xl font-bold tracking-[-0.03em] text-navy tabular-nums">
                  0.9843 in
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-500">25.4 mm</p>
                <p className="mt-1 text-2xl font-bold tracking-[-0.03em] text-brand-700 tabular-nums">
                  1.0000 in
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-16 sm:mt-20" aria-labelledby="mm-table-heading">
        <SectionHeading
          eyebrow="Quick table"
          title="Millimeters to inches conversion table"
          description="Small measurements from 1 mm to 1,000 mm, including the exact 25.4 mm mark."
          id="mm-table-heading"
        />
        <ConversionTable
          className="mt-7"
          caption="Millimeters to inches conversion table"
          columns={[
            { header: "Millimeters (mm)" },
            { header: "Inches (in)", align: "right" },
          ]}
          rows={tableRows}
          dense
          footnote="Inch values are rounded to four decimal places. The exact factor is 1 in = 25.4 mm."
        />
      </section>

      <AdSlot placement="converterInContent" className="my-14 sm:my-16" />

      <section className="border-t border-slate-200 pt-12 sm:pt-14">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-700">
              <span className="h-px w-6 bg-brand-400" aria-hidden="true" />
              Precision
            </p>
            <h2 className="mt-2.5 text-[1.65rem] font-bold leading-tight tracking-[-0.03em] text-navy sm:text-[2rem]">
              When a few thousandths matter
            </h2>
          </div>
          <div className="prose-cm max-w-3xl text-[0.95rem]">
            <p>
              At the millimeter scale, rounding can matter. Displaying an inch
              value to four decimal places keeps the rounding error below
              0.00005 inches, but the original measurement may already have a
              looser tolerance. Always start from the precision of the source
              measurement rather than assuming the converted value is more
              accurate.
            </p>
            <p>
              For a larger metric conversion, the{" "}
              <Link href="/cm-to-inches/">centimeter to inch converter</Link>{" "}
              works the same way. For a quick lookup across a broad range, use
              the{" "}
              <Link href="/cm-to-inches-chart/">
                centimeter to inch chart
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <div className="mt-16 sm:mt-20">
        <FAQ items={mmToInchesFaqs} />
      </div>

      <RelatedTools
        className="mt-16 sm:mt-20"
        hrefs={[
          "/cm-to-inches/",
          "/inches-to-cm/",
          "/cm-to-feet/",
          "/cm-to-feet-inches/",
          "/meters-to-feet/",
          "/cm-to-in/",
        ]}
      />
    </PageLayout>
  );
}
