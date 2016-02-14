/**
 * Created by Lenovo1 on 07/02/16.
 */

var app = angular.module('contactsApp', ['ngRoute' , 'ngSanitize']);

app.config(['$routeProvider',
    function($routeProvider) {
        //$log.debug('$routeProvider');

        $routeProvider.
            when('/contacts', {
                templateUrl: 'templates/contacts.html',
                controller: 'contactsCtrl',
                resolve: {
                    contactsData: function (dataService) {
                        return dataService.get();
                    }
                }
            }).
            when('/contacts/:ID?', {
                templateUrl: 'templates/edit.html',
                controller: 'contactCtrl',
                resolve: {
                    contactData: function ($route , dataService) {
                        var id = $route.current.params.ID;
                        return dataService.getById(id);
                    }
                }
            }).otherwise({
                redirectTo: '/contacts'
            });
    }]);

