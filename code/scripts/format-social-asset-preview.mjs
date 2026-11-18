import { readFile } from 'node:fs/promises';
for (const path of ["scripts/check-pages-artifact.mjs","src/features/InstagramHighlight.tsx","src/features/SocialMediaPage.css"]) {
  console.log('LCR_FORMATTED ' + path + ' ' + (await readFile(path)).toString('base64'));
}
