const { build } = require('esbuild')
const { buildSettings } = require('./settings.js')
// const { Generator } = require('npm-dts');

// new Generator({
//   entry: 'src/index.ts',
//   output: 'dist/index.d.ts',
// }).generate()


const ESM = buildSettings({
  minify: true,
  entryPoints: ['src/index.ts'],
  outfile: 'dist/index.esm.mjs',
  format: 'esm',
})

const CJS = buildSettings({
  minify: true,
  entryPoints: ['src/index.ts'],
  outfile: 'dist/index.js',
  format: 'cjs',
})

const IIFE = buildSettings({
  minify: true,
  entryPoints: ['src/index.ts'],
  outfile: 'dist/index.iife.js',
  format: 'iife',
  globalName: 'Puzzler',
})

build(ESM)
build(CJS)
build(IIFE)