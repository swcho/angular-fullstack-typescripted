/// <reference path="../../../typings/angularjs/angular.d.ts" />
angular.module('meanTrialApp').controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [
        {
            'title': 'Home',
            'link': '/'
        }, {
            'title': 'Settings',
            'link': '/settings'
        }];

    $scope.logout = function () {
        Auth.logout().then(function () {
            $location.path('/login');
        });
    };

    $scope.isActive = function (route) {
        return route === $location.path();
    };
});
//# sourceMappingURL=navbar.js.map
