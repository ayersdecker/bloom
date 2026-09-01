import { useState } from 'react';
import { Card } from '@/components/Card';
import { encodeCaesar, isCipherSolved } from '@/lib/caesar';
import type { Puzzle } from '@/schemas/puzzle';

interface CipherPuzzleProps {
  puzzle: Extract<Puzzle, { type: 'cipher' }>;
  onSolve: () => void;
  solved: boolean;
}

export function CipherPuzzle({ puzzle, onSolve, solved }: CipherPuzzleProps) {
  const [answer, setAnswer] = useState('');
  const encoded = encodeCaesar(puzzle.plaintext, puzzle.shift);

  return (
    <Card className="space-y-4">
      <div>
        <h3 className="font-display text-3xl">{puzzle.title}</h3>
        <p className="text-lg">Decode the inscription <strong>{encoded}</strong> by shifting each letter back {puzzle.shift} places.</p>
      </div>
      <label className="block text-lg font-semibold" htmlFor={puzzle.id}>
        Plaintext answer
      </label>
      <input
        id={puzzle.id}
        value={answer}
        onChange={(event) => setAnswer(event.target.value)}
        className="min-h-11 w-full rounded-2xl border border-brass/30 bg-parchment px-4 py-3 text-lg"
      />
      <button
        type="button"
        className="min-h-11 rounded-full bg-wax px-5 py-3 text-lg font-semibold text-paper"
        onClick={() => {
          if (isCipherSolved(answer, puzzle.plaintext)) {
            onSolve();
          }
        }}
      >
        Check cipher
      </button>
      {solved ? <p className="text-xl font-semibold text-verdigris">Fragment revealed: {puzzle.fragment}</p> : null}
    </Card>
  );
}
