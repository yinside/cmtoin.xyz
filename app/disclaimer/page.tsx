import type { Metadata } from "next";
import Link from "next/link";
import { Callout } from "@/components/Callout";
import { JsonLd } from "@/components/JsonLd";
import { LegalBody } from "@/components/LegalBody";
import { PageLayout } from "@/components/PageLayout";
import { createMetadata } from "@/lib/metadata";
import { webPageSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";

const pagePath = "/disclaimer/";
const pageTitle = "Disclaimer";
const pageDescription =
  "CMtoIN conversions are provided for informational purposes. Review the limitations, accuracy notes, and guidance to independently verify measurements when precision is critical.";

export const metadata: Metadata = createMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
});

const sections = [
  { id: "general", label: "General information" },
  { id: "accuracy", label: "Conversion accuracy" },
  { id: "verify", label: "Verify critical measurements" },
  { id: "advice", label: "No professional advice" },
  { id: "external", label: "External links" },
  { id: "warranty", label: "No warranty" },
  { id: "liability", label: "Limitation of liability" },
  { id: "changes", label: "Changes" },
  { id: "contact", label: "Contact" },
];

export default function DisclaimerPage() {
  return (
    <PageLayout
      eyebrow="Legal"
      title={pageTitle}
      description="Conversions on this site are provided for informational purposes. When precision is critical, verify measurements independently."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Disclaimer", href: pagePath },
      ]}
    >
      <JsonLd
        data={webPageSchema({
          name: pageTitle,
          description: pageDescription,
          path: pagePath,
        })}
      />

      <Callout
        variant="warning"
        title="Template notice — review before publication"
        className="mb-10"
      >
        This disclaimer is a template prepared for CMtoIN. It should be reviewed
        by a qualified legal professional and adapted to the site&apos;s actual
        operations before publication.
      </Callout>

      <LegalBody sections={sections}>
        <p className="text-sm text-slate-500">
          Template last reviewed: November 10, 2026
        </p>

        <h2 id="general">1. General information</h2>
        <p>
          The calculators, charts, guides, and other content on CMtoIN are
          provided for general informational and educational purposes. While the
          site aims to be accurate and useful, it is not a substitute for
          professional measurement, engineering, medical, legal, financial, or
          other advice.
        </p>

        <h2 id="accuracy">2. Conversion accuracy</h2>
        <p>
          Conversions use established exact relationships, including 1 inch =
          2.54 centimeters, 1 foot = 30.48 centimeters, 1 inch = 25.4
          millimeters, and 1 foot = 0.3048 meters. Results are displayed with
          limited decimal places and are rounded for readability. The displayed
          precision may be lower than the precision of the original
          measurement.
        </p>
        <p>
          A conversion can only preserve the accuracy of its input. If a source
          measurement is approximate, or is rounded before it is entered, the
          converted result is approximate as well. The calculator cannot detect
          the tolerance of a physical measurement.
        </p>

        <h2 id="verify">3. Verify critical measurements</h2>
        <p>
          Do not rely solely on this site when precision is critical. Independently
          verify measurements and conversions before using them for
          construction, fabrication, machining, medical decisions, safety
          systems, legal matters, or any other application where an error could
          cause harm, loss, or significant cost.
        </p>
        <p>
          Use calibrated instruments, follow the applicable standard or
          specification, and confirm the required rounding with the person or
          organization relying on the result.
        </p>

        <h2 id="advice">4. No professional advice</h2>
        <p>
          Nothing on CMtoIN constitutes professional, technical, or legal advice.
          No client, fiduciary, or professional relationship is created by using
          the site. If you need advice for a specific situation, consult a
          qualified professional.
        </p>

        <h2 id="external">5. External links</h2>
        <p>
          The site may link to external websites for reference. CMtoIN does not
          control those sites and is not responsible for their content,
          accuracy, availability, or practices. Links do not imply endorsement.
        </p>

        <h2 id="warranty">6. No warranty</h2>
        <p>
          To the maximum extent permitted by applicable law, the site and its
          content are provided &ldquo;as is&rdquo; without warranties of any
          kind, express or implied. CMtoIN does not warrant that the site will
          be uninterrupted, error-free, or suitable for a particular purpose.
        </p>

        <h2 id="liability">7. Limitation of liability</h2>
        <p>
          To the maximum extent permitted by law, CMtoIN and its operator are not
          liable for any direct, indirect, incidental, special, or consequential
          damages arising from the use of, or reliance on, the site or its
          content. Some jurisdictions do not allow certain limitations, so parts
          of this section may not apply to you.
        </p>

        <h2 id="changes">8. Changes</h2>
        <p>
          This disclaimer may be updated as the site changes. The review date at
          the top of the page should be updated when it is revised.
        </p>

        <h2 id="contact">9. Contact</h2>
        <p>
          If you believe a conversion or piece of content is incorrect, please
          send the details to <a href={`mailto:${SITE.email}`}>{SITE.email}</a>{" "}
          or use the <Link href="/contact/">contact page</Link>. Corrections are
          appreciated.
        </p>
      </LegalBody>
    </PageLayout>
  );
}
