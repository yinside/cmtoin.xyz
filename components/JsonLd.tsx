import type { JsonLdObject } from "@/lib/schema";

interface JsonLdProps {
  data: JsonLdObject | JsonLdObject[];
}

/**
 * Render schema.org JSON-LD. Angle brackets are escaped to avoid prematurely
 * closing the script tag when content contains user-visible code examples.
 */
export function JsonLd({ data }: JsonLdProps) {
  const payload = Array.isArray(data)
    ? { "@context": "https://schema.org", "@graph": data }
    : { "@context": "https://schema.org", ...data };

  const json = JSON.stringify(payload).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
