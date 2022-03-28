(function(window, angular) {
  angular
        .module('cursoController', ['solp-factories', 'model-factories', 'cursos-constant'])
        .controller('CursoListController', CursoListController)
        .controller('EspecialidadViewController', EspecialidadViewController)
        .controller('CursoViewController', CursoViewController);

  function CursoListController($scope, solpApi, $window, usSpinnerService, modelFactory, $routeParams, $sce, rest, CURSOS, $anchorScroll, $location) {
      usSpinnerService.spin('spinner');
      $scope.tab = 'inicio'
      $scope.changeTab = function(type) {
        $scope.tab = type
      }
      //Variables
      var vm = this;
      vm.module = 'curso';
      vm.slides = [];

      var tipocurso = {};

      if(!angular.isUndefined($routeParams.item)){
        if($routeParams.item == 'novedades') {
          usSpinnerService.stop('spinner');

          rest().get({
            type: 'categories',
            params: 'slug=graduados'
          }, function(resp) {
            if(!!resp) {
              rest().get({
                type: 'boxes',
                params: 'category='+resp[0]._id+'&orderBy=order&populate=image,images&visible=true'
              }, function(resp) {
                // console.log(resp);
                $scope.secciones = resp;
              });

              rest().get({
                  type: 'events',
                  params: 'category='+resp[0]._id+'&orderBy=start&sort=-1&limit=3&populate=front,category&published=true'
              }, function (resp) {
                  $scope.eventos = resp;

                  angular.forEach($scope.eventos, function(element) {
                    if(!!element.start) {
                      element.start = element.start ? moment(element.start).utc().toISOString().slice(0, 10) : null;
                    }
                    if(!!element.end) {
                      element.end = element.end ? moment(element.end).utc().toISOString().slice(0, 10) : null;
                    }
                  });

              }, function (error) {
                  $scope.eventos = [];
              });

              $scope.owlOptionsTestimonials = {
                  loop:false,
                  margin:20,
                  dots:false,
                  nav:true,
                  navText:['<i class="fa fa-chevron-left"></i>','<i class="fa fa-chevron-right"></i>'],
                  //navText:["Ver noticias anteriores","Ver más noticias"],
                  responsive:{
                      0:{
                          items:1
                      },
                      600:{
                          items:2
                      },
                      1000:{
                          items:4
                      }
                  }
                };
            }
          });
        } else {
          if($routeParams.item == 'cursos') {
            loadModel();
          }
          $scope.tab = $routeParams.item;
          usSpinnerService.stop('spinner');
          $anchorScroll('breadcrumb');
        }
      } else {
        usSpinnerService.stop('spinner');
        $location.url('escuela-graduados/cursos');
      }

      //Busca los slides
      rest().get({
          type: 'slides'
      }, function (resp) {
          vm.slides = resp;

          vm.owlCarouselOptions = {
            loop:false,
            autoplay:true,
            page:true,
            responsive:{
                0:{
                    items:1
                }
            }
          }

          vm.getHtml = function(html) {
              return $sce.trustAsHtml(html);
          };

      }, function (error) {
      });

      //Functions

      function loadModel(skip) {
          if(!!sessionStorage.getItem('cursos')) {
            vm.especilidades = JSON.parse(sessionStorage.getItem('cursos'));
            usSpinnerService.stop('spinner');
          } else {
            solpApi().cursos({
                type: vm.module
            }, function (resp) {
                vm.data = resp;

                angular.forEach(resp.data, function(element) {
                  if(!tipocurso[element.especialidad]) {
                    tipocurso[element.especialidad] = [];
                  }
                  tipocurso[element.especialidad].push(element);
                });

                angular.forEach(CURSOS, function(curso) {
                  curso.cursos = tipocurso[curso.id];
                  sessionStorage.setItem('cursos', JSON.stringify(CURSOS));
                });
                vm.especilidades = CURSOS;
                usSpinnerService.stop('spinner');
            }, function (error) {
                vm.data = [];
                usSpinnerService.stop('spinner');
            });
          }
      };
  }
  ;

  function EspecialidadViewController($scope, $routeParams, rest, $location, usSpinnerService, modelFactory, $sce, CURSOS) {
      usSpinnerService.spin('spinner');
      //Variables
      var vm = this;
      vm.module = 'curso';
      vm.especialidad = {};

      //Busca los slides
      rest().get({
          type: 'slides'
      }, function (resp) {
          vm.slides = resp;

          vm.owlCarouselOptions = {
            loop:false,
            autoplay:true,
            page:true,
            responsive:{
                0:{
                    items:1
                }
            }
          }

          vm.getHtml = function(html) {
              return $sce.trustAsHtml(html);
          };

      }, function (error) {
      });

      //Functions

      loadModel();

      function loadModel() {
        if(!!sessionStorage.getItem('cursos')) {
          vm.especialidades = JSON.parse(sessionStorage.getItem('cursos'));
          vm.especialidad = vm.especialidades[$routeParams.especialidad];
          usSpinnerService.stop('spinner');
        } else {
        }
      };

      vm.getHtml = function(html) {
          return $sce.trustAsHtml(html);
      };
  }
  ;

  function CursoViewController($scope, $routeParams, rest, $location, usSpinnerService, modelFactory, $sce, CURSOS, solpApi) {
      usSpinnerService.spin('spinner');
      //Variables
      var vm = this;
      vm.module = 'curso';
      vm.especialidad = {};

      //Busca los slides
      rest().get({
          type: 'slides'
      }, function (resp) {
          vm.slides = resp;

          vm.owlCarouselOptions = {
            loop:false,
            autoplay:true,
            page:true,
            responsive:{
                0:{
                    items:1
                }
            }
          }

          vm.getHtml = function(html) {
              return $sce.trustAsHtml(html);
          };

      }, function (error) {
      });

      //Functions

      loadModel();

      function loadModel() {
        if(!!sessionStorage.getItem('cursos')) {
          vm.especialidades = JSON.parse(sessionStorage.getItem('cursos'));
          vm.especialidad = vm.especialidades[$routeParams.especialidad];
        } else {
        }

        solpApi().findCurso({
            type: vm.module,
            numero: $routeParams.numerodecurso
        }, function (resp) {
            vm.info = resp.data[0];

            solpApi().docentes({
                type: vm.module,
                numero: $routeParams.numerodecurso
            }, function (resp) {
                vm.info.docentes = resp.data;
                vm.info.dictantes = [];

                for(var i=0;i<vm.info.docentes.length;i++) {
                  if(vm.info.docentes[i].CATEGORIA.trim() == 'DICTANTE') {
                    console.log(vm.info.docentes[i]);
                    vm.info.dictantes.push(vm.info.docentes[i]);
                    vm.info.docentes.splice(i, 1);
                    i--;
                  }
                }
                // angular.forEach(vm.info.docentes, function(element, key) {
                //   console.log(element.CATEGORIA);
                //   if(element.CATEGORIA.trim() == 'DICTANTE') {
                //     console.log(element);
                //     vm.info.dictantes.push(element);
                //     vm.info.docentes.splice(key, 1);
                //   }
                // });

                usSpinnerService.stop('spinner');
            }, function (error) {
                vm.data = [];
                usSpinnerService.stop('spinner');
            });

            usSpinnerService.stop('spinner');
        }, function (error) {
            vm.info = {};
            usSpinnerService.stop('spinner');
        });
      };

      vm.getHtml = function(html) {
          return $sce.trustAsHtml(html);
      };

      vm.getImage = function(data){
          return 'data:image/jpeg;base64, ' + data;
      }
  }
  ;
})(window, window.angular);
