
module.exports = function(grunt) {
	
  grunt.initConfig({
      concat: {
          "options": { "separator": ";" },
          "build": {
              "src": ["dev/src/Base.js", "dev/src/Main.js"],
              "dest": "build/js/todo.js"
          }
      },
      copy: {
          build: {
              files: [
                      {expand: true, cwd: "dev/htmls", src: ['*.html'], dest: 'build/', filter: 'isFile'},
                      {expand: true, cwd: "dev/", src: ["res/**"], dest: 'build/'}
              		]
          	}
      },
      clean: {
    	  build: ["build/"],
    	  deploy: ["deploy/"]
    	},
    	
    	uglify: {
    	    deploy: {
    	      files: {
    	        'deploy/js/todo.min.js': ["dev/src/Base.js", "dev/src/Main.js"]
    	      }
    	    }
    	  }
  });

  
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Task definitions
  grunt.registerTask('default', ["clean", 'concat', "copy", "uglify"]);

};