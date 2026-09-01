import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface LecternState {
  unlockedPuzzleIds: string[];
  solvedPuzzleIds: string[];
  unlockPuzzle: (id: string) => void;
  solvePuzzle: (id: string) => void;
  reset: () => void;
}

export const useLecternStore = create<LecternState>()(
  persist(
    (set) => ({
      unlockedPuzzleIds: [],
      solvedPuzzleIds: [],
      unlockPuzzle: (id) =>
        set((state) => ({
          unlockedPuzzleIds: state.unlockedPuzzleIds.includes(id)
            ? state.unlockedPuzzleIds
            : [...state.unlockedPuzzleIds, id]
        })),
      solvePuzzle: (id) =>
        set((state) => ({
          unlockedPuzzleIds: state.unlockedPuzzleIds.includes(id)
            ? state.unlockedPuzzleIds
            : [...state.unlockedPuzzleIds, id],
          solvedPuzzleIds: state.solvedPuzzleIds.includes(id) ? state.solvedPuzzleIds : [...state.solvedPuzzleIds, id]
        })),
      reset: () => ({ unlockedPuzzleIds: [], solvedPuzzleIds: [] })
    }),
    {
      name: 'bloom-lectern',
      storage: createJSONStorage(() => localStorage)
    }
  )
);
