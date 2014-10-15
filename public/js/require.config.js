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

//
//requirejs.config({
//    baseUrl: '',
//    paths: {
//        backbone: "vendor/backbone",
//        "backbone.picky": "vendor/backbone.picky",
//        "backbone.syphon": "vendor/backbone.syphon",
//        jquery: "vendor/jquery",
//        "jquery-ui": "vendor/jquery-ui",
//        json2: "vendor/json2",
//        localstorage: "vendor/backbone.localstorage",
//        marionette: "vendor/backbone.marionette",
//        spin: "vendor/spin",
//        "spin.jquery": "vendor/spin.jquery",
//        text: "vendor/text",
//        tpl: "vendor/underscore-tpl",
//        underscore: "vendor/underscore"
//    },
//
//    shim: {
//        underscore: {
//            exports: "_"
//        },
//        backbone: {
//            deps: ["jquery", "underscore", "json2"],
//            exports: "Backbone"
//        },
//        "backbone.picky": ["backbone"],
//        "backbone.syphon": ["backbone"],
//        marionette: {
//            deps: ["backbone"],
//            exports: "Marionette"
//        },
//        "jquery-ui": ["jquery"],
//        localstorage: ["backbone"],
//        "spin.jquery": ["spin", "jquery"],
//        tpl: ["text"]
//    }
//});