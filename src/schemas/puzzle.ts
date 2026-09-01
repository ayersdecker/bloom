import { z } from 'zod';

export const PuzzleSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('cipher'),
    id: z.string(),
    code: z.string(),
    title: z.string(),
    plaintext: z.string(),
    shift: z.number(),
    fragment: z.string()
  }),
  z.object({
    type: z.literal('lock'),
    id: z.string(),
    code: z.string(),
    title: z.string(),
    symbols: z.array(z.string()),
    target: z.array(z.number()),
    fragment: z.string()
  }),
  z.object({
    type: z.literal('dial'),
    id: z.string(),
    code: z.string(),
    title: z.string(),
    targetDegrees: z.number(),
    toleranceDegrees: z.number(),
    fragment: z.string()
  })
]);

export type Puzzle = z.infer<typeof PuzzleSchema>;
