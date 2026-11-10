import type { Metadata } from "next";
import Link from "next/link";
import { Callout } from "@/components/Callout";
import { JsonLd } from "@/components/JsonLd";
import { LegalBody } from "@/components/LegalBody";
import { PageLayout } from "@/components/PageLayout";
import { createMetadata } from "@/lib/metadata";
import { webPageSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";

const pagePath = "/privacy-policy/";
const pageTitle = "Privacy Policy";
const pageDescription =
  "Read the CMtoIN privacy policy template, covering cookies, analytics, advertising, third-party services, data retention, and user privacy choices.";

export const metadata: Metadata = createMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
});

const sections = [
  { id: "overview", label: "Overview" },
  { id: "information", label: "Information we collect" },
  { id: "calculator", label: "Calculator data" },
  { id: "cookies", label: "Cookies" },
  { id: "analytics", label: "Analytics" },
  { id: "advertising", label: "Advertising" },
  { id: "third-parties", label: "Third-party services" },
  { id: "use", label: "How information is used" },
  { id: "retention", label: "Data retention" },
  { id: "rights", label: "Your privacy rights" },
  { id: "children", label: "Children's privacy" },
  { id: "international", label: "International visitors" },
  { id: "changes", label: "Changes to this policy" },
  { id: "contact", label: "Contact" },
];

