"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

interface AdUnitProps {
  clientId: string;
  slotId: string;
  format?: string;
}

/**
 * The small client boundary used only when ads are configured. It asks the
 * AdSense script to fill the adjacent <ins> element.
 */
export function AdUnit({ clientId, slotId, format = "auto" }: AdUnitProps) {
  useEffect(() => {
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch {
      // The AdSense script may be blocked by a browser extension or network.
      // Failing quietly keeps the rest of the calculator fully usable.
    }
  }, []);

  return (
    <ins
      className="adsbygoogle block w-full"
      style={{ display: "block" }}
      data-ad-client={clientId}
      data-ad-slot={slotId}
      data-ad-format={format}
      data-full-width-responsive="true"
    />
  );
}
