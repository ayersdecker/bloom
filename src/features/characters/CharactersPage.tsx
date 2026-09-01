import { Link } from 'react-router-dom';
import { Card } from '@/components/Card';
import { characters } from '@/lib/content';

export function CharactersPage() {
  return (
    <div className="space-y-6">
      <Card>
        <h1 className="font-display text-5xl text-wax">Characters</h1>
        <p className="mt-3 text-xl">Every portrait and summary is sourced from JSON content, so new entries do not require component changes.</p>
      </Card>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {characters.map((character) => (
          <Card key={character.slug} className="flex flex-col gap-4">
            {character.portrait ? (
              <img src={character.portrait} alt={`Portrait of ${character.name}`} className="aspect-[4/5] rounded-2xl object-cover" />
            ) : null}
            <div className="space-y-2">
              <h2 className="font-display text-3xl">{character.name}</h2>
              <p className="text-lg italic">{character.role}</p>
              <p className="text-lg">{character.summary}</p>
            </div>
            <div className="mt-auto flex flex-wrap gap-2">
              {character.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-parchment px-3 py-1 text-base">
                  {tag}
                </span>
              ))}
            </div>
            <Link to={`/characters/${character.slug}`} className="min-h-11 rounded-full bg-wax px-5 py-3 text-center text-lg font-semibold text-paper">
              Open dossier
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
