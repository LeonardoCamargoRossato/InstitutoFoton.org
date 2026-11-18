import { readFile } from 'node:fs/promises';
const path = 'src/features/SocialMediaPage.tsx';
console.log('LCR_FORMATTED ' + (await readFile(path)).toString('base64'));
