import { useMemo, useState } from 'react';
import { Card } from '@/components/Card';
import { isLockSolved } from '@/lib/caesar';
import type { Puzzle } from '@/schemas/puzzle';

interface LockPuzzleProps {
  puzzle: Extract<Puzzle, { type: 'lock' }>;
  onSolve: () => void;
  solved: boolean;
}

export function LockPuzzle({ puzzle, onSolve, solved }: LockPuzzleProps) {
  const [values, setValues] = useState(() => puzzle.symbols.map(() => 0));
  const labels = useMemo(() => ['First', 'Second', 'Third', 'Fourth'], []);

  return (
    <Card className="space-y-4">
      <div>
        <h3 className="font-display text-3xl">{puzzle.title}</h3>
        <p className="text-lg">Arrange the symbols into the correct order.</p>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        {puzzle.symbols.map((symbol, index) => (
          <label key={`${symbol}-${index}`} className="space-y-2 text-lg font-semibold">
            <span>{labels[index] ?? `Position ${index + 1}`}</span>
            <select
              aria-label={`${labels[index] ?? `Position ${index + 1}`} symbol`}
              className="min-h-11 w-full rounded-2xl border border-brass/30 bg-parchment px-4 py-3"
              value={values[index]}
              onChange={(event) => {
                const next = [...values];
                next[index] = Number(event.target.value);
                setValues(next);
              }}
            >
              {puzzle.symbols.map((option, optionIndex) => (
                <option key={`${option}-${optionIndex}`} value={optionIndex}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        ))}
      </div>
      <button
        type="button"
        className="min-h-11 rounded-full bg-wax px-5 py-3 text-lg font-semibold text-paper"
        onClick={() => {
          if (isLockSolved(values, puzzle.target)) {
            onSolve();
          }
        }}
      >
        Check lock
      </button>
      {solved ? <p className="text-xl font-semibold text-verdigris">Fragment revealed: {puzzle.fragment}</p> : null}
    </Card>
  );
}
