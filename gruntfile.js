module.exports = function(grunt){
	grunt.initConfig({
		responsive_images: {
			dev: {
		    	options: {
			      	engine: 'im',
			      	sizes: [{ 
				        name: "small",
				        aspectRatio: false,
				        height: "330px",
				        width: "620px",
				        quality: 80
			      	},{
						name: "large",
				        aspectRatio: false,
				        width: "400px",
				        height: "600px",
				        quality: 60
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
		}
	});

grunt.loadNpmTasks('grunt-responsive-images');
grunt.loadNpmTasks('grunt-mkdir');
grunt.registerTask('default', ['mkdir', 'responsive_images']);
};

