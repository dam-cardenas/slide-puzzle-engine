const esbuildPluginTsc = require('esbuild-plugin-tsc');

module.exports = {
  buildSettings(options) {
    return {
      bundle: true,
      plugins: [
        esbuildPluginTsc({ force: true }),
      ],
      ...options
    }
  }
}