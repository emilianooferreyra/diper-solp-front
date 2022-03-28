(function (window, angular) {
    angular.module('solp-factories', [])

    .factory('solpApi', SolpFactory);

    SolpFactory.$inject = ['$resource', '$location', '$rootScope', '$injector'];

    function SolpFactory($resource, $location, $rootScope, $injector) {
      return function ($url) {
        var token = 'Bearer ' + $rootScope.apisolp.currentUser.token;
          $url = 'http://apirest.solp.org.ar/api/v1/:type';

          return $resource($url, {
              type: ''
          }, {
              cursos: {
                  url: $url,
                  method: 'GET',
                  headers: {
                      'Authorization': token,
                  },
                  transformResponse: function (data) {
                      if (data) {
                          var json = JSON.parse(data);
                          return angular.fromJson(json);
                      }
                  },
                  interceptor: {
                      responseError: handError
                  }
              },
              findCurso: {
                url: $url + "/:numero",
                method: 'GET',
                headers: {
                    'Authorization': token,
                },
                transformResponse: function (data) {
                    if (data) {
                        var json = JSON.parse(data);
                        return angular.fromJson(json);
                    }
                },
                interceptor: {
                    responseError: handError
                }
              },
              docentes: {
                  url: $url + "/docentes/:numero",
                  method: 'GET',
                  headers: {
                      'Authorization': token,
                  },
                  transformResponse: function (data) {
                      if (data) {
                          var json = JSON.parse(data);
                          return angular.fromJson(json);
                      }
                  },
                  interceptor: {
                      responseError: handError
                  }
              },
          });
      }


        function handError(e) {
            params = JSON.stringify(e.data) || " "
            if (!!e.data) {
                if (e.data.code == "E_VALIDATION") {
                    params = validationErrors(e.data);
                }
                if (e.data.code == "E_INTERNAL_SERVER_ERROR" && (e.data.message == "jwt expired" || e.data.message == "invalid signature")) {
                    $location.path('login');
                }
            }
        }

        function validationErrors(data) {
            var data = data.data;
            var returntext = "";
            for (d in data) {
                for (r in data[d]) {
                    returntext = "<b>SERVER VALIDATIONS: </b> <br><p>Rule: " + data[d][r].rule + " <br>Message: " + data[d][r].message + " </p>";
                }
            }

            return returntext
        }
    };
})(window, window.angular);


///fdfasdf@dfdf.c
