import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Ruler, TableProperties } from "lucide-react";
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
import { cmToInches, formatDecimal } from "@/lib/conversions";
import { cmToInchesFaqs } from "@/lib/faqs";
import { createMetadata } from "@/lib/metadata";
import { webPageSchema } from "@/lib/schema";

const pagePath = "/cm-to-inches/";
const pageTitle = "Centimeters to Inches Converter";
const pageDescription =
  "Convert centimeters to inches instantly with our free converter. See the exact formula, worked examples, a cm-to-inch chart, and answers to common questions.";

export const metadata: Metadata = createMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
});

const chartValues = [1, 5, 10, 20, 50, 100, 150, 170, 180, 190, 200];

const chartRows = chartValues.map((cm) => ({
  key: `cm-${cm}`,
  highlight: cm === 180,
  cells: [formatDecimal(cm, 2), formatDecimal(cmToInches(cm), 4)],
}));

const workedExamples = [
  {
    label: "A short measurement",
    input: "5 cm",
    equation: "5 ÷ 2.54 = 1.9685",
    output: "1.9685 in",
  },
  {
    label: "A common reference",
    input: "50 cm",
    equation: "50 ÷ 2.54 = 19.6850",
    output: "19.685 in",
  },
  {
    label: "An adult height",
    input: "180 cm",
    equation: "180 ÷ 2.54 = 70.8661",
    output: "70.8661 in",
  },
];

