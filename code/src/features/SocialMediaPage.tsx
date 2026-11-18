import { Camera, Linkedin, Youtube } from 'lucide-react';
import InstagramHighlight from './InstagramHighlight';
import LinkedInHighlight from './LinkedInHighlight';
import './SocialMediaPage.css';

export default function SocialMediaPage() {
  return (
    <div className="social-media-page">
      <section className="social-intro">
        <div className="container social-intro-inner">
          <p className="eyebrow"><span />Conexões que aproximam</p>
          <h1>Acompanhe o Foton nas redes sociais</h1>
          <div className="social-intro-copy">
            <p>A ciência também acontece nos encontros, nas conversas e nas conexões que construímos todos os dias.</p>
            <p>Acompanhe o Instituto Foton nas redes sociais e fique por dentro das nossas iniciativas, pesquisas, eventos e oportunidades de participação.</p>
          </div>
          <nav className="social-quick-links" aria-label="Redes nesta página">
            <a className="social-quick-link--instagram" href="#social-instagram-title"><Camera size={21} aria-hidden="true" />Instagram</a>
            <a className="social-quick-link--linkedin" href="#social-linkedin-title"><Linkedin size={21} aria-hidden="true" />LinkedIn</a>
            <a className="social-quick-link--youtube" href="#social-youtube-title"><Youtube size={22} aria-hidden="true" />YouTube</a>
          </nav>
        </div>
      </section>
      <div className="container social-network-list">
        <InstagramHighlight />
        <section className="social-network social-network--linkedin" aria-labelledby="social-linkedin-title">
          <LinkedInHighlight />
        </section>
        <section className="social-network social-network--youtube" aria-labelledby="social-youtube-title">
          <div className="social-youtube-section">
            <span className="social-youtube-icon" aria-hidden="true"><Youtube size={44} /></span>
            <div>
              <p className="social-network-kicker">YouTube • Canal institucional</p>
              <h2 id="social-youtube-title">Instituto Foton no YouTube</h2>
              <p>Em breve, vídeos sobre pesquisas, encontros, eventos e iniciativas do Instituto Foton.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
