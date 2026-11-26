import { useEffect, useState } from 'react';
import { NavLink, Link, Outlet, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, ArrowUp } from 'lucide-react';
import { siteOrigin, basePath } from '../lib/config';
import { SiteImageViewer } from '../components/viewers';
import { assetUrl, imageAsset } from '../lib/siteAssets';
import {
  haQuantumTitle,
  haQuantumTitleEnglish,
  journeyTitle,
  journeyTitleEnglish,
  researchLines,
  researchLinesEnglish,
  researchLinesSpanish,
  researchTitle,
  researchTitleEnglish,
} from '../features/content';
import { useLanguage } from '../i18n';
import { localizedCopy } from '../i18n/localizedCopy';
import { LanguageSelector } from '../components/ui/LanguageSelector';

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
  '/redes-sociais': 'Acompanhe o Foton nas redes sociais',
  '/apoie': 'Apoie a ciência',
  '/contato': 'Contato',
  '/entrar': 'Acesso institucional',
  '/apresentacao': 'Apresentação institucional',
  '/privacidade': 'Privacidade',
  '/termos': 'Termos de uso',
};

const englishTitles: Record<string, string> = {
  '/': 'Quantum Sciences and Technologies',
  '/instituto': 'The Institute',
  '/parceiros': 'Partner Ecosystem',
  '/pesquisa': researchTitleEnglish,
  '/pesquisa/jornada': journeyTitleEnglish,
  '/pesquisa/haquantum': haQuantumTitleEnglish,
  ...Object.fromEntries(
    researchLinesEnglish.map(({ slug, title }) => ['/pesquisa/' + slug, title]),
  ),
  '/manifesto': 'National Quantum Manifesto',
  '/noticias': 'News and stories',
  '/redes-sociais': 'Follow Foton on social media',
  '/apoie': 'Support science',
  '/contato': 'Contact',
  '/entrar': 'Institutional access',
  '/apresentacao': 'Institutional presentation',
  '/privacidade': 'Privacy',
  '/termos': 'Terms of use',
};

const spanishTitles: Record<string, string> = {
  ...Object.fromEntries(
    Object.entries(titles).map(([path, title]) => [path, localizedCopy('es-ES')(title, title)]),
  ),
  ...Object.fromEntries(
    researchLinesSpanish.map(({ slug, title }) => ['/pesquisa/' + slug, title]),
  ),
};

const englishDescriptions: Record<string, string> = {
  '/': 'Quantum science, people, and possibilities. Discover Instituto Foton, its research areas, and ways to support science.',
  '/instituto':
    'Discover the people, purpose, and scientific coordination teams that build Instituto Foton.',
  '/parceiros':
    'Explore the institutions and companies in the ecosystem presented by Instituto Foton.',
  '/pesquisa':
    'Research areas and pathways connecting quantum science, education, and collaboration.',
  '/pesquisa/jornada':
    'Discover the Innovative Scientist Journey and its pathways for scientific development.',
  '/pesquisa/haquantum':
    'Explore HaQuantum, a hackathon focused on quantum technologies and collaboration.',
  '/manifesto': 'Explore the National Quantum Manifesto and its regional commitments.',
  '/noticias':
    'Explore news, stories, research, events, and institutional updates from Instituto Foton.',
  '/redes-sociais': 'Follow Instituto Foton on Instagram, LinkedIn, and YouTube.',
  '/apoie': 'Learn how to support science and Instituto Foton initiatives.',
  '/contato': 'Find official channels to contact Instituto Foton.',
  '/entrar': 'Access institutional areas of Instituto Foton.',
  '/apresentacao': 'Explore Instituto Foton’s institutional presentation.',
  '/privacidade': 'Read Instituto Foton’s privacy information.',
  '/termos': 'Read the terms for using the Instituto Foton portal.',
};

