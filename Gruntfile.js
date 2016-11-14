module.exports = function(grunt) {

grunt.initConfig({
        jshint: {
            files: ['Gruntfile.js', 'index.js', 'lib/**/*.js', 'test/**/*.js'], /* Options are defined within .jshintrc */
        },
        dco: {
            path: "/"
        }
    });

    /* Load */
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-dco');

    /* Register */
    grunt.registerTask('default', ['jshint', 'dco']);
    grunt.registerTask('test', ['jshint', 'dco']);

};