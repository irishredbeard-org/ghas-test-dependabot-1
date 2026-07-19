'use strict';

const { buildConfig } = require('../src/argsUtil');

describe('argsUtil', () => {
  test('returns defaults when no args are given', () => {
    expect(buildConfig([])).toEqual({
      server: { host: 'localhost', port: 8080 },
      verbose: false
    });
  });

  test('merges overrides from parsed args', () => {
    const config = buildConfig(['--host', 'example.com', '--port', '9090']);
    expect(config).toEqual({
      server: { host: 'example.com', port: 9090 },
      verbose: false
    });
  });

  test('partial overrides keep the remaining defaults', () => {
    const config = buildConfig(['--verbose']);
    expect(config).toEqual({
      server: { host: 'localhost', port: 8080 },
      verbose: true
    });
  });
});
