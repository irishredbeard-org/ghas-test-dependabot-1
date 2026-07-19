import { buildRequest, fetchMajor } from '../src/fetchClient';

describe('fetchClient', () => {
  it('pins node-fetch to the v2 major (breaks on the ESM-only 3.x bump)', () => {
    expect(fetchMajor()).toBe('2');
  });

  it('builds a default GET request config', () => {
    const config = buildRequest('https://example.com/api');
    expect(config).toEqual({
      url: 'https://example.com/api',
      method: 'GET',
      headers: {},
    });
  });

  it('shapes method, headers, and body', () => {
    const config = buildRequest('https://example.com/api', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: '{"a":1}',
    });
    expect(config.method).toBe('POST');
    expect(config.headers).toEqual({ 'Content-Type': 'application/json' });
    expect(config.body).toBe('{"a":1}');
  });
});
