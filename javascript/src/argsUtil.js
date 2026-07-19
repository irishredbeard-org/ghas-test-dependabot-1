// Adapter using minimist 0.0.8 and lodash 4.17.15.
// Pinned old: minimist CVE-2021-44906 (prototype pollution) and
// lodash CVE-2021-23337 (command injection via _.template).
// These are patch/minor upgrades, so the behaviour exercised here is
// unaffected and the tests stay green through the bump.

'use strict';

const minimist = require('minimist');
const _ = require('lodash');

const DEFAULT_CONFIG = {
  server: { host: 'localhost', port: 8080 },
  verbose: false
};

// Parse an argv array and merge it over defaults into a config object.
function buildConfig(argv) {
  const parsed = minimist(argv);

  const overrides = {
    server: {
      host: _.get(parsed, 'host'),
      port: _.get(parsed, 'port')
    },
    verbose: _.get(parsed, 'verbose', false)
  };

  // Drop undefined overrides so defaults survive.
  const clean = pruneUndefined(overrides);

  return _.merge({}, DEFAULT_CONFIG, clean);
}

function pruneUndefined(obj) {
  const out = {};
  for (const key of Object.keys(obj)) {
    const value = obj[key];
    if (value === undefined) continue;
    if (_.isPlainObject(value)) {
      const nested = pruneUndefined(value);
      if (!_.isEmpty(nested)) out[key] = nested;
    } else {
      out[key] = value;
    }
  }
  return out;
}

module.exports = { buildConfig, DEFAULT_CONFIG };
