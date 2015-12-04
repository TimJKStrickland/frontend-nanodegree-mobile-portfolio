module.exports = function(grunt){
	grunt.initConfig({
		responsive_images: {
			dev: {
		    	options: {
			      	engine: 'im',
			      	sizes: [{ 
				        name: "small",
				        aspectRatio: false,
				        height: "33px",
				        width: "62px",
				        quality: 20
			      	},{
						name: "large",
				        aspectRatio: false,
				        width: "200px",
				        height: "300px",
				        quality: 50
			      	}]
				},
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
		compress: {
			main: {
				options: {
					mode: 'gzip'
				},
				expand: true,
				cwd: 'css/',
				src: ['**/*'],
				dest: 'public/'
			}
		}
	});
grunt.loadNpmTasks('grunt-responsive-images');
grunt.loadNpmTasks('grunt-mkdir');
grunt.loadNpmTasks('grunt-contrib-compress');
grunt.registerTask('default', ['mkdir', 'responsive_images', 'compress']);
};

