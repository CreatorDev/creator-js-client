module.exports = function(grunt) {

    grunt.initConfig({
        // dco: { path: "/" },
        jshint: {
            files: ['Gruntfile.js', 'index.js', 'lib/**/*.js', 'test/**/*.js'], /* Options are defined within .jshintrc */
        }
    });

    /* Load */
    grunt.loadNpmTasks('grunt-contrib-jshint');
    // grunt.loadNpmTasks('grunt-dco');

    /* Register */
    grunt.registerTask('default', ['jshint']);
    grunt.registerTask('test', ['jshint']);

};