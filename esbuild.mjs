import * as esbuild from 'esbuild';

await esbuild.build({
  entryPoints: ['src/server/server.ts'],
  bundle: true,
  outfile: 'dist/server.js',
  platform: "node",
  format: "esm",
  packages: "bundle",
  banner: {js: "import { createRequire } from 'module'; const require = createRequire(import.meta.url);"}
});

await esbuild.build({
  entryPoints: ['src/client/index.tsx'],
  bundle: true,
  outfile: 'public/bundle_index.js',
});

await esbuild.build({
  entryPoints: ['src/client/playlist.tsx'],
  bundle: true,
  outfile: 'public/bundle_playlist.js',
});