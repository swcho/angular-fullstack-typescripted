
/// <reference path="../../../typings/angularjs/angular.d.ts" />

angular.module('meanTrialApp')
    .factory('User', function ($resource) {
        return $resource('/api/users/:id', {
            id: '@id'
        }, { //parameters default
            update: {
                method: 'PUT',
                params: {}
            },
            get: {
                method: 'GET',
                params: {
                    id:'me'
                }
            }
        });
    });

