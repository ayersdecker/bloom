import { decodeCaesar, encodeCaesar, isDialSolved, isLockSolved } from '@/lib/caesar';

describe('caesar helpers', () => {
  it('round-trips encoded text', () => {
    expect(decodeCaesar(encodeCaesar('Bloom', 3), 3)).toBe('BLOOM');
  });

  it('checks lock ordering exactly', () => {
    expect(isLockSolved([0, 2, 1], [0, 2, 1])).toBe(true);
    expect(isLockSolved([0, 1, 2], [0, 2, 1])).toBe(false);
  });

  it('accepts dial values within tolerance across wraparound', () => {
    expect(isDialSolved(350, 0, 15)).toBe(true);
    expect(isDialSolved(180, 0, 15)).toBe(false);
  });
});
