import { Accordion } from '@/components/Accordion';
import { Card } from '@/components/Card';
import { backstoryEntries } from '@/lib/content';

export function BackstoryPage() {
  return (
    <div className="space-y-6">
      <Card>
        <h1 className="font-display text-5xl text-wax">Backstory</h1>
        <p className="mt-3 text-xl">Long-form lore is authored in MDX and discovered automatically by filename order.</p>
      </Card>
      <Accordion
        items={backstoryEntries.map((entry) => ({
          id: entry.id,
          title: entry.title,
          content: <entry.Component />
        }))}
      />
    </div>
  );
}
