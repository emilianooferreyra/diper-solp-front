
function config($routeProvider, $ocLazyLoadProvider, usSpinnerConfigProvider, $locationProvider, ApisolpServiceProvider, $middlewareProvider, vcRecaptchaServiceProvider, jwtOptionsProvider, $httpProvider) {
    $locationProvider.html5Mode(true);
    $ocLazyLoadProvider.config({
        // Set to true if you want to see what and when is dynamically loaded
        debug: false
    });

    vcRecaptchaServiceProvider.setDefaults({
        key: '6LdwjXEUAAAAAAoMOuKtN7ozT2rrlDFIIrgt1JkX',
        theme: 'light',
    });

    jwtOptionsProvider.config({
        whiteListedDomains: ['localhost']
    });

    $httpProvider.interceptors.push('jwtInterceptor');

    usSpinnerConfigProvider.setDefaults({
        lines: 10 // The number of lines to draw
        ,
        length: 40 // The length of each line
        ,
        width: 20 // The line thickness
        ,
        radius: 49 // The radius of the inner circle
        ,
        scale: 0.35 // Scales overall size of the spinner
        ,
        corners: 1 // Corner roundness (0..1)
        ,
        color: '#1ab394'
        ,
        opacity: 0.3 // Opacity of the lines
        ,
        rotate: 5 // The rotation offset
        ,
        direction: 1 // 1: clockwise, -1: counterclockwise
        ,
        speed: 1 // Rounds per second
        ,
        trail: 63 // Afterglow percentage
        ,
        fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
        ,
        zIndex: 2e9 // The z-index (defaults to 2000000000)
        ,
        className: 'spinner' // The CSS class to assign to the spinner
        ,
        top: '50%' // Top position relative to parent
        ,
        left: '50%' // Left position relative to parent
        ,
        shadow: false // Whether to render a shadow
        ,
        hwaccel: false // Whether to use hardware acceleration
        ,
        position: 'fixed' // Element positioning
    });

    $routeProvider

            .when('/', {
                templateUrl: "views/home.html",
                controller: 'HomeController',
                controllerAs: 'vm'
            })

            .when('/autorizaciones', {
                templateUrl: "views/autorizaciones.html",
            })

            //Clasificados
            .when('/clasificados', {
                templateUrl: "views/clasificados/listado.html",
                controller: 'ClassifiedListController',
                controllerAs: 'vm',
                data: {
                  pageTitle: 'Clasificados'
                },
            })
            .when('/clasificados/:id', {
                templateUrl: "views/clasificados/ver.html",
                controller: 'ClassifiedViewController',
                controllerAs: 'vm',
                data: {pageTitle: 'Detalle de clasificado'}
            })

            //Productos
            .when('/productos', {
                templateUrl: "views/productos/listado.html",
                controller: 'ProductListController',
                controllerAs: 'vm',
                data: {
                  pageTitle: 'Productos'
                },

            })
            .when('/productos/:code', {
                templateUrl: "views/productos/ver.html",
                controller: 'ProductViewController',
                controllerAs: 'vm',
                data: {pageTitle: 'Detalle de producto'}
            })

            //Noticias
            .when('/noticias/:category?', {
                templateUrl: "views/noticias/listado.html",
                controller: 'ArticleListController',
                controllerAs: 'vm',
            })
            .when('/noticias/:category/:slug', {
                templateUrl: "views/noticias/ver.html",
                controller: 'ArticleViewController',
                controllerAs: 'vm',
            })

            //Eventos
            .when('/eventos/:category', {
                templateUrl: "views/eventos/listado.html",
                controller: 'EventListController',
                controllerAs: 'vm',
            })
            .when('/eventos/:category/:slug', {
                templateUrl: "views/eventos/ver.html",
                controller: 'EventViewController',
                controllerAs: 'vm',
            })

            //Estaticas
            //Area cultural
            .when('/boletin', {
                templateUrl: "views/area-cultural/boletin.html",
            })
            .when('/cultura/:item?', {
                templateUrl: "views/area-cultural/cultura.html",
                resolve: {
                  category: function() {return {category:'cultura'};}
                },
                controller: 'FacultadController',
                controllerAs: 'vm',

            })

            //Institución
            .when('/autoridades', {
                templateUrl: "views/institucion/autoridades.html",
            })
            .when('/nosotros', {
                templateUrl: "views/institucion/nosotros.html",
            })
            .when('/nuestras-instalaciones', {
                templateUrl: "views/institucion/nuestras-instalaciones.html",
            })
            .when('/relaciones-institucionales/:item?', {
                templateUrl: "views/institucion/relaciones-institucionales.html",
                resolve: {
                  category: function() {return {category:'relaciones-institucionales'};}
                },
                controller: "FacultadController"
            })

            //Gremial
            .when('/gestion-con-os', {
                templateUrl: "views/gremial/gestion-con-os.html",
            })
            .when('/convenios-con-os', {
                templateUrl: "views/gremial/convenios-con-os.html",
            })
            // .when('/gremial/:item?', {
            //     templateUrl: "views/gremial/novedades.html",
            //     controller: "FacultadController",
            //     resolve: {
            //       category: function() {return {category:'gremial'};}
            //     },
            // })
            .when('/gremial/novedades', {
                templateUrl: "views/gremial/novedades.html",
                // controller: "FacultadController",
                // resolve: {
                //   category: function() {return {category:'gremial'};}
                // },
            })

            //Educativa
            .when('/biblioteca/:item?', {
                templateUrl: "views/educativa/biblioteca.html",
                controller: "FacultadController",
                resolve: {
                  category: function() {return {category: 'biblioteca'};}
                },
            })
            .when('/facultad/:item?', {
                templateUrl: "views/educativa/facultad.html",
                resolve: {
                  category: function() {return {category:'facultad'};}
                },
                controller: "FacultadController"
            })
            .when('/escuela-graduados/:item?', {
                templateUrl: "views/educativa/escuela-graduados.html",
                controller: "CursoListController",
                controllerAs: 'vm',
                middleware: 'everyone'
            })
            .when('/escuela-graduados/cursos/:especialidad', {
                templateUrl: "views/educativa/escuela-graduados/listado-cursos.html",
                controller: "EspecialidadViewController",
                controllerAs: 'vm'
            })
            .when('/escuela-graduados/cursos/:especialidad/:numerodecurso', {
                templateUrl: "views/educativa/escuela-graduados/ver-curso.html",
                controller: "CursoViewController",
                controllerAs: 'vm',
                middleware: 'everyone'
            })
            .when('/guardia-odontologica/:item?', {
                templateUrl: "views/educativa/guardia-odontologica.html",
                controller: "FacultadController",
                resolve: {
                  category: function() {return false;}
                },
            })
            // .when('/revista', {
            //     templateUrl: "views/educativa/revista.html",
            // })
            .when('/revista-cientifica/:item?', {
                templateUrl: "views/educativa/revista.html",
                controller: "RevistaController",
                resolve: {
                  category: function() {return false;}
                },
            })
            .when('/revista-cientifica/revistas-anteriores/:id?', {
                templateUrl: "views/educativa/revista.html",
                controller: "RevistaViewController",
                resolve: {
                  category: function() {return false;}
                },
            })
            .when('/revista-cientifica/:revista_id/:articulo_id?', {
                templateUrl: "views/educativa/revista.html",
                controller: "RevistaArticuloViewController",
                resolve: {
                  category: function() {return false;}
                },
            })
            // .when('/escuela-graduados/eventos', {
            //     templateUrl: "views/educativa/eventos-graduados.html",
            //     resolve: {
            //       $routeParams: function() {return {category:'graduados'};}
            //     },
            //     controller: 'EventListController',
            //     controllerAs: 'vm',
            //
            // })

            //socios
            .when('/beneficio-de-ser-socio', {
                templateUrl: "views/socios/beneficio-de-ser-socio.html",
            })
            .when('/categoria-de-socios', {
                templateUrl: "views/socios/categoria-de-socios.html",
            })
            .when('/info-recien-graduado', {
                templateUrl: "views/socios/info-recien-graduado.html",
            })
            .when('/requisitos-de-inscripcion', {
                templateUrl: "views/socios/requisitos-de-inscripcion.html",
            })
            .when('/socios-en-la-provincia/:item?', {
                templateUrl: "views/socios/socios-en-la-provincia.html",

                    controller: "FacultadController",
                    resolve: {
                      category: function() {return {category:'gremial'};}
                    },

                // controller: function($scope, $routeParams) {
                //   $scope.tab = 'inicio';
                //   if(!angular.isUndefined($routeParams.item)){
                //     $scope.tab = $routeParams.item;
                //   }
                //   $scope.changeTab = function(type) {
                //     $scope.tab = type
                //   }
                // },
            })
            .when('/socios-online', {
                templateUrl: "views/socios/socios-online.html",
            })

            .when('/accion-solidaria', {
                templateUrl: "views/accion-solidaria.html",
            })
            .when('/contacto', {
                templateUrl: "views/contacto.html",
            })
            .when('/coworking', {
                templateUrl: "views/socios/coworking.html",
            })
            .when('/comision-joven/:item?', {
                templateUrl: "views/socios/comision-joven.html",
                resolve: {
                  category: function() {return {category:'comision-joven'};}
                },
                controller: 'FacultadController',
                controllerAs: 'vm',

            })
            .when('/comision-vitalicios/:item?', {
                templateUrl: "views/socios/comision-vitalicios.html",
                resolve: {
                  category: function() {return {category:'comision-vitalicios'};}
                },
                  controller: 'FacultadController',
                controllerAs: 'vm',

            })

            .when('/guardia', {
                templateUrl: "views/guardia.html",
            })

            .when('/mutual/:item?', {
                templateUrl: "views/mutual.html",
                controller: "FacultadController",
                resolve: {
                  category: function() {return false;}
                },
            })
            .when('/ides/:item?', {
                templateUrl: "views/ides.html",
                controller: "FacultadController",
                resolve: {
                  category: function() {return false;}
                },
            })

            .otherwise({
                redirectTo: '/'
            });

            $auth = ApisolpServiceProvider.$get('ApisolpService');

            $middlewareProvider.map({
               /** Let everyone through */
               'everyone': ['$cookieStore', '$rootScope', '$http', 'jwtHelper', 'usSpinnerService', function everyoneMiddleware($cookieStore, $rootScope, $http, jwtHelper, usSpinnerService) {
                  usSpinnerService.spin('spinner');
                   $rootScope.apisolp = $cookieStore.get('apisolp') || {};
                   if (!!$rootScope.apisolp.currentUser && (!jwtHelper.isTokenExpired($rootScope.apisolp.currentUser.token))) {
                     $http.defaults.headers.common['Authorization'] = 'Bearer ' + $rootScope.apisolp.currentUser.token; // jshint ignore:line
                     this.next();
                   } else {
                        $auth.Login({}, function(response) {
                         usSpinnerService.stop('spinner');
                           if (!!response.token) {
                               $auth.SetCredentials(response.token);
                               this.next();
                           }
                       }.bind(this));
                   }

               }],
            });

            // $middlewareProvider.global('everyone');

}

angular
        .module('solp')
        .config(config)
        .run(run);

function run($rootScope, $anchorScroll) {
    $rootScope.url = 'http://solp-admin.diper-it.com/api';
    $rootScope.url_uploads = 'http://solp-admin.diper-it.com/api/uploads';

    $rootScope.$on('$routeChangeSuccess', function (e, current, pre) {
        $anchorScroll('inicio');
        $rootScope.actualUrl = current.$$route.originalPath;
    });
};
