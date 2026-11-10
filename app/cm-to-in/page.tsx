import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calculator, Info } from "lucide-react";
import { AdSlot } from "@/components/AdSlot";
import { CalculatorWorkspace } from "@/components/CalculatorWorkspace";
import { ConversionCalculator } from "@/components/ConversionCalculator";
import { ConversionTable } from "@/components/ConversionTable";
import { FAQ } from "@/components/FAQ";
import { JsonLd } from "@/components/JsonLd";
import { PageLayout, SectionHeading } from "@/components/PageLayout";
import { QuickReference } from "@/components/QuickReference";
import { RelatedTools } from "@/components/RelatedTools";
import { cmToInches, formatDecimal } from "@/lib/conversions";
import { cmToInFaqs } from "@/lib/faqs";
import { createMetadata } from "@/lib/metadata";
import { webPageSchema } from "@/lib/schema";

const pagePath = "/cm-to-in/";
const pageTitle = "CM to IN Converter";
const pageDescription =
  "Convert cm to in instantly. This centimeters to inches converter uses the exact 2.54 factor, with a quick conversion table, examples, and a simple estimation method.";

export const metadata: Metadata = createMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
});

const quickValues = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 25,
  30, 40, 50, 75, 100,
];

const quickRows = quickValues.map((cm) => ({
  key: `quick-${cm}`,
  highlight: cm === 100,
  cells: [formatDecimal(cm, 2), formatDecimal(cmToInches(cm), 4)],
}));

