/**
 * Created by Adebisi-FA on 10/7/2014.
 */

module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        buildDir: "<%= pkg.name %>-<%= pkg.version %>",
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %>, Build <%= pkg.version%> generated on <%= grunt.template.today("yyyy-mm-dd") %> by <%= pkg.author %> (<%= pkg.email %>) */\n'
            },
            build: {
                src: 'src/<%= pkg.name %>.js',
                dest: 'build/<%= buildDir %>/<%= pkg.name %>.min.js'
            }
        },
        copy: {
            default: {
                files: [
                    {
                        dest: "build/<%= buildDir %>/jssor-slider/js/",
                        src: "bower_components/jssor-slider/js/*.mini.js",
                        expand: true,
                        flatten: true
                    },
                    {
                        dest: "build/<%= buildDir %>/jssor-slider/images/",
                        src: "bower_components/jssor-slider/img/*",
                        expand: true,
                        flatten: true
                    }
                ]
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Default task(s).
    grunt.registerTask('default', ['uglify', 'copy']);
};