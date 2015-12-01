'use strict';

// var ngrok = require('ngrok');

module.exports = function(grunt){
	// require('load-grunt-tasks')(grunt);
	grunt.initConfig({
		pagespeed: {
			options: {
				nokey: true,
				locale: "en_GB",
				threshold: 90
			},
			local: {
				options: {
					strategy: 'desktop'
				}
			},
			mobile: {
				options: {
					strategy: 'mobile'
				}
			}
		},
		uglify: {
			options: {
				mangle: false
			}
			files: {
			'main.min.js': ['main.js'];
			}
		},
		responsive_images: {
	      options: {
		      engine: 'im',
		      sizes: [{
		      	name: 'opt',
		      	quality: 80
		      }],
		      files: [{
		        expand: true,
		        src: ['*.{jpg,gif,png}'],
		        cwd:'img_src/',
		        dest:'img/'
		      }]
			}
		  },
	  	mkdir: {
	  		dev: {
		      options: {
		        create: ['img']
		      }
		    }
		},
		cssmin: {
			target: {
				files: [{
					expand: true,
					cwd: 'css/',
					src: ['*.css' '!*.min.css'],
					dest: '/css',
					ext: '.min.css'
				}]
			}
		}
	});
// taken from James Cryer to use ngrok with pagespeed
// URL: https://github.com/jrcryer/grunt-pagespeed-ngrok-sample
// Register custom task for ngrok
  grunt.registerTask('psi-ngrok', 'Run pagespeed with ngrok', function() {
    var done = this.async();
    var port = 9292;

    ngrok.connect(port, function(err, url) {
      if (err !== null) {
        grunt.fail.fatal(err);
        return done();
      }
      grunt.config.set('pagespeed.options.url', url);
      grunt.task.run('pagespeed');
      done();
    });
  });

grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-responsive-images');
grunt.loadNpmTasks('grunt-cssmin');
grunt.loadNpmTasks('grunt-pagespeed');
grunt.loadNpmTasks('grunt-mkdir');
grunt.registerTask('default', ['responsive_images', 'mkdir', 'uglify', 'cssmin']);
};