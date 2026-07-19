// Dependabot fixture: node-fetch is pinned to 2.6.1 (CVE-2022-0235).
// The documented fix bumps to 3.x, which is ESM-only and breaks `require`.
// fetchMajor() pins the major so the upgrade is caught by the test suite.
import fetch from 'node-fetch';
import type { RequestInit } from 'node-fetch';

// Keep a reference so the CJS import is exercised without a network call.
export const fetchImpl = fetch;

export interface RequestConfig {
  url: string;
  method: string;
  headers: Record<string, string>;
  body?: string;
}

/**
 * Shape a request config object. Does NOT perform any network I/O.
 */
export function buildRequest(url: string, opts: RequestInit = {}): RequestConfig {
  const headers: Record<string, string> = {};
  if (opts.headers) {
    for (const [key, value] of Object.entries(opts.headers as Record<string, string>)) {
      headers[key] = value;
    }
  }
  const config: RequestConfig = {
    url,
    method: (opts.method ?? 'GET').toUpperCase(),
    headers,
  };
  if (typeof opts.body === 'string') {
    config.body = opts.body;
  }
  return config;
}

/**
 * Report the installed node-fetch major version.
 * Returns '2' on the pinned 2.6.1; would return '3' after the ESM-only bump.
 */
export function fetchMajor(): string {
  return require('node-fetch/package.json').version.split('.')[0];
}
