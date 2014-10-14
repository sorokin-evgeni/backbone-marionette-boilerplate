/**
 * Created by 40in on 08.10.14.
 */
module.exports = function(grunt) {

    //TODO: 1) get path from config
    //TODO: 2) requirejs & bower instead of jam ?
    //TODO: 3) template engine (flexibility)
    //TODO: 4) less compile

    var config = grunt.file.readJSON('config.json');

    grunt.initConfig({
        // join and minify css
        cssmin: {
            minify: {
                src: config.staticSrc.css + '/*.css',
                dest: config.staticDist.css + '/main.css'
            }
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: config.staticSrc.base,
                    mainConfigFile: config.staticSrc.js + '/require.config.js',
                    include: config.staticSrc.includeModules,
                    out: config.staticDist.tmpFolder + '/app.js'
                }
            }
        },
        jst: {
            compile: {
                options: {
                    processName: function(filename) {
                        var match = /\/?([^\/]+)\.us$/.exec(filename);
                        if (!match || !match[1]) throw('Invalid filename ' + filename);
                        return match[1];
                    }
                },
                src: config.staticSrc.templates + '/*' + config.templateExt,
                dest: config.staticDist.tmpFolder + '/templates.js'
            }
        },
        uglify: {
            compile: {
                src: [config.staticDist.tmpFolder + '/templates.js', config.staticSrc.js + '/require.js', config.staticSrc.js + '/require.config.js', config.staticDist.tmpFolder + '/app.js'],
                dest: config.staticDist.js + '/app.js'
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jst');

    // Default task(s).
    grunt.registerTask('default', ['cssmin', 'requirejs', 'jst', 'uglify']);


};