import { useState } from 'react';
import { Card } from '@/components/Card';
import { Dial } from '@/components/Dial';
import { isDialSolved } from '@/lib/caesar';
import type { Puzzle } from '@/schemas/puzzle';

interface StarPuzzleProps {
  puzzle: Extract<Puzzle, { type: 'dial' }>;
  onSolve: () => void;
  solved: boolean;
}

export function StarPuzzle({ puzzle, onSolve, solved }: StarPuzzleProps) {
  const [value, setValue] = useState(0);

  return (
    <Card className="space-y-4">
      <div>
        <h3 className="font-display text-3xl">{puzzle.title}</h3>
        <p className="text-lg">Turn the star to face due east.</p>
      </div>
      <Dial label="Star dial" value={value} onChange={setValue} />
      <button
        type="button"
        className="min-h-11 rounded-full bg-wax px-5 py-3 text-lg font-semibold text-paper"
        onClick={() => {
          if (isDialSolved(value, puzzle.targetDegrees, puzzle.toleranceDegrees)) {
            onSolve();
          }
        }}
      >
        Align dial
      </button>
      {solved ? <p className="text-xl font-semibold text-verdigris">Fragment revealed: {puzzle.fragment}</p> : null}
    </Card>
  );
}
