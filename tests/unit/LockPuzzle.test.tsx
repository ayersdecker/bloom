import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LockPuzzle } from '@/features/lectern/puzzles/LockPuzzle';

const puzzle = {
  type: 'lock' as const,
  id: 'sigil-lock',
  code: 'sigil',
  title: 'Sigil Lock',
  symbols: ['Sun', 'Rose', 'Moon'],
  target: [0, 2, 1],
  fragment: 'the petals endure'
};

describe('LockPuzzle', () => {
  it('reveals its fragment when the correct order is chosen', async () => {
    const user = userEvent.setup();
    let solved = false;
    const { rerender } = render(<LockPuzzle puzzle={puzzle} solved={false} onSolve={() => { solved = true; }} />);

    await user.selectOptions(screen.getByLabelText(/second symbol/i), '2');
    await user.selectOptions(screen.getByLabelText(/third symbol/i), '1');
    await user.click(screen.getByRole('button', { name: /check lock/i }));

    expect(solved).toBe(true);

    rerender(<LockPuzzle puzzle={puzzle} solved onSolve={() => undefined} />);
    expect(screen.getByText(/fragment revealed/i)).toHaveTextContent('the petals endure');
  });
});
