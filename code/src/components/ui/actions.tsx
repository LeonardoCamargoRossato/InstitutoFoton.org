import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { safeExternalUrl } from '../../lib/config';

export function Action({
  to,
  children,
  secondary = false,
}: {
  to: string;
  children: ReactNode;
  secondary?: boolean;
}) {
  return (
    <Link className={`button ${secondary ? 'button-secondary' : ''}`} to={to}>
      {children}
      <ArrowUpRight size={19} aria-hidden="true" />
    </Link>
  );
}

export function TextLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link className="text-link" to={to}>
      {children}
      <ArrowRight size={18} aria-hidden="true" />
    </Link>
  );
}

export function External({
  href,
  children,
  className = '',
}: {
  href: string | null | undefined;
  children: ReactNode;
  className?: string;
}) {
  const url = safeExternalUrl(href);
  return url ? (
    <a className={className} href={url} target="_blank" rel="noopener noreferrer">
      {children}
      <ArrowUpRight size={16} aria-hidden="true" />
      <span className="sr-only"> (abre em nova aba)</span>
    </a>
  ) : (
    <span>{children}</span>
  );
}
