import assert from 'node:assert/strict';
import test from 'node:test';
import { classifyAudit } from './audit-dependencies.mjs';

const advisory = {
  name: 'picomatch',
  url: 'https://github.com/advisories/GHSA-fc5q-39xc-vjpf',
  severity: 'high',
};
const report = () => ({
  vulnerabilities: {
    picomatch: { name: 'picomatch', severity: 'high', isDirect: false, via: [advisory] },
    fdir: { name: 'fdir', severity: 'high', via: ['picomatch'] },
    tinyglobby: { name: 'tinyglobby', severity: 'high', via: ['fdir', 'picomatch'] },
  },
});

test('admite exclusivamente a cadeia de picomatch em dev', () => {
  assert.equal(classifyAudit(report()).exceptionCount, 3);
});

test('não aceita uma nova advisory de severidade alta', () => {
  const data = report();
  data.vulnerabilities.other = {
    name: 'other',
    severity: 'high',
    via: [{ name: 'other', severity: 'high', url: 'https://example.org/new' }],
  };
  assert.throws(() => classifyAudit(data), /Advisory não autorizada/);
});

test('não admite a vulnerabilidade em dependência direta', () => {
  const data = report();
  data.vulnerabilities.picomatch.isDirect = true;
  assert.throws(() => classifyAudit(data), /picomatch transitivo/);
});

test('falha diante de uma cadeia incompleta', () => {
  const data = report();
  data.vulnerabilities.fdir.via = ['unknown'];
  assert.throws(() => classifyAudit(data), /Cadeia de vulnerabilidade incompleta/);
});

test('aprova uma auditoria sem alertas high ou critical', () => {
  assert.equal(classifyAudit({ vulnerabilities: {} }).exceptionCount, 0);
});
