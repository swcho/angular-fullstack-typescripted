
/// <reference path="../../../typings/angularjs/angular.d.ts" />

angular.module('meanTrialApp')
    .factory('Session', function ($resource) {
        return $resource('/api/session/');
    });
