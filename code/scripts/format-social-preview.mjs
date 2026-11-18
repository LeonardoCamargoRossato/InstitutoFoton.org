import { readFile } from 'node:fs/promises';

for (const path of ["src/app/Layout.tsx","src/features/SocialMediaPage.css","src/features/SocialMediaPage.tsx","tests/browser/social-media.spec.ts"]) {
  const data = await readFile(path);
  console.log('LCR_FORMATTED ' + path + ' ' + data.toString('base64'));
}
