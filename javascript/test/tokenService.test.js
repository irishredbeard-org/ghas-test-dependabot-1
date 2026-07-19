'use strict';

const { sign, verify, jwtMajor } = require('../src/tokenService');

describe('tokenService', () => {
  test('pins jsonwebtoken to the 8.x major line', () => {
    // Will fail once Dependabot bumps jsonwebtoken to 9.x, flagging the
    // stricter secret/algorithm handling that needs review.
    expect(jwtMajor()).toBe('8');
  });

  test('sign + verify round-trips with a string secret', () => {
    const token = sign({ id: 1, role: 'admin' }, 'super-secret');
    expect(typeof token).toBe('string');

    const decoded = verify(token, 'super-secret');
    expect(decoded).toMatchObject({ id: 1, role: 'admin' });
  });

  test('verify rejects a token signed with a different secret', () => {
    const token = sign({ id: 2 }, 'secret-a');
    expect(() => verify(token, 'secret-b')).toThrow();
  });
});
