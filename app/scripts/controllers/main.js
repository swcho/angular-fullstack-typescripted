angular.module('meanTrialApp').controller('MainCtrl', function ($scope, $http) {
    $http.get('/api/awesomeThings').success(function (awesomeThings) {
        console.log(awesomeThings);
        $scope.awesomeThings = awesomeThings;
    });
});
