import 'server-only';
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

export type SourceEntry = { name: string; files: string[]; route?: string };

// Read only project files, and only when the development layout requests them.
export function getSourceManifest(): SourceEntry[] {
  const root = process.cwd();
  const entries: SourceEntry[] = [];
  function walk(directory: string) {
    if (!fs.existsSync(directory)) return;
    for (const item of fs.readdirSync(directory, { withFileTypes: true })) {
      const absolute = path.join(directory, item.name);
      if (item.isDirectory()) { walk(absolute); continue; }
      if (!/\.(tsx|jsx)$/.test(item.name) || absolute.includes('/components/dev/')) continue;
      const file = path.relative(root, absolute).split(path.sep).join('/');
      const source = ts.createSourceFile(file, fs.readFileSync(absolute, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
      const names = new Set<string>([path.basename(file).replace(/\.[^.]+$/, '')]);
      const files = [file];
      for (const node of source.statements) {
        if ((ts.isFunctionDeclaration(node) || ts.isClassDeclaration(node)) && node.name) names.add(node.name.text);
        if (ts.isVariableStatement(node)) for (const declaration of node.declarationList.declarations) {
          if (ts.isIdentifier(declaration.name)) names.add(declaration.name.text);
        }
        if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier)) {
          const specifier = node.moduleSpecifier.text;
          if (!/\.(css|scss|sass)$/.test(specifier)) continue;
          const css = specifier.startsWith('@/') ? path.join(root, specifier.slice(2)) : path.resolve(directory, specifier);
          if (css.startsWith(root + path.sep) && fs.existsSync(css)) files.push(path.relative(root, css).split(path.sep).join('/'));
        }
      }
      const route = /^app\/.*\/page\.[jt]sx$/.test(file) || /^app\/page\.[jt]sx$/.test(file)
        ? '/' + file.split('/').slice(1, -1).filter(part => !part.startsWith('(') && !part.startsWith('@')).join('/') : undefined;
      for (const name of Array.from(names)) entries.push({ name, files, ...(route === undefined ? {} : { route }) });
    }
  }
  walk(path.join(root, 'app'));
  walk(path.join(root, 'components'));
  return entries;
}
