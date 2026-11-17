import { spawnSync } from 'node:child_process';

const approvedAdvisory = 'https://github.com/advisories/GHSA-fc5q-39xc-vjpf';
const reviewDeadline = Date.parse('2026-12-17T00:00:00Z');
const blockingSeverities = new Set(['high', 'critical']);

/** Autoriza somente consequências transitivas de uma única advisory conhecida. */
export function classifyAudit(report) {
  const vulnerabilities = report?.vulnerabilities;
  if (!vulnerabilities || typeof vulnerabilities !== 'object') {
    throw new Error('npm audit não forneceu um inventário válido');
  }
  const high = Object.entries(vulnerabilities).filter(([, entry]) =>
    blockingSeverities.has(entry.severity),
  );
  if (!high.length) return { exceptionCount: 0 };

  const trace = (name, seen = new Set()) => {
    if (seen.has(name)) throw new Error(`Dependência cíclica na auditoria: ${name}`);
    const entry = vulnerabilities[name];
    if (!entry || !Array.isArray(entry.via) || !entry.via.length) {
      throw new Error(`Cadeia de vulnerabilidade incompleta: ${name}`);
    }
    const next = new Set([...seen, name]);
    for (const via of entry.via) {
      if (typeof via === 'string') {
        trace(via, next);
      } else if (
        name !== 'picomatch' ||
        via?.name !== 'picomatch' ||
        via?.url !== approvedAdvisory ||
        !blockingSeverities.has(via?.severity)
      ) {
        throw new Error(`Advisory não autorizada em ${name}: ${via?.url || 'desconhecida'}`);
      }
    }
  };

  for (const [name] of high) trace(name);
  if (!vulnerabilities.picomatch || vulnerabilities.picomatch.isDirect) {
    throw new Error('A exceção só vale para picomatch transitivo');
  }
  if (Date.now() >= reviewDeadline) {
    throw new Error('Exceção GHSA-fc5q-39xc-vjpf expirada: reavaliar mitigação');
  }
  return { exceptionCount: high.length };
}

export function runAudit() {
  const production = spawnSync('npm', ['audit', '--omit=dev', '--audit-level=high'], {
    encoding: 'utf8',
    stdio: 'inherit',
  });
  if (production.error || production.status !== 0) {
    throw new Error('Auditoria de dependências de produção reprovada');
  }

  const full = spawnSync('npm', ['audit', '--json', '--audit-level=high'], {
    encoding: 'utf8',
    maxBuffer: 16 * 1024 * 1024,
  });
  if (full.error || ![0, 1].includes(full.status)) {
    throw new Error(`Falha ao executar auditoria completa: ${full.error || full.stderr}`);
  }
  let report;
  try {
    report = JSON.parse(full.stdout);
  } catch {
    throw new Error('Saída JSON inválida do npm audit');
  }
  const result = classifyAudit(report);
  if (result.exceptionCount) {
    console.warn(
      `Exceção temporária GHSA-fc5q-39xc-vjpf: ${result.exceptionCount} alertas high ` +
        'derivados de picomatch em ferramentas de desenvolvimento. ' +
        'Sem versão corrigida em 17/11/2026; revisar até 17/12/2026. ' +
        'Auditoria de produção aprovada. Consulte scripts/SECURITY_EXCEPTION_PICOMATCH.md.',
    );
  } else {
    console.log('npm audit: nenhum alerta high/critical encontrado');
  }
}

if (process.argv[1]?.endsWith('audit-dependencies.mjs')) {
  try {
    runAudit();
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}
