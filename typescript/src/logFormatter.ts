// Dependabot fixture: chalk is pinned to 4.1.2 (no CVE).
// chalk 5.x is ESM-only and breaks `require`; chalkMajor() pins the major
// so the non-security major upgrade is caught by the test suite.
import chalk from 'chalk';

export type LogLevel = 'error' | 'success';

/**
 * Colorize a log message by level. Returns a string containing the message.
 */
export function format(level: LogLevel, msg: string): string {
  switch (level) {
    case 'error':
      return chalk.red(msg);
    case 'success':
      return chalk.green(msg);
    default:
      return msg;
  }
}

/**
 * Report the installed chalk major version.
 * Returns '4' on the pinned 4.1.2; would return '5' after the ESM-only bump.
 */
export function chalkMajor(): string {
  return require('chalk/package.json').version.split('.')[0];
}
