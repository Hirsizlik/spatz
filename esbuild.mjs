import * as esbuild from 'esbuild';

await esbuild.build({
  entryPoints: ['server/server.tsx'],
  bundle: true,
  outfile: 'dist/server.js',
  platform: "node",
  format: "esm",
  packages: "bundle",
  banner: {js: "import { createRequire } from 'module'; const require = createRequire(import.meta.url);"}
});

await esbuild.build({
  entryPoints: ['client/index.tsx'],
  bundle: true,
  outfile: 'public/bundle.js',
});