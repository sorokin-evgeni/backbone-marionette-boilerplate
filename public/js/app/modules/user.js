/**
 * Created by 40in on 08.10.14.
 */
define(['app', 'jquery', 'underscore'], function(App, $, _) {
    var User = {
        init: function() {
            console.log('user module imported');
        }
    };
    console.log('user module initialized');


    $('body').append(App.parseTemplate('users', {users: [{name: 'John'}, {name: 'Tom'}]}));

    return User;
});