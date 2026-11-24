import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { safeExternalUrl } from '../../lib/config';

type ActionProps = {
  to: string;
  children: ReactNode;
  secondary?: boolean;
  className?: string;
};

export function Action({ to, children, secondary = false, className = '' }: ActionProps) {
  const classes = ['button', secondary && 'button-secondary', className].filter(Boolean).join(' ');
  return (
    <Link className={classes} to={to}>
      {children}
      <ArrowUpRight size={19} aria-hidden="true" />
    </Link>
  );
}

export function TextLink({
  to,
  children,
  className = '',
}: {
  to: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link className={['text-link', className].filter(Boolean).join(' ')} to={to}>
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
    <span className={className}>{children}</span>
  );
}
