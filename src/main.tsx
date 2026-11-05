import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '@fontsource/raleway/latin-400.css';
import '@fontsource/raleway/latin-500.css';
import '@fontsource/raleway/latin-600.css';
import '@fontsource/raleway/latin-700.css';
import './styles/site.css';
import Layout from './app/Layout';
import {
  Home,
  Institute,
  Research,
  Journey,
  Manifesto,
  Contact,
  Legal,
  NotFound,
} from './features/PublicPages';
import Support from './features/Support';
const News = lazy(() => import('./features/Publications').then((m) => ({ default: m.News })));
const Article = lazy(() => import('./features/Publications').then((m) => ({ default: m.Article })));
import { Transparency, Presentation } from './features/Documents';
const Access = lazy(() => import('./features/Access'));

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Suspense
        fallback={
          <p className="container status" role="status">
            Carregando a página…
          </p>
        }
      >
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="instituto" element={<Institute />} />
            <Route path="pesquisa" element={<Research />} />
            <Route path="pesquisa/:slug" element={<Research />} />
            <Route path="jornada" element={<Journey />} />
            <Route path="manifesto" element={<Manifesto />} />
            <Route path="apoie" element={<Support />} />
            <Route path="noticias" element={<News />} />
            <Route path="noticias/:slug" element={<Article />} />
            <Route path="transparencia" element={<Transparency />} />
            <Route path="apresentacao" element={<Presentation />} />
            <Route path="contato" element={<Contact />} />
            <Route path="entrar" element={<Access />} />
            <Route path="auth/callback" element={<Access />} />
            <Route path="admin/*" element={<Access />} />
            <Route path="privacidade" element={<Legal />} />
            <Route path="termos" element={<Legal terms />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>,
);
