import { Card } from '@/components/Card';
import { PannableImage } from '@/components/PannableImage';
import { maps } from '@/lib/content';

export function MapsPage() {
  return (
    <div className="space-y-6">
      <Card>
        <h1 className="font-display text-5xl text-wax">Maps</h1>
        <p className="mt-3 text-xl">Pinch and pan without zooming the entire page.</p>
      </Card>
      <div className="space-y-4">
        {maps.map((entry) => (
          <Card key={entry.slug} className="space-y-4">
            <div>
              <h2 className="font-display text-3xl">{entry.title}</h2>
              <p className="text-lg">{entry.summary}</p>
            </div>
            <PannableImage alt={entry.alt} src={entry.image} />
          </Card>
        ))}
      </div>
    </div>
  );
}
