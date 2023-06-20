const esbuildPluginTsc = require('esbuild-plugin-tsc');

module.exports = {
  buildSettings(options) {
    return {
      bundle: true,
      allowOverwrite: true,
      target: 'es2016',
      plugins: [ esbuildPluginTsc({ force: true }) ],
      ...options
    }
  }
}