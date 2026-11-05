import { writeFile } from 'node:fs/promises';
import { researchLines, supportModalities } from '../src/features/content.ts';
import { odqs, cartas, methodology } from '../src/features/manifesto-content.ts';
const quote = value => `'${String(value).replaceAll("'", "''")}'`;
let sql = '-- Seed .org idempotente. Não sobrescreve alterações institucionais posteriores.\nbegin;\n';
sql += `insert into public.site_content_blocks(key,title,content,source_reference,status,published_at) values\n`;
const blocks = [
  ['manifesto.odqs','Objetivos de Desenvolvimento Quântico',JSON.stringify(odqs),'src_semAssets.zip/pages/Manifesto.tsx — transcrição literal'],
  ['manifesto.cartas','Cartas Macrorregionais',JSON.stringify(cartas),'src_semAssets.zip/pages/Manifesto.tsx — relatos preservados; não confirma agendas atuais'],
  ['manifesto.methodology','Metodologia',JSON.stringify(methodology),'src_semAssets.zip/pages/Manifesto.tsx — repetição de título preservada'],
  ['institute.values','Valores','Excelência\nProtagonismo\nInovação\nEstratégia\nValorização de talentos\nÉtica\nColaboração','Manual de Marca Foton 2026, página 9 — nomes literais'],
];
sql += blocks.map(row=>`(${row.map(quote).join(',')},'published',now())`).join(',\n')+'\non conflict(key) do nothing;\n';
sql += 'insert into public.site_research_lines(slug,title,summary,description,status,display_order,source_reference) values\n';
sql += researchLines.map((line,i)=>`(${[line.slug,line.title,line.summary,line.description].map(quote).join(',')},'published',${i+1},'Prompt Mestre V0 §6 — descrições educativas adaptadas; não representam capacidades ou projetos ativos')`).join(',\n')+'\non conflict(slug) do nothing;\n';
sql += 'insert into public.site_support_modalities(slug,title,summary,description,purpose,transparency_text,operational_status,public_status,display_order) values\n';
sql += supportModalities.map((item,i)=>`(${[item.slug,item.title,item.summary,item.use+' '+item.condition,item.purpose,item.evidence].map(quote).join(',')},'informational','published',${i+1})`).join(',\n')+'\non conflict(slug) do nothing;\n';
sql += `insert into public.site_metrics(metric_key,display_label,value_text,period_label,source_reference,as_of_date,status,description,display_order) values
('states-2026','Estados','15','Apresentação de setembro de 2026','Apresentação Institucional Foton 2026 09 10.pdf, página 4','2026-09-10','published','Registro documental, não indicador em tempo real',1),
('members-2026','Membros','140+','Apresentação de setembro de 2026','Apresentação Institucional Foton 2026 09 10.pdf, página 4','2026-09-10','published','Registro documental, não indicador em tempo real',2)
on conflict(metric_key) do nothing;\ncommit;\n`;
// PDF: sem metadados remotos até upload verificado e aprovação do objeto no Storage.
// Missão/visão: ausentes deliberadamente; texto comercial diverge e não é fonte literal aprovada.
await writeFile('supabase/seed/public-content.sql',sql);
console.log('Seed gerado: conteúdo referenciado, sem usuários, documentos privados ou publicações inventadas.');
