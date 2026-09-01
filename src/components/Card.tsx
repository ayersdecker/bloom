import type { PropsWithChildren } from 'react';

interface CardProps extends PropsWithChildren {
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <section className={`rounded-3xl border border-ink/10 bg-paper/95 p-5 shadow-card ${className}`.trim()}>
      {children}
    </section>
  );
}
