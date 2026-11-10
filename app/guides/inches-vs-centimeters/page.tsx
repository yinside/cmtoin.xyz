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
import { createMetadata } from "@/lib/metadata";
import { webPageSchema } from "@/lib/schema";

const pagePath = "/guides/inches-vs-centimeters/";
const pageTitle = "Inches vs. Centimeters: What's the Difference?";
const pageDescription =
  "Learn the difference between inches and centimeters, how the units are defined, where each is used, and how to convert between them accurately.";

export const metadata: Metadata = createMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  type: "article",
});

const comparisonRows = [
  {
    key: "ideal",
    cells: ["1 inch", "2.54 centimeters", "Exact definition"],
  },
  {
    key: "reverse",
    cells: ["1 centimeter", "0.3937 inches", "Rounded to 4 decimals"],
  },
  {
    key: "foot",
    cells: ["1 foot (12 inches)", "30.48 centimeters", "Exact definition"],
  },
  {
    key: "meter",
    cells: ["1 meter", "39.3701 inches", "Rounded to 4 decimals"],
  },
  {
    key: "yard",
    cells: ["1 yard (36 inches)", "91.44 centimeters", "Exact definition"],
  },
];

export default function InchesVsCentimetersGuide() {
  return (
    <PageLayout
      eyebrow="Guide"
      title={pageTitle}
      description="They both measure length, but they belong to different measurement systems. Here is how inches and centimeters are defined, where each is used, and how the exact relationship works."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Guides", href: "/guides/" },
        { label: "Inches vs. Centimeters", href: pagePath },
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
            toolHref="/inches-to-cm/"
            toolLabel="Inches to centimeters converter"
            toolDescription="Convert any inch value to centimeters with the exact 2.54 factor."
            relatedHref="/guides/how-to-convert-cm-to-inches/"
            relatedLabel="How to Convert CM to Inches"
            relatedDescription="The formula, worked examples, and a useful mental shortcut."
            quickFactLabel="One inch is"
            quickFactValue="2.54 centimeters"
          />
        }
      >
        <div className="prose-cm">
          <p className="text-lg leading-8 text-slate-700">
            An inch and a centimeter are both units of length, but they come
            from different measurement traditions. The inch belongs to the
            imperial and U.S. customary systems. The centimeter belongs to the
            metric system, which is used in most countries and in science.
          </p>
          <p>
            The difference is not just historical. A centimeter is smaller than
            an inch, and the two units are used for different kinds of products
            and tasks. Knowing which one a specification uses — and how to
            convert between them — prevents errors when measuring, shopping, or
            building.
          </p>

          <h2 id="inch">What is an inch?</h2>
          <p>
            An inch is a unit of length in the imperial and U.S. customary
            systems. Twelve inches make a foot, and thirty-six inches make a
            yard. The international inch has been defined as exactly 2.54
            centimeters since the 1959 international yard and pound agreement.
          </p>
          <p>
            In everyday use, inches appear on rulers and tape measures, screen
            sizes, pipe diameters, lumber dimensions, clothing, and height
            measurements in the United States. An inch is divided into halves,
            quarters, eighths, sixteenths, and smaller fractions depending on
            the tool.
          </p>

          <h2 id="centimeter">What is a centimeter?</h2>
          <p>
            A centimeter is one hundredth of a meter. The meter is the base unit
            of length in the International System of Units (SI), and centimeters
            are used widely in countries that measure in metric units. A
            centimeter is divided into ten millimeters.
          </p>
          <p>
            Centimeters are common for body measurements, clothing, furniture,
            paper sizes, and school work. They also appear in technical
            specifications around the world, even in countries that use inches
            for some everyday purposes.
          </p>

          <h2 id="relationship">The exact relationship</h2>
          <p>
            One inch is exactly 2.54 centimeters. That single definition drives
            every conversion between the two units. To go from inches to
            centimeters, multiply by 2.54. To go from centimeters to inches,
            divide by 2.54.
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <FormulaCard
            title="Inches → centimeters"
            equation="cm = in × 2.54"
            description="Multiply the inch value by the exact factor."
            example="10 in × 2.54 = 25.4 cm"
          />
          <FormulaCard
            title="Centimeters → inches"
            equation="in = cm ÷ 2.54"
            description="Divide the centimeter value by the exact factor."
            example="25.4 cm ÷ 2.54 = 10 in"
          />
        </div>

        <ConversionTable
          className="mt-8"
          caption="Common inch and centimeter equivalents"
          columns={[
            { header: "Length" },
            { header: "Equivalent", align: "right" },
            { header: "Note" },
          ]}
          rows={comparisonRows}
          dense
        />

        <Callout variant="info" title="A common misconception" className="mt-8">
          A centimeter is not half an inch. It is about 0.3937 inches, a little
          less than 0.4 inches. Two centimeters are about 0.7874 inches, still
          short of one inch. This matters when estimating measurements by eye.
        </Callout>

        <div className="prose-cm mt-10">
          <h2 id="usage">Where each unit is used</h2>
          <p>
            The United States uses inches for most everyday length measurements,
            although centimeters appear in science, medicine, and imported
            products. The United Kingdom uses a mix: metric units are common for
            many official and commercial purposes, while inches and miles remain
            familiar in everyday speech and some products. Canada and Australia
            are predominantly metric, but inches can still appear in trade
            sizes, screen measurements, and older plans.
          </p>
          <p>
            In science and engineering, metric units are standard, and
            centimeters or millimeters are often preferred for smaller
            dimensions. International manufacturing drawings may include both
            units or specify one as primary and the other as a reference.
          </p>

          <h2 id="choose">Which unit should you use?</h2>
          <ul>
            <li>
              <strong>Follow the specification or audience.</strong> If a form,
              drawing, or product listing asks for a unit, use that unit and
              convert only when necessary.
            </li>
            <li>
              <strong>Match the tool.</strong> A tape measure marked in inches is
              easier to read in inches. A ruler marked in centimeters is easier
              to read in centimeters.
            </li>
            <li>
              <strong>Prefer metric for scientific work.</strong> SI units avoid
              conversion steps when combining measurements or calculating areas
              and volumes.
            </li>
            <li>
              <strong>Keep the original value when possible.</strong> Converting
              adds a rounding step. If the source measurement is in inches,
              keeping the inch value avoids compounding that rounding.
            </li>
          </ul>

          <h2 id="convert">Converting without losing accuracy</h2>
          <p>
            The conversion factor is exact, but the measurement itself may not
            be. A board labeled 1 inch thick may not be exactly 1 inch, and a
            height measured with a tape measure may only be accurate to the
            nearest quarter inch. The converted result can preserve the
            arithmetic precisely, but it cannot improve the original
            measurement.
          </p>
          <p>
            For a direct result, use the{" "}
            <Link href="/inches-to-cm/">
              inches to centimeters converter
            </Link>{" "}
            or the{" "}
            <Link href="/cm-to-inches/">
              centimeters to inches converter
            </Link>
            . For a whole-number lookup, the{" "}
            <Link href="/cm-to-inches-chart/">
              centimeter to inch chart
            </Link>{" "}
            is faster. If you are converting a height, the{" "}
            <Link href="/cm-to-feet-inches/">
              cm to feet and inches converter
            </Link>{" "}
            formats the answer in the familiar feet-and-inches style.
          </p>

          <h2 id="summary">The short version</h2>
          <p>
            Inches are larger than centimeters. One inch is exactly 2.54
            centimeters, so a given length has fewer inches than centimeters.
            Multiply by 2.54 to move from inches to centimeters; divide by 2.54
            to move back. The math is exact, and the result is the same no
            matter which country you are in.
          </p>
        </div>
      </GuideBody>

      <RelatedTools
        className="mt-16 sm:mt-20"
        hrefs={[
          "/inches-to-cm/",
          "/cm-to-inches/",
          "/cm-to-in/",
          "/cm-to-feet/",
          "/cm-to-feet-inches/",
          "/cm-to-inches-chart/",
        ]}
      />
    </PageLayout>
  );
}
