import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

const root = new URL("../", import.meta.url);

/**
 * Resolve the project's "@/..." TypeScript path alias for Node's built-in
 * test runner, without adding a bundler or extra dependency.
 */
export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith("@/")) {
    const candidate = new URL(specifier.slice(2), root);
    if (existsSync(fileURLToPath(candidate))) {
      return nextResolve(candidate.href, context);
    }

    const withExtension = new URL(`${candidate.href}.ts`);
    if (existsSync(fileURLToPath(withExtension))) {
      return nextResolve(withExtension.href, context);
    }
  }

  return nextResolve(specifier, context);
}
