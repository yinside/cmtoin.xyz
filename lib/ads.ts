/**
 * Advertising configuration.
 *
 * Ads are disabled by default and no publisher ID is included in the project.
 * To enable AdSense later:
 *
 *   1. Set NEXT_PUBLIC_ADSENSE_ENABLED=true
 *   2. Set NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX
 *   3. Set a slot ID for each placement you want to use
 *   4. Review your AdSense policy settings and consent requirements
 *
 * A slot is only rendered when advertising is enabled, a client ID is
 * present, and that placement has a slot ID. Empty placements render nothing,
 * so the layout stays clean and there is no blank reserved box.
 *
 * Keep ad density modest and never place an ad beside a calculator button in a
 * way that could confuse it with a control.
 */

export type AdPlacement =
  | "homeBelowHero"
  | "homeMidContent"
  | "converterBelowCalculator"
  | "converterInContent"
  | "chartBelowContent";

const env = process.env;

export const adsConfig = {
  enabled: env.NEXT_PUBLIC_ADSENSE_ENABLED === "true",
  clientId: env.NEXT_PUBLIC_ADSENSE_CLIENT_ID ?? "",
  slots: {
    homeBelowHero: env.NEXT_PUBLIC_ADSENSE_SLOT_HOME_BELOW_HERO ?? "",
    homeMidContent: env.NEXT_PUBLIC_ADSENSE_SLOT_HOME_MID_CONTENT ?? "",
    converterBelowCalculator:
      env.NEXT_PUBLIC_ADSENSE_SLOT_CONVERTER_BELOW_CALCULATOR ?? "",
    converterInContent:
      env.NEXT_PUBLIC_ADSENSE_SLOT_CONVERTER_IN_CONTENT ?? "",
    chartBelowContent: env.NEXT_PUBLIC_ADSENSE_SLOT_CHART_BELOW_CONTENT ?? "",
  } satisfies Record<AdPlacement, string>,
} as const;

export function getAdSlotId(placement: AdPlacement): string | null {
  const slot = adsConfig.slots[placement];
  if (!adsConfig.enabled || !adsConfig.clientId || !slot) {
    return null;
  }
  return slot;
}
