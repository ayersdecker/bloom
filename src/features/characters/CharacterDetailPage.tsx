import { Navigate, useParams } from 'react-router-dom';
import { Card } from '@/components/Card';
import { findCharacter } from '@/lib/content';

export function CharacterDetailPage() {
  const { slug = '' } = useParams();
  const character = findCharacter(slug);

  if (!character) {
    return <Navigate to="/characters" replace />;
  }

  return (
    <Card className="space-y-6">
      {character.portrait ? (
        <img src={character.portrait} alt={`Portrait of ${character.name}`} className="mx-auto aspect-[4/5] max-w-md rounded-3xl object-cover" />
      ) : null}
      <div className="space-y-3">
        <p className="text-lg uppercase tracking-[0.2em] text-verdigris">{character.role}</p>
        <h1 className="font-display text-5xl text-wax">{character.name}</h1>
        <p className="text-2xl">{character.summary}</p>
        <p className="text-xl leading-relaxed">{character.bio}</p>
      </div>
    </Card>
  );
}
