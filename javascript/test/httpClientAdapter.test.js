'use strict';

// Offline and deterministic: no network calls are made. We only exercise
// pure helpers and hand-built error objects.

const {
  buildQuery,
  normalizeError,
  axiosMajor
} = require('../src/httpClientAdapter');

describe('httpClientAdapter', () => {
  test('pins axios to the 0.x major line', () => {
    // Will fail once Dependabot bumps axios to 1.x.
    expect(axiosMajor()).toBe('0');
  });

  test('buildQuery serializes params deterministically', () => {
    const q = buildQuery({ b: 2, a: 'x y', skip: undefined, z: null });
    // Sorted keys, undefined/null dropped, values url-encoded.
    expect(q).toBe('a=x%20y&b=2');
  });

  test('buildQuery handles an empty object', () => {
    expect(buildQuery({})).toBe('');
  });

  test('normalizeError reads response and config from an axios error', () => {
    const err = {
      isAxiosError: true,
      message: 'Request failed with status code 404',
      response: { status: 404, data: { error: 'not found' } },
      config: { url: '/widgets', method: 'get' }
    };

    expect(normalizeError(err)).toEqual({
      isAxiosError: true,
      message: 'Request failed with status code 404',
      status: 404,
      data: { error: 'not found' },
      url: '/widgets',
      method: 'get'
    });
  });

  test('normalizeError handles a non-axios error', () => {
    const result = normalizeError(new Error('boom'));
    expect(result).toEqual({ isAxiosError: false, message: 'boom' });
  });
});
