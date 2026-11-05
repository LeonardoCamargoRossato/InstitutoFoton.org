import { createClient } from '@supabase/supabase-js';
import { validateBackend, safeExternalUrl } from './config';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const backendError = validateBackend(url, key);
export const supabase = backendError ? null : createClient(url!, key!, {
  auth: { flowType: 'pkce', detectSessionInUrl: true, persistSession: true, autoRefreshToken: true },
});

export type Publication = {
  id: string; slug: string; type: string; title: string; summary: string;
  body: string; category: string; author_display_name: string | null;
  source_name: string | null; source_url: string | null;
  main_image_path: string | null; published_at: string | null; updated_at: string;
};
export type PublicDocument = {
  id: string; title: string; category: string; description: string;
  storage_bucket: string; storage_path: string; version_label: string;
  document_date: string | null; allow_page_export: boolean;
};

export async function publications(page = 0, search = '', category = 'Todas', sort = 'recent') {
  if (!supabase) return { items: [] as Publication[], more: false, configured: false };
  const size = 24;
  let query = supabase.from('site_publications')
    .select('id,slug,type,title,summary,body,category,author_display_name,source_name,source_url,main_image_path,published_at,updated_at')
    .eq('status', 'published').eq('locale', 'pt-BR');
  if (search.trim()) query = query.textSearch('search_document', search.slice(0, 160), { type: 'websearch', config: 'portuguese' });
  if (category !== 'Todas') query = ['blog', 'press', 'news'].includes(category) ? query.eq('type', category) : query.eq('category', category);
  const { data, error } = await query.order('published_at', { ascending: sort === 'oldest' }).order('id').range(page * size, (page + 1) * size);
  if (error) throw new Error('Não foi possível carregar as publicações. Tente novamente.');
  return { items: (data || []).slice(0, size) as Publication[], more: (data?.length || 0) > size, configured: true };
}

export async function officialStatements() {
  if (!supabase) return [] as { key: string; title: string; content: string; source_reference: string }[];
  const { data, error } = await supabase.from('site_content_blocks').select('key,title,content,source_reference')
    .in('key', ['institute.mission', 'institute.vision', 'institute.purpose', 'institute.values'])
    .eq('status', 'published').eq('locale', 'pt-BR');
  if (error) throw new Error('Não foi possível carregar os textos institucionais.');
  return data || [];
}

export async function publication(slug: string) {
  if (!supabase || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return null;
  const { data, error } = await supabase.from('site_publications').select('*')
    .eq('slug', slug).eq('status', 'published').eq('locale', 'pt-BR').maybeSingle();
  if (error) throw new Error('Não foi possível carregar esta publicação.');
  return data as Publication | null;
}

export async function documents(category?: string) {
  if (!supabase) return [] as PublicDocument[];
  let query = supabase.from('site_documents')
    .select('id,title,category,description,storage_bucket,storage_path,version_label,document_date,allow_page_export')
    .eq('status', 'published').eq('is_public', true).order('document_date', { ascending: false });
  if (category) query = query.eq('category', category);
  const { data, error } = await query;
  if (error) throw new Error('Não foi possível carregar os documentos. Tente novamente.');
  return data as PublicDocument[];
}

export function documentUrl(doc: PublicDocument) {
  if (!supabase || doc.storage_bucket !== 'foton-public-documents') return undefined;
  if (!doc.storage_path.endsWith('.pdf') || doc.storage_path.split('/').some(p => p === '..')) return undefined;
  return safeExternalUrl(supabase.storage.from(doc.storage_bucket).getPublicUrl(doc.storage_path).data.publicUrl);
}
