import { z } from 'zod';

export const CharacterSchema = z.object({
  slug: z.string(),
  name: z.string(),
  role: z.string(),
  summary: z.string(),
  bio: z.string(),
  portrait: z.string().optional(),
  tags: z.array(z.string()).default([])
});

export type Character = z.infer<typeof CharacterSchema>;
