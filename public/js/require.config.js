requirejs.config({

    baseUrl: '',
    paths: {
        'backbone': 'js/lib/backbone/backbone',
        'underscore': 'js/lib/underscore/underscore',
        'jquery': 'js/lib/jquery/dist/jquery',
        'app': 'js/app'
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
        'underscore': {
            exports: '_'
        },
        jquery: {
            exports: '$'
        }
    }
});

require(['app'], function(App) {
    App.init();
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