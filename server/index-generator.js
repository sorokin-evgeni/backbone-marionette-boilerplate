/**
 * Created by 40in on 08.10.14.
 */
var grunt = require('grunt'),
    path = require('path'),
    cons = require('consolidate');

var config = grunt.file.readJSON('config.json'),
    cssList = [],
    jsList = [],
    templates = [];

if (config.enviroment === 'dev') {
    var cssList = grunt.file.expand(config.staticSrc.css + '/*.css');
    cssList = cssList.map(function(filePath) {
        return path.relative(config.staticSrc.css, filePath);
    });

    var templates = [];
    grunt.file.expand(config.staticSrc.templates + '/*' + config.templateExt).map(function(filePath) {
        var template = {};
        template.name = path.basename(path.relative(config.staticSrc.templates, filePath), config.templateExt);
        template.content = grunt.file.read(filePath);
        templates.push(template);
    });
    jsList = ['require.js', 'require.config.js'];
} else {
    cssList = [config.staticDist.cssBundleName];
    jsList = [config.staticDist.jsBundleName];
}


exports.generate = function(success) {
    cons.underscore('server/templates/index.us', {
        jsList: jsList,
        cssList: cssList,
        templates: templates,
        title: ''
    }, function(err, html){
        if (err) throw err;
        success(html);
    });
};