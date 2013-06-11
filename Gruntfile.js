module.exports = function(grunt) {
  var name, latest, bannerContent, devRelease, minRelease, sourceMap, lDevRelease, lMinRelease, lSourceMapMin;

  latest = '<%= pkg.name %>';
  name = '<%= pkg.name %>-v<%= pkg.version%>';
  bannerContent = '/*! <%= pkg.name %> v<%= pkg.version %> - ' +
		  '<%= grunt.template.today("yyyy-mm-dd") %> \n' +
		  ' *  License: <%= pkg.license %> */\n';
  devRelease = 'distrib/'+name+'.js';
  minRelease = 'distrib/'+name+'.min.js';
  sourceMapMin = 'distrib/source-map-'+name+'.min.js';

  lDevRelease = 'distrib/'+latest+'.js';
  lMinRelease = 'distrib/'+latest+'.min.js';
  lSourceMapMin = 'distrib/source-map-'+latest+'.min.js';
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    qunit:{
      target: {
        src: ['test/**/*.html']
      }
    },
    copy: {
      development: {
        src: devRelease,
	dest: lDevRelease
      },
      minified: {
        src: minRelease,
	dest: lMinRelease
      },
      smMinified: {
        src: sourceMapMin,
	dest: lSourceMapMin
      }
    },
    uglify:{
      options: {
        banner: bannerContent,
	sourceMap: sourceMapMin
      },
      target: {
        src: ['src/**/*.js'],
        dest: minRelease
      }
    },
    concat: {
      options: {
        banner: bannerContent
      },
      target: {
        src: ['src/**/*.js'],
        dest: devRelease
      }
    },
    jshint: {
      options: {
        latedef: true, // require variables definition before usage 
	noarg: true, //  prohibit deprecated arguments.caller and arguments.callee
	nonew: true, // prohibit use of constructor functions for side-effects
	undef: true, // prohibit use of undeclared variables
	unused: true, // prohibit unused variables
	eqeqeq: true, // prohibits use of == and != in favor of === and !==
	trailing: true // warn about trailing whitespaces in your code
      },
      target: {
        src: ['src/**/*.js', 'test/**/*.js']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'copy', 'qunit']);

};
