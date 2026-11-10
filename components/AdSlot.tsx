import Script from "next/script";
import { AdUnit } from "@/components/AdUnit";
import { adsConfig, getAdSlotId, type AdPlacement } from "@/lib/ads";

interface AdSlotProps {
  placement: AdPlacement;
  className?: string;
  format?: string;
}

/**
 * AdSense-ready slot. Renders nothing until ads are enabled and the placement
 * has both a client ID and a slot ID. There are no fake ad previews.
 */
export function AdSlot({
  placement,
  className = "",
  format = "auto",
}: AdSlotProps) {
  const slotId = getAdSlotId(placement);

  if (!slotId) {
    return null;
  }

  return (
    <aside
      aria-label="Advertisement"
      className={`mx-auto w-full max-w-4xl ${className}`}
    >
      <p className="mb-1.5 text-center text-[0.65rem] font-medium uppercase tracking-[0.16em] text-slate-500">
        Advertisement
      </p>
      <div className="min-h-[90px] overflow-hidden">
        <AdUnit
          clientId={adsConfig.clientId}
          slotId={slotId}
          format={format}
        />
      </div>
    </aside>
  );
}

/**
 * Loads the AdSense library once in the root layout, and only when a client ID
 * has been configured. No publisher ID ships with this project.
 */
export function AdSenseScript() {
  if (!adsConfig.enabled || !adsConfig.clientId) {
    return null;
  }

  return (
    <Script
      id="adsense-script"
      async
      strategy="afterInteractive"
      crossOrigin="anonymous"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsConfig.clientId}`}
    />
  );
}
