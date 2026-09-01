const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function encodeCaesar(value: string, shift: number) {
  return value
    .toUpperCase()
    .split('')
    .map((char) => {
      const index = alphabet.indexOf(char);
      if (index === -1) {
        return char;
      }

      return alphabet[(index + shift + alphabet.length) % alphabet.length];
    })
    .join('');
}

export function decodeCaesar(value: string, shift: number) {
  return encodeCaesar(value, -shift);
}

export function normalizeAnswer(value: string) {
  return value.trim().toUpperCase();
}

export function isCipherSolved(answer: string, plaintext: string) {
  return normalizeAnswer(answer) === normalizeAnswer(plaintext);
}

export function isLockSolved(values: number[], target: number[]) {
  return values.length === target.length && values.every((value, index) => value === target[index]);
}

export function isDialSolved(value: number, target: number, tolerance: number) {
  const normalized = ((value % 360) + 360) % 360;
  const delta = Math.abs(normalized - target);
  return Math.min(delta, 360 - delta) <= tolerance;
}
