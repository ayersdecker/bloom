import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CipherPuzzle } from '@/features/lectern/puzzles/CipherPuzzle';

const puzzle = {
  type: 'cipher' as const,
  id: 'rose-cipher',
  code: 'rose',
  title: 'Rose Cipher',
  plaintext: 'BLOOM',
  shift: 3,
  fragment: 'The roots remember'
};

describe('CipherPuzzle', () => {
  it('reveals its fragment when solved', async () => {
    const user = userEvent.setup();
    let solved = false;
    const { rerender } = render(<CipherPuzzle puzzle={puzzle} solved={false} onSolve={() => { solved = true; }} />);

    await user.type(screen.getByLabelText(/plaintext answer/i), 'bloom');
    await user.click(screen.getByRole('button', { name: /check cipher/i }));

    expect(solved).toBe(true);

    rerender(<CipherPuzzle puzzle={puzzle} solved onSolve={() => undefined} />);
    expect(screen.getByText(/fragment revealed/i)).toHaveTextContent('The roots remember');
  });
});
