(function (window, angular) {
    angular.module('store-factories', [])

    .factory('rest', RestFactory);

    RestFactory.$inject = ['$resource', '$location', '$rootScope', '$injector'];

    function RestFactory($resource, $location, $rootScope, $injector) {
      return function ($url) {
          $url = ($url == null) ? $rootScope.url + '/:type' : $url;

          return $resource($url, {
              type: ''
          }, {
              count: {
                  url: $url + "/count?:params",
                  method: 'GET',
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
              get: {
                  url: $url + "?:params",
                  method: 'GET',
                  transformResponse: function (data) {
                      return angular.fromJson(data);
                  },
                  isArray: true,
                  interceptor: {
                      responseError: handError
                  }
              },
              findOne: {
                  url: $url + "/:id?:params",
                  method: 'GET',
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
