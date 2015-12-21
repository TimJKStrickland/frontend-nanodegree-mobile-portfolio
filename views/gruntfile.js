module.exports = function(grunt){
	grunt.initConfig({
		responsive_images: {
	    	options: {
		    	engine: 'im',
		    	sizes: [{
			      	name: 'opt',
			      	height: 500,
			      	width: 600,
			      	quality: 65
			    }],
		      	files: [{
		        	expand: true,
		        	src: ['*.{jpg,gif,png}'],
		        	cwd:'views/images/',
		        	dest:'views/images/'
		    	}]
			}
		}
	});

grunt.loadNpmTasks('grunt-responsive-images');
grunt.registerTask('default', ['responsive_images']);
};