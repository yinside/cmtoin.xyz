import type { Metadata } from "next";
import Link from "next/link";
import { Callout } from "@/components/Callout";
import { ConversionTable } from "@/components/ConversionTable";
import { FormulaCard } from "@/components/FormulaCard";
import { GuideAside } from "@/components/GuideAside";
import { GuideBody } from "@/components/GuideBody";
import { JsonLd } from "@/components/JsonLd";
import { PageLayout } from "@/components/PageLayout";
import { RelatedTools } from "@/components/RelatedTools";
import { cmToInches, formatDecimal } from "@/lib/conversions";
import { createMetadata } from "@/lib/metadata";
import { webPageSchema } from "@/lib/schema";

const pagePath = "/guides/how-to-convert-cm-to-inches/";
const pageTitle = "How to Convert CM to Inches";
const pageDescription =
  "Learn how to convert centimeters to inches with the exact 2.54 formula. Includes step-by-step examples, a worked table, a mental-math shortcut, and rounding tips.";

export const metadata: Metadata = createMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  type: "article",
});

const exampleValues = [1, 5, 10, 50, 100, 180, 200];

const exampleRows = exampleValues.map((cm) => ({
  key: `guide-cm-${cm}`,
  highlight: cm === 180,
  cells: [formatDecimal(cm, 2), formatDecimal(cmToInches(cm), 4)],
}));

