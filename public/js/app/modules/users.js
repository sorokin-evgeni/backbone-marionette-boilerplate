/**
 * Created by 40in on 08.10.14.
 */
define(['app', 'marionette', 'js/app/routing-module', 'view/user-view'], function(app, Marionette, RoutingModule, UserView) {

    var UsersModule = RoutingModule.extend({

        startWithParent: false,

        routesList: {
            'users': 'listAction'
        },

        initialize: function() {
            RoutingModule.prototype.initialize.apply(this, arguments);
            console.log('UsersModule initialize');
        },

        onStart: function() {
            console.log('UsersModule start');
        },

        onStop: function() {
            console.log('Users Module stop');
        },

        listAction: function() {
            console.log('listAction');
            var userView = new UserView();
            app.content(userView.render());
        }

    });

    return app.module('users', UsersModule);

});