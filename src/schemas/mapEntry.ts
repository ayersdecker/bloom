import { z } from 'zod';

export const MapEntrySchema = z.object({
  slug: z.string(),
  title: z.string(),
  summary: z.string(),
  image: z.string(),
  alt: z.string()
});

export type MapEntry = z.infer<typeof MapEntrySchema>;
