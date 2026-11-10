import type { Metadata } from "next";
import Link from "next/link";
import { ConversionTable } from "@/components/ConversionTable";
import { FormulaCard } from "@/components/FormulaCard";
import { GuideAside } from "@/components/GuideAside";
import { GuideBody } from "@/components/GuideBody";
import { JsonLd } from "@/components/JsonLd";
import { PageLayout } from "@/components/PageLayout";
import { RelatedTools } from "@/components/RelatedTools";
import {
  cmToFeetAndInches,
  formatDecimal,
} from "@/lib/conversions";
import { createMetadata } from "@/lib/metadata";
import { webPageSchema } from "@/lib/schema";

const pagePath = "/guides/cm-to-feet-and-inches/";
const pageTitle = "CM to Feet and Inches, Explained";
const pageDescription =
  "Understand how centimeters become feet and inches. Step-by-step examples, a height table, rounding rules, and an explanation of why 180 cm is not exactly 5 ft 11 in.";

export const metadata: Metadata = createMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  type: "article",
});

const heightValues = [150, 155, 160, 165, 170, 175, 180, 185, 190, 195, 200];

const tableRows = heightValues.map((cm) => {
  const height = cmToFeetAndInches(cm);
  return {
    key: `guide-height-${cm}`,
    highlight: cm === 180,
    cells: [
      formatDecimal(cm, 2),
      formatDecimal(height.totalInches, 4),
      `${height.feet} ft ${height.inchesDisplay} in`,
    ],
  };
});

