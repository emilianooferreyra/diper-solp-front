(function(window, angular) {
    angular.module('apisolp-service', [])

    .provider('ApisolpServiceProvider', function() {
        this.$get = function(ApisolpService) {
            return ApisolpService;
        };
    })

    .factory('ApisolpService', ApisolpService);

    ApisolpService.$inject = ['$http', '$cookieStore', '$rootScope'];

    function ApisolpService($http, $cookieStore, $rootScope) {
        var service = {};

        service.Login = Login;
        service.SetCredentials = SetCredentials;
        service.ClearCredentials = ClearCredentials;
        return service;

        function Login(data, callback) {
            /* Use this for real authenticationa
             ----------------------------------------------*/
            $http.post('http://apirest.solp.org.ar/api/login_check', {
                    '_username': 'websolp',
                    '_password': 'websolp.1234'
                }, {
            'Content-Type': 'application/json; charset=UTF-8'
        })
                .success(function(response) {
                    callback(response);
                })
                .error(function(response) {
                    response.message = 'El usuario y/o la contraseña son inválidos.';

                    callback(response);
                });

        }

        function SetCredentials(token) {
            $rootScope.apisolp.currentUser = {
                token: token
            };

            $http.defaults.headers.common['authorization'] = token;
            $cookieStore.put('apisolp', $rootScope.apisolp);
        }

        function ClearCredentials() {
            $rootScope.apisolp = {};
            $cookieStore.remove('apisolp');
            //$http.defaults.headers.common.Authorization = 'Basic';
            $http.defaults.headers.common['authorization'] = '';
        }
    }


})(window, window.angular);
