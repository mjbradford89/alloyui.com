var fs = require('fs');

module.exports = {

  prompts: false,

  /* =================================
   * Template Data
   */

  // These are variables will be accessible via our templates
  templateData: {

    /* -----------------------------
     * AlloyUI Information
     */

    alloy: {
      // AlloyUI version
      version: '3.0.0pr1',

      // CDN domain
      cdnDomain: 'http://cdn.alloyui.com'
    },

    /* -----------------------------
     * Site Information
     */

    site: {
      // Website version
      version: '3.0.x',
      isLastVersion: true,

      // Production URL
      url: 'http://alloyui.com',

      // Github branch
      githubUrl: 'https://github.com/liferay/alloy-ui/',

      // Basic info
      title: 'AlloyUI',
      description: 'AlloyUI is a framework built on top of YUI3 (JavaScript) that uses Bootstrap (HTML/CSS) to provide a simple API for building high scalable applications.'
    },

    /* -----------------------------
     * Helpers
     */

    // Get the prepared site/document title
    getCategoryTitle: function() {

      // if we have a document title, then we should use that and suffix the site's title into it
      if (this.document.title) {
        if (this.document.category) {
          return "" + this.document.category + " - " + this.document.title + " | " + this.site.title;
        } else {
          return "" + this.document.title + " | " + this.site.title;
        }
      } // if our document does not have it's own title, then we should just use the site's title
      else {
        return this.site.title;
      }
    },

    // Get the prepared site/document title
    getPreparedTitle: function() {

      // if we have a document title, then we should use that and suffix the site's title into it
      if (this.document.title) {
        if (this.document.category) {
          return "" + this.document.category + " - " + this.document.title + " | " + this.site.title;
        } else {
          return "" + this.document.title + " | " + this.site.title;
        }
      } // if our document does not have it's own title, then we should just use the site's title
      else {
        return this.site.title;
      }
    },

    // Get the prepared site/document description
    getPreparedDescription: function() {
      // if we have a document description, then we should use that, otherwise use the site's description
      return this.document.description || this.site.description;
    },

    // Get the Bootstrap CSS file for this Alloy version
    getBootstrapCSS: function() {
      return "" + this.alloy.cdnDomain + "/" + this.alloy.version + "/aui-css/css/bootstrap.min.css";
    },

    // Get the CDN path for this Alloy version
    getCdnPath: function() {
      return "" + this.alloy.cdnDomain + "/" + this.alloy.version;
    },

    // Get the CDN seed file for this Alloy version
    getCdnSeed: function() {
      return "" + this.alloy.cdnDomain + "/" + this.alloy.version + "/aui/aui-min.js";
    },

    // Get the download URL for this Alloy version
    getDownloadUrl: function() {
      return "https://github.com/liferay/alloy-ui/releases/download/" + this.alloy.version + "/alloy-" + this.alloy.version + ".zip";
    },

    // Get the absolute URL of the website
    getSiteUrl: function() {
      if (this.site.isLastVersion) {
        return "" + this.site.url;
      } else {
        return "" + this.site.url + "/versions/" + this.site.version;
      }
    },

    // Get the absolute URL of the assets folder
    getAssetsUrl: function() {
      if (this.site.isLastVersion) {
        return "" + this.site.url + "/website";
      } else {
        return "" + this.site.url + "/versions/" + this.site.version + "/website";
      }
    },

    // Read File
    readFile: function(relativePath) {
      var path = this.document.fullDirPath + '/' + relativePath;
      var result = fs.readFileSync(path);

      return result.toString();
    },

    // Code File
    codeFile: function(relativePath, language) {
      var contents = this.readFile(relativePath);
      return '<pre><code class="' + language + '">' + contents + '</code></pre>';
    },

    isRelated: function(example) {
        var path = this.document.relativeDirPath.replace('examples', '');
        return example.title && example.url.indexOf(path) !== -1;
    }
  },

  /* =================================
   * Collections
   */

  collections: {
    // Get all tutorials sorted by type & alphabetical order
    tutorials: function() {
      return this.getCollection("documents").findAllLive({
        url: {
          $startsWith: '/tutorials'
        }
      }, [
        {
          type: 1,
          order: 1,
          title: 1
        }
      ]);
    },

    // Get all examples sorted by category & alphabetical order
    examples: function() {
      return this.getCollection("documents").findAllLive({
        url: {
          $startsWith: '/examples',
        }
      }, [
        {
          title: 1
        }
      ]);
    },

    // Get all examples sorted by category & alphabetical order
    relatedExamples: function() {
      return this.getCollection("documents").findAllLive({
        url: {
          $startsWith: '/examples',
        }
      }, [
        {
          title: 1
        }
      ]);
    },

    // Get all examples that contains featuringOrder attribute
    featuring: function(database) {
      return database.findAllLive({
        featuringOrder: {
          $exists: true
        }
      }, [
        {
          featuringOrder: 1
        }
      ]);
    }
  },

  /* =================================
   * Environments
   */

  environments: {
    development: {
      templateData: {

        /* -----------------------------
         * Site Information
         */

        // Development URL
        site: {
          url: 'http://localhost:9778'
        },

        /* -----------------------------
         * Helpers
         */

        // Get the absolute Development URL of the website
        getSiteUrl: function() {
          return "" + this.site.url;
        },

        // Get the absolute Development URL of the assets folder
        getAssetsUrl: function() {
          return "" + this.site.url;
        }
      }
    }
  }
};