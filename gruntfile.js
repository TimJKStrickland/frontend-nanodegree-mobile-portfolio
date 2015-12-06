module.exports = function(grunt){
	grunt.initConfig({
		responsive_images: {
	    	options: {
		    	engine: 'im',
		    	sizes: [{
			      	name: 'opt',
			      	height: 150,
			      	width: 150,
			      	quality: 50
			    }],
		      	files: [{
		        	expand: true,
		        	src: ['*.{jpg,gif,png}'],
		        	cwd:'img_src/',
		        	dest:'img/'
		    	}]
			}
		  },
		cssmin: {
		  target: {
		    files: [{
		      expand: true,
		      cwd: '/css',
		      src: ['*.css', '!*.min.css'],
		      dest: 'release/css',
		      ext: '.min.css'
		    }]
		  }
		},
		htmlmin: {                                    // Task 
			dist: {                                 // Target 
				options: {                         	// Target options 
					removeComments: true,
					collapseWhitespace: true
				},
				files: {                                // Dictionary of files 
					'index.html': 'index.min.html',     	// 'destination': 'source'
				}
			}
		}

	});
grunt.loadNpmTasks('grunt-responsive-images');
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-contrib-htmlmin');
grunt.registerTask('default', ['responsive_images', 'cssmin', 'htmlmin']);
};

