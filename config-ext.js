'use strict';

module.exports = {
  defaultConfig: {
    aui_version: '3.0.0pr1',
    cdn_domain: 'http://cdn.alloyui.com',

    modules: require('./src/examples/modules.js'),
    collections: require('./src/examples/collections.js')
  },

  productFlavors: {
    development: {

    }
  }
};
