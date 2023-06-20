const { build } = require('esbuild')
const { buildSettings } = require('./settings.js')
const { Generator } = require('npm-dts');

new Generator({
  entry: 'src/index.ts',
  output: 'dist/index.d.ts',
}).generate()


const settings = buildSettings({
  minify: true,
  entryPoints: ['src/index.ts'],
  outfile: 'dist/bundle.js',
  format: 'esm',
  target: 'es2016',
  allowOverwrite: true,
})

build(settings)