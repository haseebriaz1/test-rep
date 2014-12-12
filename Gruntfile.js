
module.exports = function(grunt) {

    var directories = {

        dev: "dev/",
        deploy: "/Library/WebServer/Documents/todo/",
        build: "/Library/WebServer/Documents/todo-build/"
    };

    var files = {

        concat: [
                    directories.dev + "src/Base.js",
                    directories.dev + "src/Observable.js",
                    directories.dev + "src/TaskViewModel.js",
                    directories.dev + "src/TODOModel.js",
                    directories.dev + "src/TaskView.js",
                    directories.dev + "src/TODOView.js",
                    directories.dev + "src/Main.js"
                ]
    }
  grunt.initConfig({
      concat: {
          "options": { "separator": ";" },
          "deploy": {
              "src": files.concat,
              "dest": directories.deploy + "js/todo.js"
          }
      },
      copy: {
          build: {
              files: [
                      {expand: true, cwd: directories.dev + "htmls/build", src: ['*.html'], dest: directories.build, filter: 'isFile'},
                      {expand: true, cwd: directories.dev + "src/", src: ['*.js'], dest: directories.build + 'js/', filter: 'isFile'},
                      {expand: true, cwd: directories.dev , src: ["res/**"], dest: directories.build}
              		]
          	},
          deploy :{

              files:[
                  {expand: true, cwd: directories.dev + "htmls/deploy", src: ['*.html'], dest: directories.deploy, filter: 'isFile'},
                  {expand: true, cwd: directories.dev, src: ["res/**"], dest: directories.deploy}
              ]
          }

      },
      clean: {

          options: {

              force: true
          },
    	  build: [directories.build],
          deploy: [directories.deploy]
    	},
      mochaTest: {
          test: {
              options: {
                  reporter: 'spec',
                  clearRequireCache: true
              },
              src: ['dev/tests/*.js']
          }
      },
      watch: {
          js: {
              options: {
                  spawn: true,
                  interrupt: true,
                  debounceDelay: 250
              },
              files: ['Gruntfile.js', 'dev/**/*.js'],
              tasks: ['mochaTest']
          }
      }
  });

  
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-watch');


  grunt.registerTask('default', ["clean", 'concat', "copy", "mochaTest"]);
  grunt.registerTask('test', ["mochaTest"]);

};