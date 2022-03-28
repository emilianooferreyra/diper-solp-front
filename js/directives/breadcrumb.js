angular.module('solp')
.directive("breadcrumb", function($rootScope) {
    return {
        restrict: "E",
        templateUrl: "views/breadcrumb.html",
        controller: function($scope) {

        },
        link: function(scope, element, attrs) {
          scope.namemodule = attrs.namemodule;
          scope.pagename = attrs.pagename;
        }
    };
});
