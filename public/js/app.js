define('app', ['backbone'], function(Backbone) {
    var App = {
        init: function() {
            console.log('app init run');
        },
        parseTemplate: function(name, variables) {
            var compiledTemplates = window.JST || {};
            return compiledTemplates[name] ? compiledTemplates[name](variables) : _.template($('#' + name).html())(variables)
        }
    };
    console.log('application initialized');

    require(['js/app/modules/user'], function(User) {
        User.init();
    });

    return App;
});