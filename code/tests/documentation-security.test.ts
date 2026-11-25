import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const root = resolve(process.cwd(), '..');
const read = (path: string) => readFileSync(resolve(root, path), 'utf8');

describe('Separação documental de Safety & Security', () => {
  it('não publica pastas internas no checkout', () => {
    for (const path of ['privado', 'documentation/private', 'Documentation']) {
      expect(existsSync(resolve(root, path)), path).toBe(false);
    }
  });

  it('rejeita caminhos internos versionados no Git', () => {
    const tracked = execFileSync('git', ['ls-files', '--cached', '-z'], {
      cwd: root,
      encoding: 'utf8',
    })
      .split('\0')
      .filter(Boolean);
    const leaked = tracked.filter(
      (path) =>
        path.startsWith('privado/') ||
        path.startsWith('documentation/private/') ||
        path.startsWith('Documentation/'),
    );
    expect(leaked).toEqual([]);
  });

  it('preserva os guardrails públicos e a proteção preventiva do Git', () => {
    expect(read('.gitignore')).toContain('/privado/');
    expect(read('AGENTS.md')).toContain('GUARDRAILS.md');
    expect(read('AGENTS.md')).toContain('prompt injection');
    expect(read('documentation/README.md')).toContain('outside GitHub');
    expect(existsSync(resolve(root, 'documentation/public/security/README.md'))).toBe(true);
  });

  it('não reduz verificações de segurança ou deploy', () => {
    for (const workflow of ['ci.yml', 'deploy-pages.yml']) {
      const source = read('.github/workflows/' + workflow);
      const auditTask = 'npm run audit:ci';
      for (const task of [
        auditTask,
        'npm run scan:secrets',
        'npm run docs:check',
        'npm run format:check',
        'npm run check',
        'npm run assets:verify',
        'npm run artifact:check',
        'npm run test:e2e',
      ]) {
        expect(source, workflow + ' deve executar ' + task).toContain(task);
      }
    }

    // A exceção de desenvolvimento não pode eliminar a auditoria de produção.
    const audit = read('code/scripts/audit-dependencies.mjs');
    expect(audit).toContain("'--omit=dev'");
    expect(audit).toContain('GHSA-fc5q-39xc-vjpf');
    expect(audit).toContain('2026-12-17T00:00:00Z');
    expect(audit).toContain("new Set(['high', 'critical'])");
    expect(read('code/package.json')).toContain('audit:ci');
  });
});
