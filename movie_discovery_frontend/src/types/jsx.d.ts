/**
 * Ensures JSX namespace exists for strict TypeScript configurations.
 * This is typically provided by @types/react, but this file is safe as a fallback.
 */
import type React from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

export {};
