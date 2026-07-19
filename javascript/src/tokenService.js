// Adapter around jsonwebtoken 8.5.1.
// Pinned old: CVE-2022-23529 (verify() can be tricked via a crafted secret).
// The documented major upgrade to jsonwebtoken 9.x tightens input handling:
// secrets/algorithms are validated more strictly and several defaults change,
// so callers must pass explicit algorithms on verify(). The tests pin the 8.x
// major so the upgrade surfaces in CI.

'use strict';

const jwt = require('jsonwebtoken');

// Sign a payload with HS256.
function sign(payload, secret) {
  return jwt.sign(payload, secret, { algorithm: 'HS256' });
}

// Verify and decode a token.
function verify(token, secret) {
  return jwt.verify(token, secret);
}

// Major version of the installed jsonwebtoken, e.g. '8' for 8.5.1.
function jwtMajor() {
  return require('jsonwebtoken/package.json').version.split('.')[0];
}

module.exports = { sign, verify, jwtMajor };