export default function CmToFeetAndInchesGuide() {
  return (
    <PageLayout
      eyebrow="Guide"
      title={pageTitle}
      description="A centimeter height becomes feet and inches in two short steps. Here is how the conversion works, how rounding is handled, and why the result sometimes surprises people."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Guides", href: "/guides/" },
        { label: "CM to Feet and Inches", href: pagePath },
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
            toolHref="/cm-to-feet-inches/"
            toolLabel="CM to feet and inches converter"
            toolDescription="Enter a height and get whole feet plus remaining inches."
            relatedHref="/guides/how-to-convert-cm-to-inches/"
            relatedLabel="How to Convert CM to Inches"
            relatedDescription="The exact formula, worked examples, and rounding advice."
            quickFactLabel="Exact relationships"
            quickFactValue="1 ft = 30.48 cm"
          />
        }
      >
        <div className="prose-cm">
          <p className="text-lg leading-8 text-slate-700">
            Most of the world measures height in centimeters. In the United
            States, height is usually written in feet and inches. Converting
            between the two is straightforward once you separate the process
            into two steps: centimeters to inches, then inches to feet and a
            remainder.
          </p>
          <p>
            The result is usually written like <strong>5 ft 10.87 in</strong>.
            The feet are a whole number, while the inches keep a decimal. This
            is not a different measurement from 180 cm; it is the same length
            expressed in a different format.
          </p>

          <h2 id="method">The two-step method</h2>
          <p>
            First, convert centimeters to total inches by dividing by 2.54.
            Second, divide the total inches by 12. The whole-number part of that
            answer is the number of feet; the remainder is the number of inches.
          </p>
          <p>
            For 180 cm, the total is 70.8661 inches. That is 5 whole feet (60
            inches) with 10.8661 inches left over. Rounded to two decimal
            places, the height is 5 ft 10.87 in.
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <FormulaCard
            title="Step 1: total inches"
            equation="total in = cm ÷ 2.54"
            description="Use the exact inch definition to convert centimeters to inches."
            example="180 cm ÷ 2.54 = 70.8661 in"
          />
          <FormulaCard
            title="Step 2: feet and remainder"
            equation="5 ft + 10.8661 in"
            description="Take out whole feet, then keep the leftover inches."
            example="70.8661 in = 5 ft 10.87 in"
          />
        </div>

        <div className="prose-cm mt-10">
          <h2 id="example">A full worked example</h2>
          <p>
            Here is the calculation written out from start to finish for 180
            centimeters:
          </p>
          <ol>
            <li>Start with the centimeter measurement: 180 cm.</li>
            <li>
              Divide by 2.54 to get total inches: 180 ÷ 2.54 = 70.8661417… in.
            </li>
            <li>
              Divide by 12 to find whole feet: 70.8661417 ÷ 12 = 5 with a
              remainder.
            </li>
            <li>
              Subtract the five whole feet: 70.8661417 − 60 = 10.8661417 in.
            </li>
            <li>
              Round the remaining inches to two decimals: 10.87 in. The result
              is 5 ft 10.87 in.
            </li>
          </ol>
          <p>
            The total-inches step matters because it gives you one number to
            work with. Trying to convert centimeters to feet directly and then
            invent the inches separately usually creates rounding errors.
          </p>

          <h2 id="chart">Common heights</h2>
          <p>
            This table shows the result for a range of common adult heights.
            The total inches column is included so you can check the arithmetic.
          </p>
        </div>

        <ConversionTable
          className="mt-5"
          caption="Centimeter heights converted to total inches and feet and inches"
          columns={[
            { header: "Centimeters (cm)" },
            { header: "Total inches (in)", align: "right" },
            { header: "Feet & inches", align: "right" },
          ]}
          rows={tableRows}
          dense
          footnote="Remaining inches are rounded to two decimal places. The calculator keeps the full precision until the final display."
        />

        <div className="prose-cm mt-10">
          <h2 id="not-eleven">Why 180 cm is not exactly 5 ft 11 in</h2>
          <p>
            Five feet 11 inches equals 71 inches. Multiply 71 by 2.54 and you
            get 180.34 centimeters. A person who is 180.0 cm tall is therefore
            about a third of a centimeter shorter than 5&apos;11&quot;. The
            exact conversion is 5 ft 10.87 in, and rounding it to the nearest
            inch would give 5 ft 11 in — but that is a rounded height, not the
            exact converted value.
          </p>
          <p>
            This difference is why two people can both say they are
            &ldquo;about 5&apos;11&quot;&rdquo; while their metric heights read
            180 cm and 181 cm. The conversion is precise; the way people round
            their height is not always consistent.
          </p>

          <h2 id="rounding">How rounding to 12 inches is handled</h2>
          <p>
            Sometimes the remaining inches round up to 12.00. For example, a
            height might produce 5 ft 11.996 in. If the display simply rounded
            the inches, it would show 5 ft 12.00 in, which is not a valid height
            format. The converter detects that condition, adds one to the feet,
            and resets the inches to zero. The result becomes 6 ft 0 in.
          </p>

          <h2 id="reverse">Converting feet and inches back to centimeters</h2>
          <p>
            To go the other way, multiply the feet by 30.48 and the inches by
            2.54, then add the two results. For 5 ft 10.87 in:
          </p>
          <ul>
            <li>5 ft × 30.48 = 152.4 cm</li>
            <li>10.87 in × 2.54 = 27.6098 cm</li>
            <li>Total: 152.4 + 27.6098 = 180.0098 cm</li>
          </ul>
          <p>
            The small difference from exactly 180 cm comes from rounding the
            inches to two decimal places. If you carry the full value, the
            result returns to 180 cm.
          </p>

          <h2 id="mistakes">Common mistakes</h2>
          <ul>
            <li>
              <strong>Using 12 inches as the remainder limit but forgetting the
              carry.</strong> Always roll 12 inches into an extra foot.
            </li>
            <li>
              <strong>Converting centimeters directly to feet and then
              multiplying the decimal by 12 in the wrong place.</strong> Work
              from total inches first.
            </li>
            <li>
              <strong>Reporting more precision than the measurement
              supports.</strong> A height measured to the nearest centimeter
              does not become more accurate because the converted inches have
              two decimals.
            </li>
          </ul>

          <h2 id="tools">Tools for the job</h2>
          <p>
            The{" "}
            <Link href="/cm-to-feet-inches/">
              centimeters to feet and inches converter
            </Link>{" "}
            handles the full calculation and the 12-inch rollover automatically.
            If you need decimal feet for a drawing or spreadsheet, use the{" "}
            <Link href="/cm-to-feet/">centimeters to feet converter</Link>. For
            the underlying inch conversion, see the{" "}
            <Link href="/guides/how-to-convert-cm-to-inches/">
              cm to inches guide
            </Link>
            .
          </p>
        </div>
      </GuideBody>

      <RelatedTools
        className="mt-16 sm:mt-20"
        hrefs={[
          "/cm-to-feet-inches/",
          "/cm-to-feet/",
          "/cm-to-inches/",
          "/inches-to-cm/",
          "/cm-to-inches-chart/",
          "/cm-to-in/",
        ]}
      />
    </PageLayout>
  );
}
