import { useCallback, useEffect, useState } from 'react';

export function useResource<T>(loader: () => Promise<T>) {
  const [result, setResult] = useState<{ loader: () => Promise<T>; attempt: number; data?: T; error: string }>();
  const [attempt, setAttempt] = useState(0);
  const retry = useCallback(() => setAttempt(n => n + 1), []);
  useEffect(() => {
    let active = true;
    loader().then(data => { if (active) setResult({ loader, attempt, data, error: '' }); })
      .catch(e => { if (active) setResult({ loader, attempt, error: e instanceof Error ? e.message : 'Não foi possível carregar este conteúdo.' }); });
    return () => { active = false; };
  }, [loader, attempt]);
  const current = result?.loader === loader && result.attempt === attempt;
  return { data: current ? result.data : undefined, error: current ? result.error : '', loading: !current, retry };
}
