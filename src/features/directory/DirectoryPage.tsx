import { Link } from 'react-router-dom';
import { Card } from '@/components/Card';
import { characters, maps, puzzles } from '@/lib/content';
import { useLecternStore } from '@/store/useLecternStore';

export function DirectoryPage() {
  const solvedPuzzleIds = useLecternStore((state) => state.solvedPuzzleIds);
  const reset = useLecternStore((state) => state.reset);

  return (
    <div className="space-y-6">
      <Card>
        <h1 className="font-display text-5xl text-wax">The Bloom Lectern</h1>
        <p className="mt-3 text-xl">
          A table-ready companion for lore, portraits, maps, and the three seals guarding the final line.
        </p>
      </Card>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <h2 className="font-display text-3xl">Directory</h2>
          <p className="mt-2 text-lg">{characters.length} characters documented.</p>
        </Card>
        <Card>
          <h2 className="font-display text-3xl">Maps</h2>
          <p className="mt-2 text-lg">{maps.length} map ready for pinch-to-zoom reading.</p>
        </Card>
        <Card>
          <h2 className="font-display text-3xl">Lectern</h2>
          <p className="mt-2 text-lg">
            {solvedPuzzleIds.length} of {puzzles.length} wax seals broken.
          </p>
        </Card>
      </div>
      <Card className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-display text-3xl">Begin the session</h2>
          <p className="text-lg">Step into the archive, then move between tabs as players reveal more of the Bloom line.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to="/lectern" className="min-h-11 rounded-full bg-wax px-5 py-3 text-lg font-semibold text-paper">
            Open lectern
          </Link>
          <button
            type="button"
            className="min-h-11 rounded-full border border-wax/30 px-5 py-3 text-lg font-semibold"
            onClick={() => {
              if (window.confirm('Reset all unlocked and solved puzzle progress?')) {
                reset();
              }
            }}
          >
            Reset progress
          </button>
        </div>
      </Card>
    </div>
  );
}
