angular.module('solp')
.directive("listadoEventos", function($rootScope, rest) {
    return {
        restrict: "E",
        templateUrl: "views/eventos/listado.html",
        link: function(scope, element, attrs) {
          scope.data = attrs.info;
        }
    };
});