export default function Layout() {
  const [menuAt, setMenuAt] = useState<string | null>(null);
  const location = useLocation();
  const menuOpen = menuAt === location.pathname;
  const { locale, t } = useLanguage();
  const isEnglish = locale === 'en-US';
  const copy = localizedCopy(locale);
  const navigation = [
    ['/', copy('Início', 'Home')],
    ['/instituto', t.common.institute],
    ['/parceiros', t.common.partners],
    ['/pesquisa', t.common.research],
    ['/manifesto', t.common.manifesto],
    ['/noticias', t.common.news],
  ] as const;
  useEffect(() => {
    const localizedTitles = locale === 'es-ES' ? spanishTitles : isEnglish ? englishTitles : titles;
    const pageTitle = localizedTitles[location.pathname] || 'Instituto Foton';
    document.title = pageTitle + ' — Instituto Foton';
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description)
      description.content =
        locale === 'es-ES'
          ? 'Ciencia, personas y posibilidades. Conoce el Instituto Foton, sus áreas de investigación y formas de apoyar la ciencia.'
          : isEnglish
            ? englishDescriptions[location.pathname] || englishDescriptions['/']
            : location.pathname === '/redes-sociais'
              ? 'Acompanhe o Instituto Foton no Instagram e no LinkedIn. Conheça publicações oficiais sobre ciência, pesquisa, inovação e eventos.'
              : 'Ciência, pessoas e possibilidades. Conheça o Instituto Foton, suas áreas de pesquisa e caminhos para apoiar a ciência brasileira.';
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
  }, [location.pathname, location.hash, isEnglish, locale]);
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
        if (
          section.classList.contains('partner-ecosystem') ||
          section.classList.contains('institute-team-section') ||
          observed.has(section)
        )
          return;
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
        {t.accessibility.skipToContent}
      </a>
      <header className="site-header">
        <div className="header-inner">
          <Link to="/" className="brand" aria-label={t.accessibility.home}>
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
            <span className="brand-signature">{t.common.technologySignature}</span>
          </Link>
          <LanguageSelector />
          <button
            className="icon-button menu-toggle"
            aria-label={menuOpen ? t.accessibility.closeMenu : t.accessibility.openMenu}
            aria-expanded={menuOpen}
            aria-controls="main-nav"
            onClick={() => setMenuAt(menuOpen ? null : location.pathname)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
          <nav
            id="main-nav"
            aria-label={t.accessibility.mainNavigation}
            className={menuOpen ? 'main-nav open' : 'main-nav'}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                setMenuAt(null);
                document.querySelector<HTMLButtonElement>('.menu-toggle')?.focus();
              }
            }}
          >
            {navigation.map(([path, label]) =>
              path === '/instituto' || path === '/pesquisa' || path === '/noticias' ? (
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
                  <summary>
                    {path === '/instituto'
                      ? t.common.institute
                      : path === '/pesquisa'
                        ? t.common.research
                        : t.common.news}
                  </summary>
                  <div
                    className="nav-dropdown-links"
                    onClick={(event) => {
                      if ((event.target as HTMLElement).closest('a'))
                        event.currentTarget.closest('details')?.removeAttribute('open');
                    }}
                  >
                    {path === '/instituto' ? (
                      <>
                        <Link to="/instituto">{t.common.learnInstitute}</Link>
                        <Link to="/instituto#equipe">{t.common.team}</Link>
                      </>
                    ) : path === '/pesquisa' ? (
                      <>
                        <Link to="/pesquisa#areas-de-pesquisa">{t.common.researchLines}</Link>
                        <Link to="/pesquisa/jornada">{t.common.journeyShort}</Link>
                        <Link to="/pesquisa/haquantum">HaQuantum</Link>
                      </>
                    ) : (
                      <>
                        <Link to="/noticias">{t.common.news}</Link>
                        <Link to="/redes-sociais">{t.common.social}</Link>
                      </>
                    )}
                  </div>
                </details>
              ) : (
                <NavLink end={path === '/'} key={path} to={path}>
                  {label}
                </NavLink>
              ),
            )}
            <NavLink to="/apoie" className="nav-support">
              {t.common.support}
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
                <span className="brand-signature">{t.common.technologySignature}</span>
              </Link>
              <p>
                {t.common.connectedKnowledge}
                <br />
                {t.common.peopleScience}
              </p>
            </div>
            <div>
              <h2>{t.common.explore}</h2>
              <Link to="/instituto">{t.common.institute}</Link>
              <Link to="/pesquisa">{copy(researchTitle, researchTitleEnglish)}</Link>
              <Link to="/parceiros">{t.common.partners}</Link>
              <Link to="/manifesto">Manifesto</Link>
            </div>
            <div>
              <h2>{t.common.participate}</h2>
              <Link to="/apoie">{t.common.support}</Link>
              <Link to="/noticias">{t.common.newsStories}</Link>
              <Link to="/redes-sociais">{t.common.social}</Link>
              <Link to="/contato">{t.common.contact}</Link>
            </div>
            <div className="footer-statement">
              <p>
                {t.common.nextChapter}
                <br />
                {t.common.youToo}
              </p>
              <Link
                className="footer-circle"
                to="/pesquisa/jornada"
                aria-label={t.accessibility.journey}
              >
                <ArrowUpRight />
              </Link>
            </div>
          </div>
          <div className="footer-bottom">
            <span>Instituto Foton · {t.common.portal}</span>
            <div>
              <Link to="/privacidade">{t.common.privacy}</Link>
              <Link to="/termos">{t.common.terms}</Link>
              <button
                aria-label={t.accessibility.backToTop}
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
