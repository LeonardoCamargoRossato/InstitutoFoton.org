import { useEffect, useState } from 'react';
import { NavLink, Link, Outlet, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, ArrowUp } from 'lucide-react';
import { siteOrigin, basePath } from '../lib/config';
import SiteImageViewer from '../components/SiteImageViewer';
import { assetUrl, imageAsset } from '../lib/siteAssets';
import { haQuantumTitle, journeyTitle, researchLines, researchTitle } from '../features/content';

const navigation = [
  ['/', 'Início'],
  ['/instituto', 'O Instituto'],
  ['/parceiros', 'Ecossistema de Parceiros'],
  ['/pesquisa', researchTitle],
  ['/manifesto', 'Manifesto'],
  ['/noticias', 'Notícias'],
  ['/transparencia', 'Transparência'],
];
const titles: Record<string, string> = {
  '/': 'Ciências e Tecnologias Quânticas',
  '/instituto': 'O Instituto',
  '/parceiros': 'Ecossistema de Parceiros',
  '/pesquisa': researchTitle,
  '/pesquisa/jornada': journeyTitle,
  '/pesquisa/haquantum': haQuantumTitle,
  ...Object.fromEntries(researchLines.map(({ slug, title }) => [`/pesquisa/${slug}`, title])),
  '/manifesto': 'Manifesto Quântico Nacional',
  '/noticias': 'Notícias e histórias',
  '/transparencia': 'Transparência',
  '/apoie': 'Apoie a ciência',
  '/contato': 'Contato',
  '/entrar': 'Acesso institucional',
  '/apresentacao': 'Apresentação institucional',
  '/privacidade': 'Privacidade',
  '/termos': 'Termos de uso',
};
export default function Layout() {
  const [menuAt, setMenuAt] = useState<string | null>(null);
  const location = useLocation();
  const menuOpen = menuAt === location.pathname;
  useEffect(() => {
    document.title = `${titles[location.pathname] || 'Instituto Foton'} — Instituto Foton`;
    document.querySelector('meta[name="robots"][data-dynamic]')?.remove();
    if (/^\/(admin|entrar|auth)(\/|$)/.test(location.pathname)) {
      const meta = document.createElement('meta');
      meta.name = 'robots';
      meta.content = 'noindex, nofollow';
      meta.dataset.dynamic = '';
      document.head.append(meta);
    }
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (siteOrigin) {
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.append(canonical);
      }
      canonical.href = `${siteOrigin.replace(/\/$/, '')}${basePath.replace(/\/$/, '')}${location.pathname}`;
    }
    if (location.hash) {
      requestAnimationFrame(() =>
        document.getElementById(location.hash.slice(1))?.scrollIntoView(),
      );
    } else window.scrollTo({ top: 0 });
  }, [location.pathname, location.hash]);
  useEffect(() => {
    // A página de parceiros deve renderizar a grade imediatamente, sem transição 3D.
    if (location.pathname === '/parceiros') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observed = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -7% 0px' },
    );
    const itemSelector = [
      '.info-card',
      '.research-card',
      '.odq-card',
      '.regional-letter',
      '.journey-steps > li',
      '.methodology > li',
      '.support-card',
      '.document-list article',
      '.gallery-track > button',
      '.value-keyword',
    ].join(',');
    const register = () => {
      const main = document.getElementById('conteudo');
      if (!main) return;
      const sections = main.querySelectorAll<HTMLElement>(
        ':scope > section, :scope > .institute-story > section, :scope > .values-strip, :scope > .anchor-bar, :scope > .support-cta',
      );
      sections.forEach((section, index) => {
        if (section.classList.contains('partner-ecosystem') || observed.has(section)) return;
        section.classList.add(
          'reveal-section',
          `reveal-${['rise', 'right', 'left', 'depth'][index % 4]}`,
        );
        observed.add(section);
        observer.observe(section);
      });
      main.querySelectorAll<HTMLElement>(itemSelector).forEach((item, index) => {
        if (observed.has(item)) return;
        item.classList.add('reveal-item');
        item.style.setProperty('--reveal-delay', `${120 + Math.min(index % 6, 5) * 90}ms`);
        observed.add(item);
        observer.observe(item);
      });
    };
    document.documentElement.classList.add('motion-enabled');
    const frame = requestAnimationFrame(register);
    const mutations = new MutationObserver(register);
    const main = document.getElementById('conteudo');
    if (main) mutations.observe(main, { childList: true, subtree: true });
    return () => {
      cancelAnimationFrame(frame);
      mutations.disconnect();
      observer.disconnect();
      document.documentElement.classList.remove('motion-enabled');
    };
  }, [location.pathname]);
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <header className="site-header">
        <div className="header-inner">
          <Link to="/" className="brand" aria-label="Instituto Foton — início">
            <img
              className="brand-logo"
              src={assetUrl(imageAsset('foton-logo-light').webpPath)}
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = assetUrl(imageAsset('foton-logo-light').pngPath);
              }}
              alt="Foton"
              width="329"
              height="146"
            />
            <span className="brand-signature">Tecnologia através da ciência.</span>
          </Link>
          <button
            className="icon-button menu-toggle"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
            aria-controls="main-nav"
            onClick={() => setMenuAt(menuOpen ? null : location.pathname)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
          <nav
            id="main-nav"
            aria-label="Navegação principal"
            className={menuOpen ? 'main-nav open' : 'main-nav'}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                setMenuAt(null);
                document.querySelector<HTMLButtonElement>('.menu-toggle')?.focus();
              }
            }}
          >
            {navigation.map(([path, label]) =>
              path === '/pesquisa' ? (
                <details
                  className="nav-dropdown"
                  key={path}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget))
                      event.currentTarget.open = false;
                  }}
                  onKeyDown={(event) => {
                    if (event.key === 'Escape') {
                      event.stopPropagation();
                      event.currentTarget.open = false;
                      event.currentTarget.querySelector('summary')?.focus();
                    }
                  }}
                >
                  <summary>PD e Cientista Inovador</summary>
                  <div
                    className="nav-dropdown-links"
                    onClick={(event) => {
                      if ((event.target as HTMLElement).closest('a'))
                        event.currentTarget.closest('details')?.removeAttribute('open');
                    }}
                  >
                    <Link to="/pesquisa#areas-de-pesquisa">Linhas temáticas de pesquisa</Link>
                    <Link to="/pesquisa/jornada">Jornadas do Cientista Inovador</Link>
                    <Link to="/pesquisa/haquantum">Hack Quantum</Link>
                  </div>
                </details>
              ) : (
                <NavLink
                  end={path === '/'}
                  key={path}
                  to={path}
                  className={path === '/pesquisa' ? 'nav-research' : undefined}
                >
                  {label}
                </NavLink>
              ),
            )}
            <NavLink to="/apoie" className="nav-support">
              Apoie a Ciência
              <ArrowUpRight size={16} aria-hidden="true" />
            </NavLink>
          </nav>
        </div>
      </header>
      <main id="conteudo" tabIndex={-1}>
        <Outlet />
      </main>
      <SiteImageViewer />
      <div className="ambient-particles" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
      <footer className="site-footer">
        <div className="container">
          <div className="footer-top">
            <div>
              <Link to="/" className="brand footer-brand">
                <img
                  className="brand-logo"
                  src={assetUrl(imageAsset('foton-logo').webpPath)}
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = assetUrl(imageAsset('foton-logo').pngPath);
                  }}
                  alt="Foton"
                  width="1920"
                  height="595"
                />
                <span className="brand-signature">Tecnologia através da ciência.</span>
              </Link>
              <p>
                Conhecimento que conecta.
                <br />
                Ciência que aproxima pessoas.
              </p>
            </div>
            <div>
              <h2>Explore</h2>
              <Link to="/instituto">O Instituto</Link>
              <Link to="/pesquisa">{researchTitle}</Link>
              <Link to="/parceiros">Ecossistema de Parceiros</Link>
              <Link to="/manifesto">Manifesto</Link>
            </div>
            <div>
              <h2>Participe</h2>
              <Link to="/apoie">Apoie a Ciência</Link>
              <Link to="/noticias">Notícias e histórias</Link>
              <Link to="/transparencia">Transparência</Link>
              <Link to="/contato">Contato</Link>
            </div>
            <div className="footer-statement">
              <p>
                O próximo capítulo da ciência
                <br />
                também pode ter você.
              </p>
              <Link
                className="footer-circle"
                to="/pesquisa/jornada"
                aria-label="Conheça a Jornada do Cientista Inovador"
              >
                <ArrowUpRight />
              </Link>
            </div>
          </div>
          <div className="footer-bottom">
            <span>Instituto Foton · Portal científico e social</span>
            <div>
              <Link to="/privacidade">Privacidade</Link>
              <Link to="/termos">Termos de uso</Link>
              <button
                aria-label="Voltar ao topo"
                className="icon-button"
                onClick={() =>
                  window.scrollTo({
                    top: 0,
                    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
                      ? 'instant'
                      : 'smooth',
                  })
                }
              >
                <ArrowUp size={18} />
              </button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
