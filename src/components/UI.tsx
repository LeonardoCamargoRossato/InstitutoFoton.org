import { useEffect, useRef, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, X, RefreshCw } from 'lucide-react';
import { safeExternalUrl } from '../lib/config';

export function Action({ to, children, secondary = false }: { to: string; children: ReactNode; secondary?: boolean }) {
  return <Link className={`button ${secondary ? 'button-secondary' : ''}`} to={to}>{children}<ArrowUpRight size={19} aria-hidden="true" /></Link>;
}
export function TextLink({ to, children }: { to: string; children: ReactNode }) {
  return <Link className="text-link" to={to}>{children}<ArrowRight size={18} aria-hidden="true" /></Link>;
}
export function External({ href, children, className = '' }: { href: string | null | undefined; children: ReactNode; className?: string }) {
  const url = safeExternalUrl(href);
  return url ? <a className={className} href={url} target="_blank" rel="noopener noreferrer">{children}<ArrowUpRight size={16} aria-hidden="true" /><span className="sr-only"> (abre em nova aba)</span></a> : <span>{children}</span>;
}
export function Intro({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return <section className="page-intro"><div className="container"><p className="eyebrow"><span />{eyebrow}</p><h1>{title}</h1>{children && <div className="intro-copy">{children}</div>}</div></section>;
}
export function Heading({ eyebrow, title, children }: { eyebrow?: string; title: string; children?: ReactNode }) {
  return <div className="section-heading">{eyebrow && <p className="eyebrow"><span />{eyebrow}</p>}<h2>{title}</h2>{children && <p>{children}</p>}</div>;
}
export function Empty({ title, children }: { title: string; children: ReactNode }) {
  return <div className="empty-state"><span className="empty-symbol" aria-hidden="true"><ArrowUpRight size={32} strokeWidth={1.2} /></span><div><h2>{title}</h2><p>{children}</p></div></div>;
}
export function Status({ loading, error, retry }: { loading: boolean; error: string; retry: () => void }) {
  if (loading) return <p className="status" role="status">Carregando conteúdo…</p>;
  if (error) return <div className="notice" role="alert"><p>{error}</p><button className="text-link" onClick={retry}><RefreshCw size={16} />Tentar novamente</button></div>;
  return null;
}
export function Modal({ title, children, onClose }: { title: string; children: ReactNode; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const el = dialog.current;
    const trigger = document.activeElement as HTMLElement | null;
    el?.showModal();
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { el?.close(); document.body.style.overflow = original; trigger?.focus(); };
  }, []);
  return <dialog ref={dialog} className="modal" aria-labelledby="modal-title" onCancel={e => { e.preventDefault(); onClose(); }} onClick={e => { if (e.target === e.currentTarget) onClose(); }}><div className="modal-content"><div className="modal-top"><span className="eyebrow">Apoie a ciência</span><button autoFocus className="icon-button" onClick={onClose} aria-label="Fechar detalhes"><X /></button></div><h2 id="modal-title">{title}</h2>{children}</div></dialog>;
}
