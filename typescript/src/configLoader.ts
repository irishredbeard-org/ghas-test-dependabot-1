// Dependabot fixture: json5 is pinned to 2.2.0 (CVE-2022-46175).
// The fix is a patch bump to 2.2.2 with no API change, so behavior tests
// stay green across the upgrade (the "easy" case).
import JSON5 from 'json5';

/**
 * Parse a JSON5 document (comments, trailing commas, etc.) into an object.
 */
export function parse<T = unknown>(text: string): T {
  return JSON5.parse(text) as T;
}
