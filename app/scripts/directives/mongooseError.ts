
/// <reference path="../../../typings/angularjs/angular.d.ts" />

angular.module('meanTrialApp')

/**
 * Removes server error when user updates input
 */
    .directive('mongooseError', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, element, attrs, ngModel) {
                element.on('keydown', function() {
                    return ngModel.$setValidity('mongoose', true);
                });
            }
        };
    });
