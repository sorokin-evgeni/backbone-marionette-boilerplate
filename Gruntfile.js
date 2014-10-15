/**
 * Created by 40in on 08.10.14.
 */
module.exports = function(grunt) {

    var http = require('http');
    var tplGenerator = require('./server/template-generator.js');

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
                    include: ["app", "model/user", "js/app/menu"].concat(grunt.file.expand({cwd: config.staticSrc.js + '/app/modules'}, ['*.js']).map(function(fileName) { return 'module/' + fileName.replace(/\.js$/,'')})),
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
                        return '#'+match[1];
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
        },
        less: {
            compile: {
                options: {
                    sourceMap: true
                },
                src: config.staticSrc.less + '/*.less',
                dest: config.staticSrc.css + '/less-styles.css'
            }
        },
        watch: {
            less: {
                files: config.staticSrc.less + '/*.less',
                tasks: ['less']
            }
        }

    });

    // Clean
    grunt.registerTask('clean', 'Remove all bundles and tmp files', function() {
        var files = [];
        files.push(config.staticDist.base + '/index.html');
        files.push(config.staticDist.tmpFolder + '/templates.js');
        files.push(config.staticDist.tmpFolder + '/app.js');
        files.push(config.staticDist.css + '/main.css');
        files.push(config.staticDist.js + '/app.js');
        files.forEach(function(filePath) {
            grunt.file.exists(filePath) && grunt.file.delete(filePath);
            console.log(filePath + ' removed');
        });
    });

    // Tanker:
    var languages = ['en', 'ru'];
    function downloadLocalization(lang, callback) {
        http.get(config.tankerUrl + "/tools/generate/i18n.xml?project-id=ang-chat&language=" + lang + "&keyset-id=main&path=i18n&type=js", function(res) {

            res.on('data', function (chunk) {
                tplGenerator.i18n(lang, chunk+'', function(code) {
                    [config.staticSrc.js + '/i18n/' + lang + '.js', config.staticDist.js + '/i18n/' + lang + '.js'].forEach(function(filePath) {
                        grunt.file.exists(filePath) && grunt.file.delete(filePath);
                        grunt.file.write(filePath, code);
                    });
                    callback && callback();
                });
            });
        }).on('error', function(e) {
            console.log("Got error: " + e.message);

        });
    }
    grunt.registerTask('tanker', 'Download tanker localization and save it as AMD module', function() {
        var done = this.async();

        var lngIndex = 0;
        function downloadCallback() {
            lngIndex++;
            languages[lngIndex] ? downloadLocalization(languages[lngIndex], downloadCallback) : done();
        }
        downloadLocalization(languages[lngIndex], downloadCallback);
    });

    // Genetate and save index.html
    grunt.registerTask('index', 'Generate index.html', function() {
        var done = this.async();
        tplGenerator.index(function(html) {
            var filePath = config.staticDist.base + '/index.html';
            grunt.file.exists(filePath) && grunt.file.delete(filePath);
            grunt.file.write(filePath, html);
            done();
        }, 'prod');

    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jst');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['clean', 'less', 'cssmin', 'tanker', 'requirejs', 'jst', 'uglify', 'index']);


};