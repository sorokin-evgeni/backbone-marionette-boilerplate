requirejs.config({

    baseUrl: '',
    paths: {
        'backbone': 'js/lib/backbone/backbone',
        'marionette': 'js/lib/backbone.marionette/lib/backbone.marionette',
        'underscore': 'js/lib/underscore/underscore',
        'jquery': 'js/lib/jquery/dist/jquery',
        'app': 'js/app',
        'module': 'js/app/modules',
        'model': 'js/app/models',
        'view': 'js/app/views'
    },
    shim: {
        'backbone': {
            //These script dependencies should be loaded before loading
            //backbone.js
            deps: ['underscore', 'jquery'],
            //Once loaded, use the global 'Backbone' as the
            //module value.
            exports: 'Backbone'
        },
        'marionette': {
            deps: ['backbone'],
            exports: 'Marionette'
        },
        'underscore': {
            exports: '_'
        },
        jquery: {
            exports: '$'
        }
    }
});

require(['app', 'model/user'], function(app, User) {

    var currentUser = new User();
    currentUser.on('sync', function() {
        app.currentUser = currentUser;
        var language = app.currentUser.get('language') || 'en';
        require(['js/i18n/' + language], function(lng) {
            app.start(lng);
        });
    });
    currentUser.fetch();

});