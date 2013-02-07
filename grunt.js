/*
* bootstrap js order
 '../js/libs/bootstrap/js/bootstrap-affix.js',
  '../js/libs/bootstrap/js/bootstrap-alert.js',
  '../js/libs/bootstrap/js/bootstrap-button.js',
  '../js/libs/bootstrap/js/bootstrap-carousel.js',
  '../js/libs/bootstrap/js/bootstrap-collapse.js',
  '../js/libs/bootstrap/js/bootstrap-dropdown.js',
  '../js/libs/bootstrap/js/bootstrap-modal.js',
  '../js/libs/bootstrap/js/bootstrap-scrollspy.js',
  '../js/libs/bootstrap/js/bootstrap-tab.js',
  '../js/libs/bootstrap/js/bootstrap-tooltip.js',
  '../js/libs/bootstrap/js/bootstrap-transition.js',
  '../js/libs/bootstrap/js/bootstrap-typeahead.js',
  '../js/libs/bootstrap/js/bootstrap-popover.js',
*/

/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:project.json>',
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    'jsmin-sourcemap': {
      prod: {

        src: [],

        // Destination for concatenated/minified JavaScript
        dest: '../js/<%= pkg.name %>.min.js',

        // Destination for sourcemap of minified JavaScript
        destMap: '../js/_map.js.map'
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    lint: {
      files: ['grunt.js', 'src/js/<%= pkg.name %>.js>', 'test/**/*.js']
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'lint qunit'
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true
      },
      globals: {
        jQuery: true
      }
    },

    less:{
      dist: {
        options: {
          paths: ["../css/","../js/libs/bootstrap/less"],
          yuicompress: true
        },
        files: {
          "../css/style.css": "../css/style.less"
        }
      }
    },

    copy: {
      dist: {
        options: {
          //cwd: 'path/to/sources'
        },
        files: {
          "../font/": "../css/libs/Font-Awesome/font/*"
          //"dist/development/img/": "src/js/libs/bootstrap/img/*" // optional: you don't need to copy the bootstrap sprite files if you're using Font Awesome.
        }
      }
    }

  });
  
  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-jsmin-sourcemap');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-groundskeeper');

  grunt.registerTask('default', 'bump groundskeeper jsmin-sourcemap less copy');
  grunt.registerTask('prod', 'bump:minor jsmin-sourcemap less copy');
  //grunt.registerTask('default', 'concat min less copy');
  //grunt.registerTask('prod', 'lint qunit concat:prod min groundskeeper:prod less copy bump:minor');

};
