import { CharacterSchema } from '@/schemas/character';

describe('character schema', () => {
  it('rejects malformed character entries', () => {
    expect(() => CharacterSchema.parse({ slug: 'bad-entry', name: 'Broken' })).toThrow();
  });
});
