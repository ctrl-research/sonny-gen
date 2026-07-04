import type { ReactNode } from 'react';

/** Consistent titled section used throughout the sidebar. */
export function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="panel">
      <h2 className="panel__title">{title}</h2>
      <div className="panel__body">{children}</div>
    </section>
  );
}
