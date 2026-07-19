// Adapter around jsonwebtoken 8.5.1.
// Pinned old: CVE-2022-23529 (verify() can be tricked via a crafted secret).
// The documented major upgrade to jsonwebtoken 9.x tightens input handling:
// non-string / non-Buffer secrets are rejected and lax algorithm handling is
// removed. sign() with a numeric secret succeeds on 8.x but throws on 9.x.

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

module.exports = { sign, verify };
