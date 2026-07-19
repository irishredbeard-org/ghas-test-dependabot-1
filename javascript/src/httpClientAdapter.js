// Adapter around axios 0.21.0.
// Pinned old: CVE-2023-45857 (SSRF / credential leak on cross-origin redirect).
// The documented major upgrade to axios 1.x refactors AxiosError / AxiosHeaders
// and changes the paramsSerializer contract (function-style serializer is
// replaced by an object with a `serialize` method), so this adapter and its
// tests are written to pin the 0.x behaviour.

'use strict';

const axios = require('axios');

// Function-style paramsSerializer, the axios 0.x contract. In axios 1.x this
// signature is replaced by an object with a `serialize` method.
function serializeParams(params) {
  return Object.keys(params)
    .filter((key) => params[key] !== undefined && params[key] !== null)
    .sort()
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');
}

// A single configured instance, as a real client would use.
const instance = axios.create({
  baseURL: 'https://api.example.test',
  timeout: 1000,
  paramsSerializer: serializeParams
});

// Build a query string from a params object using the instance's configured
// 0.x function-style paramsSerializer.
function buildQuery(params) {
  return instance.defaults.paramsSerializer(params);
}

// Normalize an axios-style error into a plain, stable shape by reading the
// 0.x `err.response` / `err.config` fields and using axios.isAxiosError.
function normalizeError(err) {
  if (!axios.isAxiosError(err)) {
    return {
      isAxiosError: false,
      message: err && err.message ? err.message : String(err)
    };
  }

  return {
    isAxiosError: true,
    message: err.message,
    status: err.response ? err.response.status : null,
    data: err.response ? err.response.data : null,
    url: err.config ? err.config.url : null,
    method: err.config ? err.config.method : null
  };
}

// Major version of the installed axios, e.g. '0' for 0.21.0.
function axiosMajor() {
  return require('axios/package.json').version.split('.')[0];
}

module.exports = { instance, buildQuery, normalizeError, axiosMajor };
