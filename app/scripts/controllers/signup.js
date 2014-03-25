angular.module('meanTrialApp').controller('SignupCtrl', function ($scope, Auth, $location) {
    $scope.user = {};
    $scope.errors = {};

    $scope.register = function (form) {
        $scope.submitted = true;

        if (form.$valid) {
            Auth.createUser({
                name: $scope.user.name,
                email: $scope.user.email,
                password: $scope.user.password
            }).then(function () {
                $location.path('/');
            }).catch(function (err) {
                err = err.data;
                $scope.errors = {};

                angular.forEach(err.errors, function (error, field) {
                    form[field].$setValidity('mongoose', false);
                    $scope.errors[field] = error.message;
                });
            });
        }
    };
});
