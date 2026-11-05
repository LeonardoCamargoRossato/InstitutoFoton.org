import { useEffect, useState } from 'react';
import { NavLink, Link, Outlet, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, ArrowUp } from 'lucide-react';
import { siteOrigin, basePath } from '../lib/config';

const navigation = [['/', 'Início'], ['/instituto', 'O Instituto'], ['/pesquisa', 'Pesquisa'], ['/jornada', 'Jornada do Cientista'], ['/manifesto', 'Manifesto'], ['/noticias', 'Notícias'], ['/transparencia', 'Transparência']];
const titles: Record<string, string> = { '/': 'Ciência feita de pessoas', '/instituto': 'O Instituto', '/pesquisa': 'Pesquisa em rede', '/jornada': 'Jornada do Cientista', '/manifesto': 'Manifesto Quântico Nacional', '/noticias': 'Notícias e histórias', '/transparencia': 'Transparência', '/apoie': 'Apoie a ciência', '/contato': 'Contato', '/entrar': 'Acesso institucional', '/apresentacao': 'Apresentação institucional', '/privacidade': 'Privacidade', '/termos': 'Termos de uso' };
export default function Layout() {
  const [menuAt, setMenuAt] = useState<string | null>(null);
  const location = useLocation();
  const menuOpen = menuAt === location.pathname;
  useEffect(() => {
    document.title = `${titles[location.pathname] || 'Instituto Foton'} — Instituto Foton`;
    document.querySelector('meta[name="robots"][data-dynamic]')?.remove();
    if (/^\/(admin|entrar|auth)(\/|$)/.test(location.pathname)) {
      const meta = document.createElement('meta'); meta.name = 'robots'; meta.content = 'noindex, nofollow'; meta.dataset.dynamic = ''; document.head.append(meta);
    }
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (siteOrigin) {
      if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.append(canonical); }
      canonical.href = `${siteOrigin.replace(/\/$/, '')}${basePath.replace(/\/$/, '')}${location.pathname}`;
    }
    if (location.hash) { requestAnimationFrame(() => document.getElementById(location.hash.slice(1))?.scrollIntoView()); }
    else window.scrollTo({ top: 0 });
  }, [location.pathname, location.hash]);
  return <><a className="skip-link" href="#conteudo">Pular para o conteúdo</a><header className="site-header"><div className="header-inner">
    <Link to="/" className="brand" aria-label="Instituto Foton — início"><img className="brand-logo" src={`${basePath}foton-logo-light.png`} alt="Foton" width="329" height="146" /><span className="brand-signature">Tecnologia através da ciência.</span></Link>
    <button className="icon-button menu-toggle" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen} aria-controls="main-nav" onClick={() => setMenuAt(menuOpen ? null : location.pathname)}>{menuOpen ? <X /> : <Menu />}</button>
    <nav id="main-nav" aria-label="Navegação principal" className={menuOpen ? 'main-nav open' : 'main-nav'} onKeyDown={e => { if (e.key === 'Escape') { setMenuAt(null); document.querySelector<HTMLButtonElement>('.menu-toggle')?.focus(); } }}>
      {navigation.map(([path, label]) => <NavLink end={path === '/'} key={path} to={path}>{label}</NavLink>)}
      <NavLink to="/apoie" className="nav-support">Apoie a Ciência<ArrowUpRight size={16} aria-hidden="true" /></NavLink>
    </nav></div></header>
    <main id="conteudo" tabIndex={-1}><Outlet /></main>
    <footer className="site-footer"><div className="container"><div className="footer-top"><div><Link to="/" className="brand footer-brand"><img className="brand-logo" src={`${basePath}foton-logo.png`} alt="Foton" width="1920" height="595" /><span className="brand-signature">Tecnologia através da ciência.</span></Link><p>Conhecimento que conecta.<br />Ciência que aproxima pessoas.</p></div><div><h2>Explore</h2><Link to="/instituto">O Instituto</Link><Link to="/pesquisa">Pesquisa</Link><Link to="/jornada">Jornada do Cientista</Link><Link to="/manifesto">Manifesto</Link></div><div><h2>Participe</h2><Link to="/apoie">Apoie a Ciência</Link><Link to="/noticias">Notícias e histórias</Link><Link to="/transparencia">Transparência</Link><Link to="/contato">Contato</Link></div><div className="footer-statement"><p>O próximo capítulo da ciência<br />também pode ter você.</p><Link className="footer-circle" to="/jornada" aria-label="Conheça a Jornada do Cientista"><ArrowUpRight /></Link></div></div><div className="footer-bottom"><span>Instituto Foton · Portal científico e social</span><div><Link to="/privacidade">Privacidade</Link><Link to="/termos">Termos de uso</Link><Link to="/entrar">Entrar</Link><button aria-label="Voltar ao topo" className="icon-button" onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })}><ArrowUp size={18} /></button></div></div></div></footer>
  </>;
}
