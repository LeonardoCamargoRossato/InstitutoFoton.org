import { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { LockKeyhole, LogOut, ArrowUpRight } from 'lucide-react';
import { supabase, backendError } from '../lib/backend';
import { basePath, safeReturnTo } from '../lib/config';
import { Intro, Action } from '../components/UI';

type AccessState = { state: 'loading' | 'signed-out' | 'unauthorized' | 'error' | 'authorized'; role?: 'director' | 'marketing'; email?: string };

export default function Access() {
  const location = useLocation();
  const navigate = useNavigate();
  const [access, setAccess] = useState<AccessState>({ state: supabase ? 'loading' : 'error' });
  const [message, setMessage] = useState(new URLSearchParams(location.search).has('error') ? 'O login não foi concluído. Você pode tentar novamente.' : '');
  const [busy, setBusy] = useState(false);
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    if (!supabase) return;
    const client = supabase;
    let active = true;
    let run = 0;
    async function refresh() {
      const id = ++run;
      // Hide private UI before revalidation, including expiration/revocation.
      if (active) setAccess({ state: 'loading' });
      try {
        const { data: { user }, error } = await client.auth.getUser();
        if (!active || id !== run) return;
        if (!user) {
          if (error && error.name !== 'AuthSessionMissingError') setMessage('Não foi possível validar a sessão. Entre novamente.');
          setAccess({ state: 'signed-out' }); return;
        }
        const { data, error: membershipError } = await client.from('site_memberships').select('role,status').eq('user_id', user.id).eq('status', 'active').maybeSingle();
        if (!active || id !== run) return;
        if (membershipError) { setAccess({ state: 'error' }); setMessage('Não foi possível verificar sua autorização institucional.'); return; }
        if (!data || !['director', 'marketing'].includes(data.role)) { setAccess({ state: 'unauthorized' }); return; }
        setAccess({ state: 'authorized', role: data.role, email: user.email });
      } catch { if (active && id === run) { setAccess({ state: 'error' }); setMessage('Não foi possível verificar sua sessão.'); } }
    }
    void refresh();
    const { data: subscription } = client.auth.onAuthStateChange(() => { queueMicrotask(() => { if (active) void refresh(); }); });
    const timer = setInterval(() => { if (document.visibilityState === 'visible') void refresh(); }, 60000);
    const onFocus = () => { void refresh(); };
    window.addEventListener('focus', onFocus);
    return () => { active = false; ++run; subscription.subscription.unsubscribe(); clearInterval(timer); window.removeEventListener('focus', onFocus); };
  }, [retry]);
  useEffect(() => {
    if (access.state === 'authorized' && (location.pathname === '/entrar' || location.pathname === '/auth/callback')) {
      navigate(safeReturnTo(new URLSearchParams(location.search).get('returnTo')), { replace: true });
    }
  }, [access.state, location.pathname, location.search, navigate]);
  async function login() {
    if (!supabase) return;
    setBusy(true); setMessage('');
    const redirect = new URL(`${basePath}auth/callback`, window.location.origin);
    redirect.searchParams.set('returnTo', safeReturnTo(location.pathname.startsWith('/admin') ? location.pathname : new URLSearchParams(location.search).get('returnTo')));
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: redirect.href } });
      if (error) { setMessage('Não foi possível iniciar o login com Google. Tente novamente.'); setBusy(false); }
    } catch { setMessage('Não foi possível conectar ao serviço de login.'); setBusy(false); }
  }
  async function logout() {
    if (!supabase) return;
    setAccess({ state: 'loading' });
    const { error } = await supabase.auth.signOut();
    if (error) { setAccess({ state: 'error' }); setMessage('Não foi possível encerrar a sessão. Tente novamente.'); return; }
    setAccess({ state: 'signed-out' }); navigate('/entrar', { replace: true });
  }
  const wrongRole = (location.pathname === '/admin/diretoria' && access.role !== 'director') || (location.pathname.startsWith('/admin/') && !['/admin/marketing', '/admin/diretoria'].includes(location.pathname));
  const authorized = access.state === 'authorized' && !wrongRole;
  return <><Intro eyebrow="Área institucional" title={authorized ? 'Conectados pelo mesmo propósito.' : 'Acesso institucional'}><p>Espaço reservado às equipes de Marketing e Diretoria do Instituto Foton.</p></Intro><section className="section"><div className="container access-shell"><div className="access-card"><LockKeyhole size={34} strokeWidth={1.3} aria-hidden="true" />{access.state === 'loading' ? <p role="status">Verificando acesso institucional…</p> : authorized ? <><span className="badge">{access.role === 'director' ? 'Diretoria' : 'Marketing'}</span><h2>Bem-vindo ao espaço institucional.</h2><p>{access.email}</p><p>Seu acesso foi validado pelo serviço de autenticação e pela autorização institucional.</p><div className="admin-links">{access.role === 'director' && <Link to="/admin/diretoria">Diretoria<ArrowUpRight size={18} /></Link>}<Link to="/admin/marketing">Marketing<ArrowUpRight size={18} /></Link></div><div className="notice"><h3>{location.pathname === '/admin/diretoria' ? 'Gestão institucional em preparação' : 'Área editorial em preparação'}</h3><p>As funcionalidades de edição, aprovação e gestão de documentos fazem parte da próxima etapa. Nenhum dado é salvo por esta tela.</p></div><button className="text-link" onClick={logout}><LogOut size={18} />Sair da conta</button></> : access.state === 'unauthorized' || (access.state === 'authorized' && wrongRole) ? <><h2>Acesso restrito.</h2><p>Sua conta não tem autorização para acessar esta área. Autenticar com Google não concede um papel institucional.</p><Action to="/">Voltar ao site público</Action><button className="text-link" onClick={logout}><LogOut size={18} />Sair da conta</button></> : access.state === 'error' ? <><h2>Acesso temporariamente indisponível.</h2><p role="alert">{backendError || message || 'Não foi possível verificar o acesso. Tente novamente mais tarde.'}</p>{supabase && <button className="button" onClick={() => setRetry(n => n + 1)}>Tentar novamente</button>}<Action to="/" secondary>Voltar ao site</Action></> : <><h2>Entre com sua conta institucional.</h2><p>O acesso exige uma autorização prévia do Instituto. Sua senha Google não é compartilhada com este site.</p><button className="button google-button" disabled={busy} onClick={login}>{busy ? 'Conectando…' : 'Continuar com Google'}<ArrowUpRight size={18} aria-hidden="true" /></button>{message && <p role="alert">{message}</p>}<Link to="/privacidade" className="text-link">Privacidade e acesso</Link></>}</div></div></section></>;
}
