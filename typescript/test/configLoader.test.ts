import { parse } from '../src/configLoader';

describe('configLoader', () => {
  it('parses JSON5 with comments and trailing commas', () => {
    const text = `{
      // service configuration
      name: 'demo',
      retries: 3,
      enabled: true,
      tags: ['a', 'b',], /* trailing comma */
    }`;
    const result = parse<{
      name: string;
      retries: number;
      enabled: boolean;
      tags: string[];
    }>(text);
    expect(result).toEqual({
      name: 'demo',
      retries: 3,
      enabled: true,
      tags: ['a', 'b'],
    });
  });
});
