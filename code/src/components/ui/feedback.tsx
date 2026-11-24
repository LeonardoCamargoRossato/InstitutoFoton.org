import type { ReactNode } from 'react';
import { ArrowUpRight, RefreshCw } from 'lucide-react';

export function Empty({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="empty-state" role="status">
      <span className="empty-symbol" aria-hidden="true">
        <ArrowUpRight size={32} strokeWidth={1.2} />
      </span>
      <div>
        <h2>{title}</h2>
        <p>{children}</p>
      </div>
    </div>
  );
}

export function Status({
  loading,
  error,
  retry,
}: {
  loading: boolean;
  error: string;
  retry: () => void;
}) {
  if (loading)
    return (
      <p className="status" role="status" aria-live="polite">
        Carregando conteúdo…
      </p>
    );
  if (error)
    return (
      <div className="notice" role="alert">
        <p>{error}</p>
        <button type="button" className="text-link" onClick={retry}>
          <RefreshCw size={16} aria-hidden="true" />
          Tentar novamente
        </button>
      </div>
    );
  return null;
}
