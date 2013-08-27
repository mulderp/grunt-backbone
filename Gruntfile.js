/*global module:false*/
module.exports = function(grunt) {

  var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;

  require('matchdep').filterAll('grunt-*').forEach(grunt.loadNpmTasks);

    // Check if config.json exists
    if (grunt.file.exists('config.json')) {
      var config = grunt.file.readJSON("config.json");
    }
    else {
      grunt.log.error('Wow, wow, wow! Please, have a `config.json` for fuck\'s sake!');
      process.exit(1);
    }

  // Project configuration.
  grunt.initConfig({


    pkg: grunt.file.readJSON('package.json'),


    jshint: {
      options: {
        curly: true
      },
      gruntfile: {
        src: 'Gruntfile.js'
      }
    },

    watch: {
      options: {
        interval: 5007
      },

      scripts: {
        files: [
          'js/**/*.js'
        ],
        tasks: [
          'scripts:dev', 'notify:complete'
        ]
      },
    },

    // server
    connect: {
      server: {
        options: {
          port: 8000,
          base: 'public',
          logger: 'dev',
          hostname: 'localhost'
        }
      },
      proxies: [
                {
                    context: '/context',
                    host: '0.0.0.0',
                    port: 9292,
                    https: false,
                    changeOrigin: false
                }
      ]
    },
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-connect-proxy');

  // Default task.
  grunt.registerTask('default', ['jshint', 'connect:server', 'configureProxies', 'watch']);

};
