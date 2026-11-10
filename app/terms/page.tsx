import type { Metadata } from "next";
import Link from "next/link";
import { Callout } from "@/components/Callout";
import { JsonLd } from "@/components/JsonLd";
import { LegalBody } from "@/components/LegalBody";
import { PageLayout } from "@/components/PageLayout";
import { createMetadata } from "@/lib/metadata";
import { webPageSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";

const pagePath = "/terms/";
const pageTitle = "Terms of Use";
const pageDescription =
  "Review the CMtoIN terms of use template, covering acceptable use, intellectual property, disclaimers, liability, and the informational purpose of the converters.";

export const metadata: Metadata = createMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
});

const sections = [
  { id: "acceptance", label: "Acceptance of terms" },
  { id: "purpose", label: "Purpose of the site" },
  { id: "use", label: "Use of the site" },
  { id: "ip", label: "Intellectual property" },
  { id: "acceptable", label: "Acceptable use" },
  { id: "links", label: "Third-party links" },
  { id: "warranty", label: "No warranty" },
  { id: "liability", label: "Limitation of liability" },
  { id: "indemnity", label: "Indemnification" },
  { id: "changes", label: "Changes" },
  { id: "law", label: "Governing law" },
  { id: "contact", label: "Contact" },
];

export default function TermsPage() {
  return (
    <PageLayout
      eyebrow="Legal"
      title={pageTitle}
      description="The terms that apply when you use CMtoIN. This document is a template and requires review before publication."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Terms of Use", href: pagePath },
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
        These terms of use are a template prepared for CMtoIN. They must be
        reviewed by a qualified legal professional and adapted to the
        operator&apos;s location, hosting arrangements, and business model
        before publication. The template is not legal advice.
      </Callout>

      <LegalBody sections={sections}>
        <p className="text-sm text-slate-500">
          Template last reviewed: November 10, 2026
        </p>

        <h2 id="acceptance">1. Acceptance of terms</h2>
        <p>
          By accessing or using CMtoIN at{" "}
          <Link href="/">cmtoin.xyz</Link> (the &ldquo;site&rdquo;), you agree
          to these terms of use. If you do not agree, do not use the site.
        </p>

        <h2 id="purpose">2. Purpose of the site</h2>
        <p>
          CMtoIN provides measurement conversion tools, conversion charts, and
          informational content. The site is intended for general informational
          and educational use. It is not a professional measurement, engineering,
          medical, legal, or financial service.
        </p>
        <p>
          Conversions are mathematical and should be independently verified when
          the result will be used in a context where precision is critical. See
          the <Link href="/disclaimer/">disclaimer</Link> for details.
        </p>

        <h2 id="use">3. Use of the site</h2>
        <p>
          You may use the calculators and content for personal and internal
          business purposes in accordance with these terms. You are responsible
          for the accuracy of the values you enter and for how you use the
          results. You may not use the site in a way that violates applicable law
          or the rights of another person.
        </p>

        <h2 id="ip">4. Intellectual property</h2>
        <p>
          The site&apos;s design, text, layout, brand elements, and original
          content are protected by applicable intellectual property laws. You
          may not copy, republish, or redistribute substantial portions of the
          site without permission, except as permitted by law. You may share
          links to public pages and quote short excerpts with attribution.
        </p>
        <p>
          Unit names and conversion factors are common standards and are not
          claimed as proprietary. Third-party trademarks remain the property of
          their respective owners.
        </p>

        <h2 id="acceptable">5. Acceptable use</h2>
        <p>You agree not to:</p>
        <ul>
          <li>
            Attempt to interfere with the operation, security, or availability
            of the site.
          </li>
          <li>
            Use automated tools to scrape or overload the site in a manner that
            degrades service for others.
          </li>
          <li>
            Misrepresent the site or its results as professional advice or as an
            official service of a standards body.
          </li>
          <li>
            Use the site to distribute malware, unlawful material, or content
            that infringes another person&apos;s rights.
          </li>
        </ul>

        <h2 id="links">6. Third-party links and services</h2>
        <p>
          The site may link to third-party websites or use third-party services.
          Those services are governed by their own terms and privacy policies.
          CMtoIN does not control and is not responsible for third-party content,
          availability, or practices.
        </p>

        <h2 id="warranty">7. No warranty</h2>
        <p>
          The site and its content are provided on an &ldquo;as is&rdquo; and
          &ldquo;as available&rdquo; basis. To the maximum extent permitted by
          applicable law, CMtoIN disclaims all warranties, express or implied,
          including warranties of accuracy, merchantability, fitness for a
          particular purpose, and non-infringement. No guarantee is made that
          the site will be uninterrupted, error-free, or free of harmful
          components.
        </p>

        <h2 id="liability">8. Limitation of liability</h2>
        <p>
          To the maximum extent permitted by applicable law, CMtoIN and its
          operator will not be liable for indirect, incidental, special,
          consequential, or punitive damages, or for lost profits, data,
          business, or goodwill, arising from or related to your use of the
          site. Nothing in these terms limits liability that cannot be limited
          under applicable law.
        </p>

        <h2 id="indemnity">9. Indemnification</h2>
        <p>
          To the extent permitted by applicable law, you agree to indemnify and
          hold harmless CMtoIN and its operator from claims, liabilities, and
          expenses arising from your misuse of the site or violation of these
          terms. This section should be reviewed for the operator&apos;s
          jurisdiction.
        </p>

        <h2 id="changes">10. Changes to the site and terms</h2>
        <p>
          The site may be changed, suspended, or discontinued at any time. These
          terms may be updated to reflect changes to the site or applicable law.
          The review date at the top of the page should be updated when changes
          are made. Continued use after an update constitutes acceptance of the
          revised terms.
        </p>

        <h2 id="law">11. Governing law</h2>
        <p>
          These terms should be governed by the laws of the operator&apos;s
          jurisdiction, without regard to conflict-of-law rules. Before
          publication, replace this paragraph with the specific governing
          jurisdiction and, where appropriate, the agreed venue for disputes.
        </p>

        <h2 id="contact">12. Contact</h2>
        <p>
          Questions about these terms can be sent to{" "}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. The{" "}
          <Link href="/contact/">contact page</Link> has more information.
        </p>
      </LegalBody>
    </PageLayout>
  );
}
