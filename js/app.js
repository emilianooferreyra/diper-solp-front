/**
 * INSPINIA - Responsive Admin Theme
 *
 */
(function (window, angular) {
    angular.module('solp', [
        'ngRoute',                      //Routing
        'oc.lazyLoad',                  // ocLazyLoad
        'controllers',                  //Controllers
        "ngCookies",
        //"store-factories"
        "ngMessages",
        "ngResource",
        // "store-directives",
        "bw.paging",
        "selectize",
        "angularSpinner",
        "Alertify",
        "ui.calendar",
        "ngFileUpload",
        "ngRoute.middleware",
        "apisolp-service",
        "vcRecaptcha",
        "angular-jwt"
        // 'model-factories'
    ])
})(window, window.angular);
