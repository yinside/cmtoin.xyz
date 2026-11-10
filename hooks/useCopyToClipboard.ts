"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type CopyState = "idle" | "copied" | "error";

function fallbackCopy(text: string): boolean {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);

  try {
    textarea.select();
    return document.execCommand("copy");
  } catch {
    return false;
  } finally {
    document.body.removeChild(textarea);
  }
}

/**
 * Copy text with the async Clipboard API, falling back to a temporary
 * textarea on browsers where the modern API is unavailable.
 */
export function useCopyToClipboard(resetDelay = 2200) {
  const [copyState, setCopyState] = useState<CopyState>("idle");
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const reset = useCallback(() => {
    if (resetTimer.current) {
      clearTimeout(resetTimer.current);
      resetTimer.current = null;
    }
    setCopyState("idle");
  }, []);

  const copy = useCallback(
    async (text: string): Promise<boolean> => {
      if (!text) {
        return false;
      }

      let copied = false;

      if (navigator.clipboard && window.isSecureContext) {
        try {
          await navigator.clipboard.writeText(text);
          copied = true;
        } catch {
          copied = fallbackCopy(text);
        }
      } else {
        copied = fallbackCopy(text);
      }

      setCopyState(copied ? "copied" : "error");

      if (copied) {
        if (resetTimer.current) {
          clearTimeout(resetTimer.current);
        }
        resetTimer.current = setTimeout(() => setCopyState("idle"), resetDelay);
      }

      return copied;
    },
    [resetDelay],
  );

  useEffect(() => {
    return () => {
      if (resetTimer.current) {
        clearTimeout(resetTimer.current);
      }
    };
  }, []);

  return { copyState, copy, reset };
}
