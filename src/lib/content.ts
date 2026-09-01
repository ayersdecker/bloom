import type { ComponentType } from 'react';
import charactersJson from '@/content/characters.json';
import mapsJson from '@/content/maps.json';
import puzzlesJson from '@/content/puzzles.json';
import { CharacterSchema, type Character } from '@/schemas/character';
import { MapEntrySchema, type MapEntry } from '@/schemas/mapEntry';
import { PuzzleSchema, type Puzzle } from '@/schemas/puzzle';

export const characters = CharacterSchema.array().parse(charactersJson);
export const maps = MapEntrySchema.array().parse(mapsJson);
export const puzzles = PuzzleSchema.array().parse(puzzlesJson);

const backstoryModules = import.meta.glob<{ default: ComponentType }>('../content/backstory/*.mdx', {
  eager: true
});

export interface BackstoryEntry {
  id: string;
  title: string;
  order: number;
  Component: ComponentType;
}

function titleFromFilename(fileName: string) {
  return fileName
    .replace(/^\d+-/, '')
    .replace(/\.mdx$/, '')
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export const backstoryEntries: BackstoryEntry[] = Object.entries(backstoryModules)
  .map(([path, module]) => {
    const segments = path.split('/');
    const fileName = segments[segments.length - 1] ?? '';
    const [rawOrder = '999'] = fileName.split('-');
    return {
      id: fileName.replace(/\.mdx$/, ''),
      title: titleFromFilename(fileName),
      order: Number(rawOrder),
      Component: module.default
    };
  })
  .sort((left, right) => left.order - right.order);

export function findCharacter(slug: string): Character | undefined {
  return characters.find((character) => character.slug === slug);
}

export function findPuzzle(id: string): Puzzle | undefined {
  return puzzles.find((puzzle) => puzzle.id === id);
}

export function getPuzzleByCode(code: string): Puzzle | undefined {
  const normalized = code.trim().toLowerCase();
  return puzzles.find((puzzle) => puzzle.code.toLowerCase() === normalized);
}

export function getSolvedFragments(solvedIds: string[]) {
  return puzzles
    .filter((puzzle) => solvedIds.includes(puzzle.id))
    .map((puzzle) => puzzle.fragment);
}

export type ContentCollections = {
  characters: Character[];
  maps: MapEntry[];
  puzzles: Puzzle[];
};
