/**
 * Created by 40in on 16.10.14.
 */
define(['marionette'], function(Marionette) {

    var UserView = Marionette.ItemView.extend({

        template: '#user'

    });

    return UserView;

});