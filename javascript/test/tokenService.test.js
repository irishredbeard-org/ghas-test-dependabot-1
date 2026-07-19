'use strict';

const { sign, verify } = require('../src/tokenService');

describe('tokenService', () => {
  test('sign + verify round-trips with a string secret', () => {
    // Green on both jsonwebtoken 8.x and 9.x.
    const token = sign({ id: 1, role: 'admin' }, 'super-secret');
    expect(typeof token).toBe('string');

    const decoded = verify(token, 'super-secret');
    expect(decoded).toMatchObject({ id: 1, role: 'admin' });
  });

  test('verify rejects a token signed with a different secret', () => {
    const token = sign({ id: 2 }, 'secret-a');
    expect(() => verify(token, 'secret-b')).toThrow();
  });

  test('signWithNumericSecret coerces a numeric secret on 8.x', () => {
    // On 8.5.1 a numeric secret is coerced and signing succeeds.
    // On 9.x jsonwebtoken rejects non-string/Buffer secrets and this throws,
    // breaking the test to flag the major upgrade.
    const token = sign({ id: 1 }, 12345);
    expect(typeof token).toBe('string');
  });
});
