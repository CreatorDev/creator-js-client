module.exports = function(grunt) {

    grunt.initConfig({
        dco: {
            path: "/",
            commitish: process.env.TRAVIS_COMMIT_RANGE
        },
        jshint: {
            files: ['Gruntfile.js', 'index.js', 'lib/**/*.js', 'test/**/*.js'], /* Options are defined within .jshintrc */
        }
    });

    /* Load */
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-dco');

    /* Register */
    grunt.registerTask('default', ['jshint', 'dco']);
    grunt.registerTask('test', ['jshint', 'dco']);

};