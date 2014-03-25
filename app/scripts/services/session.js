angular.module('meanTrialApp').factory('Session', function ($resource) {
    return $resource('/api/session/');
});
