import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
}

export function Accordion({ items }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const isOpen = item.id === openId;
        return (
          <section key={item.id} className="overflow-hidden rounded-3xl border border-brass/30 bg-paper">
            <button
              type="button"
              className="flex min-h-11 w-full items-center justify-between gap-4 px-5 py-4 text-left text-xl font-semibold"
              aria-expanded={isOpen}
              onClick={() => setOpenId(isOpen ? null : item.id)}
            >
              <span>{item.title}</span>
              <ChevronDown className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen ? <div className="border-t border-brass/20 px-5 py-4 text-lg">{item.content}</div> : null}
          </section>
        );
      })}
    </div>
  );
}
