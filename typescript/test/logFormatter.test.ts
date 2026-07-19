import { chalkMajor, format } from '../src/logFormatter';

describe('logFormatter', () => {
  it('pins chalk to the v4 major (breaks on the ESM-only 5.x bump)', () => {
    expect(chalkMajor()).toBe('4');
  });

  it('formats an error message containing the original text', () => {
    const out = format('error', 'boom');
    expect(typeof out).toBe('string');
    expect(out).toContain('boom');
  });

  it('formats a success message containing the original text', () => {
    const out = format('success', 'ok');
    expect(typeof out).toBe('string');
    expect(out).toContain('ok');
  });
});