export default function HowToConvertCmToInchesGuide() {
  return (
    <PageLayout
      eyebrow="Guide"
      title={pageTitle}
      description="The conversion is one division. This guide explains the exact formula, shows where the numbers come from, and covers the rounding details that trip people up."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Guides", href: "/guides/" },
        { label: "How to Convert CM to Inches", href: pagePath },
      ]}
    >
      <JsonLd
        data={webPageSchema({
          name: pageTitle,
          description: pageDescription,
          path: pagePath,
        })}
      />

      <GuideBody
        aside={
          <GuideAside
            toolHref="/cm-to-inches/"
            toolLabel="Centimeters to inches converter"
            toolDescription="Enter any value and get an exact result in four decimal places."
            relatedHref="/guides/cm-to-feet-and-inches/"
            relatedLabel="CM to Feet and Inches, Explained"
            relatedDescription="Turn a centimeter height into whole feet plus inches."
            quickFactLabel="Exact relationship"
            quickFactValue="1 in = 2.54 cm"
          />
        }
      >
        <div className="prose-cm">
          <p className="text-lg leading-8 text-slate-700">
            Converting centimeters to inches is simpler than it looks. One inch
            is defined as exactly 2.54 centimeters, so the conversion is always
            the same division — no lookup table, no rounding factor, and no
            variation between countries.
          </p>
          <p>
            The phrase &ldquo;cm to inches&rdquo; describes a change of unit,
            not a change in the physical length. The distance stays the same;
            only the number and the unit label change. If you keep that in mind,
            it is easier to tell whether your answer should be larger or
            smaller than the value you started with.
          </p>

          <h2 id="formula">The exact formula</h2>
          <p>
            To convert centimeters to inches, divide the centimeter value by
            2.54:
          </p>
          <p>
            <strong>inches = centimeters ÷ 2.54</strong>
          </p>
          <p>
            To convert in the opposite direction, multiply the inch value by
            2.54. This works because the inch and the centimeter are linked by
            an exact definition, not an approximation.
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <FormulaCard
            title="Centimeters → inches"
            equation="in = cm ÷ 2.54"
            description="Divide the centimeter value by 2.54 to get inches."
            example="50 cm ÷ 2.54 = 19.685 in"
          />
          <FormulaCard
            title="Inches → centimeters"
            equation="cm = in × 2.54"
            description="Multiply the inch value by 2.54 to return to centimeters."
            example="20 in × 2.54 = 50.8 cm"
          />
        </div>

        <div className="prose-cm mt-10">
          <h2 id="steps">A step-by-step example</h2>
          <p>
            Let&apos;s convert 180 centimeters to inches. Start with the
            centimeter value, divide by 2.54, and label the result in inches.
          </p>
          <ol>
            <li>
              Write down the value: <strong>180 cm</strong>.
            </li>
            <li>
              Divide by 2.54: <strong>180 ÷ 2.54 = 70.8661417…</strong>
            </li>
            <li>
              Round for display: <strong>70.8661 in</strong> when shown to four
              decimal places.
            </li>
            <li>
              If you need feet and inches, split the total: 5 feet plus 10.87
              inches.
            </li>
          </ol>
          <p>
            The calculator on this site does the same operation but keeps more
            precision internally. It rounds only for the display, which is why
            the visible result can differ slightly from a calculation that was
            rounded at every step.
          </p>
        </div>

        <Callout
          variant="info"
          title="A quick sanity check"
          className="mt-8"
        >
          An inch is larger than a centimeter, so a given length has fewer
          inches than centimeters. If your converted number is larger than the
          original, you probably multiplied instead of divided.
        </Callout>

        <div className="prose-cm mt-10">
          <h2 id="examples">Worked examples</h2>
          <p>
            The table below shows the same calculation at several scales. Values
            are rounded to four decimal places.
          </p>
        </div>

        <ConversionTable
          className="mt-5"
          caption="Centimeters to inches worked examples"
          columns={[
            { header: "Centimeters (cm)" },
            { header: "Calculation" },
            { header: "Inches (in)", align: "right" },
          ]}
          rows={exampleRows.map((row) => ({
            ...row,
            cells: [
              row.cells[0],
              `÷ 2.54`,
              row.cells[1],
            ],
          }))}
          dense
          footnote="The exact factor is 1 in = 2.54 cm. Displayed values are rounded to four decimal places."
        />

        <div className="prose-cm mt-10">
          <h2 id="shortcut">The mental math shortcut</h2>
          <p>
            For a quick estimate, multiply the centimeter value by 0.4 and then
            subtract about 1.6% of that result. The second step corrects for the
            fact that 0.4 is slightly larger than 1 ÷ 2.54.
          </p>
          <p>
            For 180 cm: 180 × 0.4 = 72. About 1.6% of 72 is 1.15, so the
            estimate is 72 − 1.15 = 70.85 inches. The exact answer is 70.8661
            inches. The estimate is close enough for a rough comparison, but not
            for a cut list or a measurement that needs precision.
          </p>
          <p>
            A simpler version is to remember that 10 cm is just under 4 inches
            (3.937 inches). That makes it easy to estimate in ten-centimeter
            chunks: 50 cm is a little under 20 inches, and 100 cm is a little
            under 40 inches.
          </p>

          <h2 id="rounding">Decimal inches vs. fractional inches</h2>
          <p>
            Decimal inches are convenient for calculators, spreadsheets, and
            digital measuring tools. A tape measure usually uses fractions, so
            you may need to convert the decimal portion to the nearest
            thirty-second or sixteenth of an inch.
          </p>
          <p>
            For 70.8661 inches, multiply the decimal part by 16: 0.8661 × 16 =
            13.8576. Round that to 14 sixteenths, which simplifies to 7/8. The
            nearest fractional reading is therefore 70 ⅞ inches. It is a close
            match, but it is not the same number as 70.8661, so use the decimal
            value when the specification calls for it.
          </p>

          <h2 id="mistakes">Common mistakes to avoid</h2>
          <ul>
            <li>
              <strong>Multiplying by 2.54 in the wrong direction.</strong>{" "}
              Dividing goes from centimeters to inches; multiplying goes from
              inches to centimeters.
            </li>
            <li>
              <strong>Using 2.5 as a shortcut.</strong> It is close, but 1.6%
              off. On a 100 cm measurement, that is nearly 0.4 inches.
            </li>
            <li>
              <strong>Rounding the input before converting.</strong> Convert the
              measured value first, then round the result to the precision you
              need.
            </li>
            <li>
              <strong>Confusing feet with inches.</strong> A result of 70.8661 is
              inches, not feet. Five feet is only 60 inches.
            </li>
          </ul>

          <h2 id="tools">When to use a calculator or a chart</h2>
          <p>
            The{" "}
            <Link href="/cm-to-inches/">
              centimeters to inches converter
            </Link>{" "}
            is the best choice for a custom value, a decimal, or an exact result.
            The{" "}
            <Link href="/cm-to-inches-chart/">
              1–300 cm conversion chart
            </Link>{" "}
            is faster for a whole-number lookup. If you need a height, the{" "}
            <Link href="/cm-to-feet-inches/">
              cm to feet and inches converter
            </Link>{" "}
            formats the result the way most people describe height.
          </p>
        </div>
      </GuideBody>

      <RelatedTools
        className="mt-16 sm:mt-20"
        hrefs={[
          "/cm-to-inches/",
          "/inches-to-cm/",
          "/cm-to-feet/",
          "/cm-to-feet-inches/",
          "/cm-to-inches-chart/",
          "/mm-to-inches/",
        ]}
      />
    </PageLayout>
  );
}
