import { useMemo, useState } from 'react';
import { Card } from '@/components/Card';
import { getPuzzleByCode, puzzles } from '@/lib/content';
import { useLecternStore } from '@/store/useLecternStore';
import { CipherPuzzle } from './puzzles/CipherPuzzle';
import { LockPuzzle } from './puzzles/LockPuzzle';
import { StarPuzzle } from './puzzles/StarPuzzle';

export function LecternPage() {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('Enter a seal code to unlock a puzzle.');
  const unlockedPuzzleIds = useLecternStore((state) => state.unlockedPuzzleIds);
  const solvedPuzzleIds = useLecternStore((state) => state.solvedPuzzleIds);
  const unlockPuzzle = useLecternStore((state) => state.unlockPuzzle);
  const solvePuzzle = useLecternStore((state) => state.solvePuzzle);

  const finalLine = useMemo(
    () =>
      puzzles.every((puzzle) => solvedPuzzleIds.includes(puzzle.id))
        ? puzzles.map((puzzle) => puzzle.fragment).join(', ')
        : null,
    [solvedPuzzleIds]
  );

  return (
    <div className="space-y-6">
      <Card>
        <h1 className="font-display text-5xl text-wax">Lectern</h1>
        <p className="mt-3 text-xl">Unlock puzzles with the right code words, then solve each mechanism to light the wax seals.</p>
        <div className="mt-4 flex flex-wrap gap-2" aria-label="Puzzle progress">
          {puzzles.map((puzzle) => (
            <span
              key={puzzle.id}
              className={`wax-dot ${solvedPuzzleIds.includes(puzzle.id) ? 'wax-dot--active' : ''}`}
              aria-label={solvedPuzzleIds.includes(puzzle.id) ? `${puzzle.title} solved` : `${puzzle.title} unsolved`}
            />
          ))}
        </div>
      </Card>
      <Card className="space-y-4">
        <label className="block text-xl font-semibold" htmlFor="puzzle-code">
          Seal code
        </label>
        <div className="flex flex-col gap-3 md:flex-row">
          <input
            id="puzzle-code"
            value={code}
            onChange={(event) => setCode(event.target.value)}
            className="min-h-11 flex-1 rounded-2xl border border-brass/30 bg-parchment px-4 py-3 text-lg"
            placeholder="rose"
          />
          <button
            type="button"
            className="min-h-11 rounded-full bg-wax px-5 py-3 text-lg font-semibold text-paper"
            onClick={() => {
              const puzzle = getPuzzleByCode(code);
              if (!puzzle) {
                setMessage('That code stirred nothing in the lectern.');
                return;
              }

              unlockPuzzle(puzzle.id);
              setCode('');
              setMessage(`${puzzle.title} unlocked.`);
            }}
          >
            Unlock puzzle
          </button>
        </div>
        <p className="text-lg">{message}</p>
      </Card>
      <div className="space-y-4">
        {puzzles
          .filter((puzzle) => unlockedPuzzleIds.includes(puzzle.id))
          .map((puzzle) => {
            const solved = solvedPuzzleIds.includes(puzzle.id);
            if (puzzle.type === 'cipher') {
              return <CipherPuzzle key={puzzle.id} puzzle={puzzle} solved={solved} onSolve={() => solvePuzzle(puzzle.id)} />;
            }
            if (puzzle.type === 'lock') {
              return <LockPuzzle key={puzzle.id} puzzle={puzzle} solved={solved} onSolve={() => solvePuzzle(puzzle.id)} />;
            }
            return <StarPuzzle key={puzzle.id} puzzle={puzzle} solved={solved} onSolve={() => solvePuzzle(puzzle.id)} />;
          })}
      </div>
      {finalLine ? (
        <Card>
          <h2 className="font-display text-4xl text-verdigris">Final line assembled</h2>
          <p className="mt-3 text-2xl">{finalLine}</p>
        </Card>
      ) : null}
    </div>
  );
}
