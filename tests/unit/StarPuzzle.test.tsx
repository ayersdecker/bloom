import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { StarPuzzle } from '@/features/lectern/puzzles/StarPuzzle';

const puzzle = {
  type: 'dial' as const,
  id: 'star-dial',
  code: 'star',
  title: 'Star Dial',
  targetDegrees: 90,
  toleranceDegrees: 15,
  fragment: 'and the bloom returns.'
};

describe('StarPuzzle', () => {
  it('reveals its fragment when the dial is aligned', async () => {
    const user = userEvent.setup();
    let solved = false;
    const { rerender } = render(<StarPuzzle puzzle={puzzle} solved={false} onSolve={() => { solved = true; }} />);

    for (let index = 0; index < 6; index += 1) {
      await user.click(screen.getByRole('button', { name: /turn star dial clockwise/i }));
    }

    await user.click(screen.getByRole('button', { name: /align dial/i }));
    expect(solved).toBe(true);

    rerender(<StarPuzzle puzzle={puzzle} solved onSolve={() => undefined} />);
    expect(screen.getByText(/fragment revealed/i)).toHaveTextContent('and the bloom returns.');
  });
});
