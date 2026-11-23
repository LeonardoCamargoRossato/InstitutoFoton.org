import type { ReactNode } from 'react';

export function Intro({
  eyebrow,
  title,
  children,
  id,
  sectionCode,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
  id?: string;
  sectionCode?: string;
}) {
  return (
    <section className="page-intro" id={id} data-lcr-section-id={sectionCode}>
      <div className="container">
        <p className="eyebrow">
          <span />
          {eyebrow}
        </p>
        <h1>{title}</h1>
        {children && <div className="intro-copy">{children}</div>}
      </div>
    </section>
  );
}

export function Heading({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="section-heading">
      {eyebrow && (
        <p className="eyebrow">
          <span />
          {eyebrow}
        </p>
      )}
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  );
}