export default function CmToInPage() {
  return (
    <PageLayout
      eyebrow="Converters"
      title={pageTitle}
      description="“CM to IN” is shorthand for converting centimeters to inches. Enter a value below for an exact result, or use the quick table and estimation tips on this page."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "CM to IN", href: pagePath },
      ]}
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
            initialValue="100"
            id="cm-to-in-calculator"
            description="Type a centimeter value and the inch result appears immediately."
          />
        }
        sidebar={
          <QuickReference
            rows={[
              { label: "1 cm", value: "0.3937 in" },
              { label: "10 cm", value: "3.937 in" },
              { label: "30 cm", value: "11.811 in" },
              { label: "50 cm", value: "19.685 in" },
              { label: "100 cm", value: "39.3701 in" },
              { label: "190 cm", value: "74.8031 in" },
            ]}
            formula="in = cm ÷ 2.54"
            formulaNote="This is the same as multiplying by 0.3937007874, the number of inches in one centimeter."
            chartHref="/cm-to-inches-chart/"
            chartDescription="Browse every whole-centimeter value from 1 to 300."
          />
        }
      />

      <AdSlot placement="converterBelowCalculator" className="my-12 sm:my-14" />

      <section className="mt-16 grid gap-10 sm:mt-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="The abbreviation"
            title="What does CM to IN mean?"
            description="Both are standard unit symbols: cm stands for centimeter and in stands for inch."
          />
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
              <span className="font-semibold text-navy">cm</span>
              centimeter
            </span>
            <span className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
              <span className="font-semibold text-navy">in</span>
              inch
            </span>
          </div>
        </div>
        <div className="prose-cm max-w-3xl text-[0.95rem]">
          <p>
            When someone writes &ldquo;cm to in,&rdquo; they mean converting a
            length from centimeters to inches. It is the same conversion as
            &ldquo;cm to inches&rdquo;; the only difference is that the unit
            names are abbreviated. Search engines, product listings, and
            technical drawings all use these symbols interchangeably.
          </p>
          <p>
            The conversion factor never changes: one inch equals exactly 2.54
            centimeters. To convert cm to in, divide the centimeter value by
            2.54. For example, 100 cm ÷ 2.54 = 39.3701 in. To reverse it,
            multiply the inch value by 2.54.
          </p>
          <p>
            If you need a more detailed explanation, the{" "}
            <Link href="/cm-to-inches/">
              centimeters to inches converter
            </Link>{" "}
            includes additional worked examples and a discussion of decimal
            versus fractional inches. The{" "}
            <Link href="/cm-to-inches-chart/">full chart</Link> is useful when
            you want to look up a value without typing.
          </p>
        </div>
      </section>

      <section className="mt-16 sm:mt-20" aria-labelledby="cm-in-table-heading">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Quick table"
            title="CM to IN conversion table"
            description="Whole-centimeter values from 1 to 20, plus a few frequently used larger measurements."
            id="cm-in-table-heading"
          />
          <Link
            href="/cm-to-inches-chart/"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800"
          >
            View the 1–300 cm chart
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <ConversionTable
          className="mt-7"
          caption="CM to IN conversion table from 1 centimeter to 100 centimeters"
          columns={[
            { header: "Centimeters (cm)" },
            { header: "Inches (in)", align: "right" },
          ]}
          rows={quickRows}
          dense
          footnote="Inch values are rounded to four decimal places. The converter keeps full precision internally."
        />
      </section>

      <section className="mt-16 sm:mt-20" aria-labelledby="estimate-heading">
        <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-5 sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
            <div>
              <SectionHeading
                eyebrow="Mental math"
                title="A fast way to estimate inches"
                description="Useful when you are away from the calculator and only need an approximate answer."
                id="estimate-heading"
              />
              <p className="mt-4 text-xs leading-5 text-slate-500">
                This shortcut is for estimates only. Use the calculator for an
                exact result.
              </p>
            </div>
            <div className="space-y-3">
              {[
                {
                  step: "1",
                  title: "Multiply by 0.4",
                  text: "Move the decimal point and multiply. For 50 cm, that gives 20 inches.",
                },
                {
                  step: "2",
                  title: "Subtract about 1.6%",
                  text: "About 1.6% of 20 is 0.32, so the estimate is about 19.7 inches.",
                },
                {
                  step: "3",
                  title: "Compare with the exact value",
                  text: "50 cm is exactly 19.6850 inches. The estimate is off by less than two hundredths of an inch.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-50 text-sm font-bold text-brand-700">
                    {item.step}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-navy">
                      {item.title}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <AdSlot placement="converterInContent" className="my-14 sm:my-16" />

      <section className="border-t border-slate-200 pt-12 sm:pt-14">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-700">
              <span className="h-px w-6 bg-brand-400" aria-hidden="true" />
              Good to know
            </p>
            <h2 className="mt-2.5 text-[1.65rem] font-bold leading-tight tracking-[-0.03em] text-navy sm:text-[2rem]">
              How accurate is the converter?
            </h2>
          </div>
          <div className="space-y-4">
            <div className="flex gap-3 rounded-2xl border border-brand-100 bg-brand-50/60 p-4 sm:p-5">
              <Calculator
                className="mt-0.5 h-4 w-4 shrink-0 text-brand-600"
                aria-hidden="true"
              />
              <p className="text-sm leading-7 text-slate-700">
                The calculator uses the exact 2.54 factor defined for the
                international inch. No rounded conversion factor is used in the
                calculation; rounding happens only when the result is displayed
                to four decimal places.
              </p>
            </div>
            <div className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
              <Info
                className="mt-0.5 h-4 w-4 shrink-0 text-slate-400"
                aria-hidden="true"
              />
              <p className="text-sm leading-7 text-slate-600">
                Very small values are shown with a &ldquo;less than&rdquo;
                indicator when they would otherwise round to zero at four
                decimal places. For measurement work where precision matters,
                confirm the required tolerance and round accordingly.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-16 sm:mt-20">
        <FAQ items={cmToInFaqs} />
      </div>

      <RelatedTools
        className="mt-16 sm:mt-20"
        hrefs={[
          "/cm-to-inches/",
          "/inches-to-cm/",
          "/cm-to-feet/",
          "/cm-to-feet-inches/",
          "/mm-to-inches/",
          "/meters-to-feet/",
        ]}
      />
    </PageLayout>
  );
}