export default function PrivacyPolicyPage() {
  return (
    <PageLayout
      eyebrow="Legal"
      title={pageTitle}
      description="How CMtoIN approaches privacy, cookies, analytics, and advertising. This document is a template and requires review before publication."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Privacy Policy", href: pagePath },
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
        This privacy policy is a template prepared for CMtoIN. It must be
        reviewed by a qualified legal or privacy professional and adapted to the
        site&apos;s actual hosting provider, analytics setup, advertising
        configuration, and jurisdiction before it is published. It does not
        create legal obligations on its own.
      </Callout>

      <LegalBody sections={sections}>
        <p className="text-sm text-slate-500">
          Template last reviewed: November 10, 2026
        </p>

        <h2 id="overview">1. Overview</h2>
        <p>
          CMtoIN (&ldquo;CMtoIN,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or
          &ldquo;our&rdquo;) operates the website at{" "}
          <Link href="/">cmtoin.xyz</Link>. This page explains the types of
          information that may be processed when you visit the site, how that
          information may be used, and the choices available to you.
        </p>
        <p>
          This policy is written for a website that provides free measurement
          conversion tools, charts, and informational content. It does not cover
          information collected by third-party websites you reach through
          external links.
        </p>

        <h2 id="information">2. Information we collect</h2>
        <p>
          CMtoIN does not require an account, and the site does not ask for your
          name, postal address, or payment details to use a calculator. The
          information that may be processed falls into these categories:
        </p>
        <ul>
          <li>
            <strong>Technical information:</strong> like most websites, the
            hosting infrastructure may automatically receive standard request
            information such as an IP address, browser type, device type,
            referring page, requested URL, and date and time of the request.
          </li>
          <li>
            <strong>Usage information:</strong> CMtoIN uses Vercel Web Analytics
            to collect aggregated information about pages visited, referring
            sources, approximate country, device category, operating system,
            browser, and the time of the visit. The calculator values you type
            are not sent to analytics.
          </li>
          <li>
            <strong>Communications:</strong> if you email us, we receive the
            address you use and the contents of your message.
          </li>
        </ul>

        <h2 id="calculator">3. Calculator data</h2>
        <p>
          The conversion calculators run locally in your browser. Values typed
          into the calculator are not submitted to CMtoIN&apos;s servers by the
          calculator. Calculations are performed on your device, and the result
          is displayed in the page.
        </p>
        <p>
          Copying a result uses your browser&apos;s clipboard. The copied value
          stays on your device. CMtoIN does not store calculator inputs or
          results.
        </p>

        <h2 id="cookies">4. Cookies and similar technologies</h2>
        <p>
          A cookie is a small text file placed on your device by a website or a
          third-party service. The current configuration of CMtoIN does not
          intentionally set advertising cookies. Vercel Web Analytics is
          designed to operate without analytics cookies. Essential technical
          storage may still be used by the hosting platform or a security
          service to deliver the site reliably.
        </p>
        <p>
          If advertising or additional analytics services are added, those
          services may set cookies or use similar technologies. Visitors in
          regions that require consent should be shown an appropriate consent
          mechanism before non-essential cookies are set. This template must be
          updated to describe that mechanism and the categories of cookies in
          use.
        </p>

        <h2 id="analytics">5. Analytics</h2>
        <p>
          CMtoIN uses <strong>Vercel Web Analytics</strong> to understand which
          pages are useful, how visitors find the site, and whether technical
          problems affect particular devices or regions. Vercel Web Analytics is
          designed to provide aggregated measurement without using analytics
          cookies. Reported information can include page views, referring
          sources, approximate country, device category, browser, operating
          system, and visit timing.
        </p>
        <p>
          CMtoIN does not send calculator inputs, conversion results, or email
          content to Vercel Analytics. No custom analytics events are currently
          configured. Vercel processes analytics data under its own privacy
          terms; see{" "}
          <a
            href="https://vercel.com/docs/analytics"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vercel&apos;s analytics documentation
          </a>{" "}
          and{" "}
          <a
            href="https://vercel.com/legal/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vercel&apos;s privacy policy
          </a>
          . Where consent is required for analytics, the deployment should be
          configured to respect that requirement before data is collected.
        </p>

        <h2 id="advertising">6. Advertising</h2>
        <p>
          CMtoIN may display advertising to support hosting and maintenance. If
          Google AdSense or another advertising service is enabled, third-party
          vendors, including Google, may use cookies to serve ads based on prior
          visits to this or other websites.
        </p>
        <ul>
          <li>
            Google&apos;s use of advertising cookies allows it and its partners
            to serve ads based on visits to this site and other sites on the
            internet.
          </li>
          <li>
            You can learn about Google&apos;s advertising practices and manage
            personalized ads at{" "}
            <a
              href="https://adssettings.google.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Ads Settings
            </a>
            .
          </li>
          <li>
            You can opt out of many third-party vendors&apos; use of cookies for
            personalized advertising through{" "}
            <a
              href="https://www.aboutads.info/choices/"
              target="_blank"
              rel="noopener noreferrer"
            >
              aboutads.info
            </a>{" "}
            or the opt-out tools offered in your region.
          </li>
          <li>
            More information about how Google uses data is available in the{" "}
            <a
              href="https://policies.google.com/technologies/partner-sites"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google privacy and terms documentation
            </a>
            .
          </li>
        </ul>
        <p>
          The site&apos;s ad components are disabled by default. No advertising
          code or publisher ID is active in the current template. Advertising
          must not be configured in a way that obscures the calculator, mimics a
          site control, or encourages accidental clicks.
        </p>

        <h2 id="third-parties">7. Third-party services and links</h2>
        <p>
          The site may rely on third-party providers for hosting, content
          delivery, security, analytics, or advertising. Vercel provides the
          Web Analytics service used by this site. Those providers process
          information under their own privacy policies. The site may also link
          to external websites; CMtoIN is not responsible for their content or
          privacy practices. Review the privacy policy of any third-party site
          you visit.
        </p>

        <h2 id="use">8. How information is used</h2>
        <p>Information that is processed may be used to:</p>
        <ul>
          <li>Deliver and secure the website and its pages.</li>
          <li>Respond to emails and correction requests.</li>
          <li>Understand aggregate usage and improve content and tools.</li>
          <li>Measure and manage advertising, where advertising is enabled.</li>
          <li>Comply with applicable legal obligations.</li>
        </ul>
        <p>
          We do not sell personal information. We do not use calculator values
          for advertising or profiling.
        </p>

        <h2 id="retention">9. Data retention</h2>
        <p>
          Information should be retained only for as long as needed for the
          purpose described in this policy or as required by law. Email
          correspondence may be kept for as long as necessary to handle the
          request and maintain a record of corrections. Vercel Web Analytics
          data is retained according to Vercel&apos;s applicable retention
          settings. If the analytics provider changes, this section should be
          updated to describe the new retention period.
        </p>

        <h2 id="rights">10. Your privacy rights</h2>
        <p>
          Depending on where you live, you may have rights to access, correct,
          delete, or restrict the processing of personal information, to object
          to certain processing, or to withdraw consent. You may also have the
          right to lodge a complaint with a local supervisory authority.
        </p>
        <p>
          California residents may have additional rights under the CCPA/CPRA,
          including the right to know, delete, and correct personal information,
          and the right to opt out of the sale or sharing of personal
          information. CMtoIN does not sell personal information. Requests can
          be sent to{" "}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. Identity may need
          to be verified before a request is fulfilled.
        </p>
        <p>
          The site does not currently respond to browser &ldquo;Do Not
          Track&rdquo; signals because no common technical standard exists.
          This position should be reviewed if analytics or advertising is added.
        </p>

        <h2 id="children">11. Children&apos;s privacy</h2>
        <p>
          CMtoIN is a general-audience reference site and is not directed to
          children under 13. We do not knowingly collect personal information
          from children. If you believe a child has submitted personal
          information, contact{" "}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a> so it can be
          reviewed and removed as appropriate.
        </p>

        <h2 id="international">12. International visitors</h2>
        <p>
          CMtoIN may be accessed from many countries. If third-party providers
          process information in another country, their standard contractual and
          security measures apply. Before launch, this section should identify
          the relevant transfer mechanisms if personal data is transferred
          internationally.
        </p>

        <h2 id="changes">13. Changes to this policy</h2>
        <p>
          This policy may be updated to reflect changes in the site, its
          providers, or applicable law. The review date at the top of the page
          should be updated when changes are made. Material changes should be
          communicated in a reasonable way.
        </p>

        <h2 id="contact">14. Contact</h2>
        <p>
          Questions about this policy can be sent to{" "}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. Include
          &ldquo;Privacy&rdquo; in the subject line. The{" "}
          <Link href="/contact/">contact page</Link> has additional guidance.
        </p>
      </LegalBody>
    </PageLayout>
  );
}
