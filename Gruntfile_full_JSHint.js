module.exports = function(grunt) {
  var name, latest, bannerContent, devRelease, minRelease, sourceMap;

  latest = '<%= pkg.name %>';
  name = '<%= pkg.name %>-v<%= pkg.version%>';
  bannerContent = '/*! <%= pkg.name %> v<%= pkg.version %> - ' +
		      '<%= grunt.template.today("yyyy-mm-dd") %> */ \n';
  devRelease = 'distrib/'+name+'.js';
  minRelease = 'distrib/'+name+'.min.js';
  sourceMapDev = 'distrib/source-map-'+name+'.js';
  sourceMapMin = 'distrib/source-map-'+name+'.min.js';

  lDevRelease = 'distrib/'+latest+'.js';
  lMinRelease = 'distrib/'+latest+'.min.js';
  lSourceMapDev = 'distrib/source-map-'+latest+'.js';
  lSourceMapMin = 'distrib/source-map-'+latest+'.min.js';
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        banner: bannerContent
      },
      target: {
        dest: devRelease,
        src: ['src/**/*.js']
      }
    },
    uglify:{
      options: {
        banner: bannerContent,
	sourceMap: sourceMapMin
      },
      target: {
        dest: minRelease,
        src: ['src/**/*.js']
      }
    },
    jshint: {
      options: {
        latedef: true, // require variables definition before usage 
	noarg: true, //  prohibit deprecated arguments.caller and arguments.callee
	nonew: true, // prohibit use of constructor functions for side-effects
	undef: true, // prohibit use of undeclared variables
	unused: true, // prohibit unused variables
	trailing: true, // warn about trailing whitespaces in your code
	eqeqeq: true // prohibits use of == and != in favor of === and !==
      },
      target: {
        src: ['src/**/*.js', 'test/**/*.js']
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
      smDevelopment: {
        src: sourceMapDev,
	dest: lSourceMapDev
      },
      smMinified: {
        src: sourceMapMin,
	dest: lSourceMapMin
      }
    },
    qunit:{
      target: {
        src: ['test/**/*.html']
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