export default function CmToInchesPage() {
  return (
    <PageLayout
      eyebrow="Converters"
      title={pageTitle}
      description="Convert centimeters to inches with the exact 2.54 factor. Enter any value for an instant result, then review the formula, examples, and conversion chart."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Centimeters to Inches", href: pagePath },
      ]}
      introExtra={
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-600">
            <Ruler className="h-3.5 w-3.5 text-brand-600" aria-hidden="true" />
            1 cm = 0.3937 in
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-600">
            1 in = 2.54 cm
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-600">
            Results to 4 decimal places
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
            to="in"
            initialValue="10"
            id="cm-to-inches-calculator"
          />
        }
        sidebar={
          <QuickReference
            rows={[
              { label: "1 cm", value: "0.3937 in" },
              { label: "5 cm", value: "1.9685 in" },
              { label: "10 cm", value: "3.937 in" },
              { label: "50 cm", value: "19.685 in" },
              { label: "100 cm", value: "39.3701 in" },
              { label: "180 cm", value: "70.8661 in" },
            ]}
            formula="inches = centimeters ÷ 2.54"
            formulaNote="Or multiply centimeters by 0.3937007874. Both methods use the same exact definition."
            chartHref="/cm-to-inches-chart/"
            chartDescription="All values from 1 to 300 cm in one printable reference."
          />
        }
      />

      <AdSlot placement="converterBelowCalculator" className="my-12 sm:my-14" />

      <section className="mt-16 sm:mt-20" aria-labelledby="formula-heading">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Formula"
              title="How to convert cm to inches"
              description="The relationship is fixed: one inch is exactly 2.54 centimeters. That makes the conversion a single division."
              id="formula-heading"
            />
            <div className="prose-cm mt-5 text-[0.95rem]">
              <p>
                To convert centimeters to inches, divide the centimeter value
                by 2.54. The result is the length in inches. Because 2.54 is an
                exact definition rather than a rounded measurement, the same
                calculation works for a button, a piece of furniture, or a
                person&apos;s height.
              </p>
              <p>
                For example, 20 centimeters divided by 2.54 equals 7.8740
                inches. If you only need a rough estimate, multiplying by 0.4
                gives a close answer; the exact result will be slightly smaller.
                The calculator above always uses the exact factor.
              </p>
              <p>
                Need the opposite direction? The{" "}
                <Link href="/inches-to-cm/">
                  inches to centimeters converter
                </Link>{" "}
                multiplies by 2.54 instead. You can also use the swap button in
                the calculator to reverse the direction without leaving this
                page.
              </p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormulaCard
              title="Centimeters → inches"
              equation="in = cm ÷ 2.54"
              description="Divide the centimeter value by 2.54 to get the length in inches."
              example="20 cm ÷ 2.54 = 7.8740 in"
            />
            <FormulaCard
              title="Inches → centimeters"
              equation="cm = in × 2.54"
              description="Multiply the inch value by 2.54 to return to centimeters."
              example="12 in × 2.54 = 30.48 cm"
            />
            <div className="rounded-2xl border border-brand-100 bg-brand-50/70 p-5 sm:col-span-2 sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-700">
                The exact factor
              </p>
              <p className="mt-2 text-3xl font-bold tracking-[-0.04em] text-navy tabular-nums">
                2.54
              </p>
              <p className="mt-1 text-sm leading-7 text-slate-600">
                centimeters per inch, exactly. There are no exceptions and no
                rounding in the underlying conversion.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-16 sm:mt-20" aria-labelledby="examples-heading">
        <SectionHeading
          eyebrow="Examples"
          title="Centimeters to inches, worked out"
          description="Three examples show how the formula behaves at different scales."
          id="examples-heading"
        />
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {workedExamples.map((example) => (
            <div
              key={example.input}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <p className="text-xs font-medium uppercase tracking-[0.1em] text-slate-500">
                {example.label}
              </p>
              <p className="mt-3 text-2xl font-bold tracking-[-0.03em] text-navy tabular-nums">
                {example.input}
              </p>
              <p className="mt-2 text-sm text-slate-500 tabular-nums">
                {example.equation}
              </p>
              <p className="mt-4 border-t border-slate-100 pt-3 text-lg font-semibold text-brand-700 tabular-nums">
                = {example.output}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 sm:mt-20" aria-labelledby="chart-heading">
        <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-5 sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-14">
            <div>
              <SectionHeading
                eyebrow="Chart"
                title="Common centimeter to inch conversions"
                description="These are the values people look up most often. The full chart covers every whole centimeter from 1 to 300."
                id="chart-heading"
              />
              <Link
                href="/cm-to-inches-chart/"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-700"
              >
                <TableProperties className="h-4 w-4" aria-hidden="true" />
                View Full Chart
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <p className="mt-4 max-w-sm text-xs leading-5 text-slate-500">
                Displayed inch values are rounded to four decimal places. The
                calculator above uses the same exact factor with full internal
                precision.
              </p>
            </div>
            <ConversionTable
              caption="Common centimeter to inch conversions"
              columns={[
                { header: "Centimeters (cm)" },
                { header: "Inches (in)", align: "right" },
              ]}
              rows={chartRows}
              dense
            />
          </div>
        </div>
      </section>

      <AdSlot placement="converterInContent" className="my-14 sm:my-16" />

      <section
        className="border-t border-slate-200 pt-12 sm:pt-14"
        aria-labelledby="precision-heading"
      >
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-700">
              <span className="h-px w-6 bg-brand-400" aria-hidden="true" />
              Reading the result
            </p>
            <h2
              id="precision-heading"
              className="mt-2.5 text-[1.65rem] font-bold leading-tight tracking-[-0.03em] text-navy sm:text-[2rem]"
            >
              Decimal inches and rounding
            </h2>
          </div>
          <div className="prose-cm max-w-3xl text-[0.95rem]">
            <p>
              The calculator displays up to four decimal places and removes
              trailing zeros. A result of <strong>3.937</strong> inches is the
              same as <strong>3.9370</strong>; the shorter form is simply easier
              to read. When a value is smaller than 0.0001, the display uses a
              &ldquo;less than&rdquo; indicator instead of rounding it to zero.
            </p>
            <p>
              Decimal inches are convenient for calculators and spreadsheets,
              but a tape measure is usually marked in fractions. To find the
              nearest common fraction, convert the decimal part to sixteenths
              or thirty-seconds and simplify. For everyday work, rounding to
              the nearest 1/16 inch is usually sufficient. For precision
              machining or construction, verify against the project&apos;s
              required tolerance.
            </p>
            <p>
              To convert a height into feet and inches, use the{" "}
              <Link href="/cm-to-feet-inches/">
                centimeters to feet and inches converter
              </Link>
              . It converts 180 cm to 5 ft 10.87 in, for example. For a full
              reference, see the{" "}
              <Link href="/cm-to-inches-chart/">
                centimeter to inches chart
              </Link>{" "}
              or read the{" "}
              <Link href="/guides/how-to-convert-cm-to-inches/">
                step-by-step conversion guide
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <div className="mt-16 sm:mt-20">
        <FAQ items={cmToInchesFaqs} />
      </div>

      <RelatedTools
        className="mt-16 sm:mt-20"
        hrefs={[
          "/inches-to-cm/",
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
