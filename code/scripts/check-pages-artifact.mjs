import { readFile, readdir, stat } from 'node:fs/promises';
import { join, resolve, extname } from 'node:path';

const dist=resolve('dist');
const inventory=JSON.parse(await readFile('assets/asset-inventory.json','utf8'));
if(inventory.count!==49||inventory.items.length!==49)throw Error('Inventário dos 49 pares ausente');
const expected=new Set(inventory.items.flatMap(i=>[i.pngPath,i.webpPath]));
const partnerSnapshot=JSON.parse(await readFile('src/content/partners.json','utf8'));
for(const partner of partnerSnapshot){
  if(partner.status!=='publicado'||partner.locale!=='pt-br')
    throw Error('Parceiro não publicado na seleção pública: '+partner.id);
  if(partner.logo_slug){
    if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(partner.logo_slug))
      throw Error('Slug de logo inválido: '+partner.id);
    expected.add('assets/PNG/parceiros/'+partner.logo_slug+'.png');
    expected.add('assets/WebP/parceiros/'+partner.logo_slug+'.webp');
  }
}

if(expected.size!==98+new Set(partnerSnapshot.filter(p=>p.logo_slug).map(p=>p.logo_slug)).size*2)throw Error('Arquivos de imagem ausentes ou duplicados');
const routeDirectories=new Set(['instituto','pesquisa','parceiros','jornada','manifesto','noticias','apresentacao',
'transparencia','apoie','contato','privacidade','termos']);
const rootFiles=new Set(['.nojekyll','404.html','index.html','robots.txt','sitemap.xml','version.json']);
const expectedDocuments=new Set(['documents/apresentacao-institucional-2026-09-10.pdf']);
const prohibited=/\b(?:supabase\.co|storage\/v1|auth\/v1|VITE_SUPABASE_URL|VITE_SUPABASE_ANON_KEY|sb_secret_|service_role)\b/i;
const otherSensitive=/github_pat_[A-Za-z0-9_]{25,}|-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/;
const forbiddenSegments=new Set(['.github','documentation','docs','tests','test-results','scripts','supabase',
'agents-archive','decision-archive','reports','prompts','prompt-templates']);
const forbiddenExt=/\.(?:md|sql|zip|tar|gz|bak|dump|db|sqlite|pem|key|p12|pfx|log|map|ts|tsx|ya?ml)$/i;
const textTypes=new Set(['.html','.js','.mjs','.css','.json','.xml','.txt','.svg']);
const seen=new Set(), violations=[];

async function walk(dir,prefix=''){
 for(const ent of await readdir(dir,{withFileTypes:true})){
  const rel=prefix?prefix+'/'+ent.name:ent.name;
  const parts=rel.split('/'),top=parts[0];
  if(ent.isSymbolicLink()){violations.push('symlink '+rel);continue;}
  if(parts.some(p=>forbiddenSegments.has(p))){violations.push('private '+rel);continue;}
  if(ent.isDirectory()){
   if(!prefix && !routeDirectories.has(top) && !['assets','documents','licenses'].includes(top)){
    violations.push('unexpected folder '+rel);continue;
   }
   await walk(join(dir,ent.name),rel);continue;
  }
  if(!ent.isFile()){violations.push('not file '+rel);continue;}
  seen.add(rel);
  if(forbiddenExt.test(rel)){violations.push('sensitive extension '+rel);continue;}
  if(routeDirectories.has(top)&&rel!==top+'/index.html')violations.push('route file '+rel);
  else if(top==='documents'&&!expectedDocuments.has(rel))violations.push('document not approved '+rel);
  else if(top==='assets' && ['PNG','WebP'].includes(parts[1]) && !expected.has(rel))
    violations.push('image not inventoried '+rel);
  else if(top==='assets' && !['PNG','WebP'].includes(parts[1]) &&
    !/^assets\/[^/]+\.(?:js|mjs|css|woff2?|ttf|svg)$/i.test(rel))
    violations.push('unexpected bundler asset '+rel);
  else if(top==='licenses'&&rel!=='licenses/raleway-OFL.txt')violations.push('license '+rel);
  else if(parts.length===1&&!rootFiles.has(rel))violations.push('unexpected root file '+rel);
  if(textTypes.has(extname(rel))){
   const content=await readFile(join(dir,ent.name),'utf8');
   if(prohibited.test(content)||otherSensitive.test(content))violations.push('forbidden runtime content '+rel);
  }
 }
}
await walk(dist);
for(const a of expected){if(!seen.has(a))violations.push('missing asset '+a);}
for(const d of expectedDocuments){if(!seen.has(d))violations.push('missing public pdf '+d);}
if(!seen.has('index.html'))violations.push('missing index');
for(const a of expected){
 if(seen.has(a) && (await stat(join(dist,a))).size<100)violations.push('empty asset '+a);
}
if(violations.length){console.error('Site estático reprovado:',violations);process.exitCode=1;}
else console.log('Pages validado: 98 imagens canônicas, logotipos aprovados, PDF público e nenhuma referência runtime Supabase.');
