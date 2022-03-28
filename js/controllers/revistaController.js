(function(window, angular) {
  angular
        .module('revistaController', [])
        .controller('RevistaController', RevistaController)
        .controller('RevistaViewController', RevistaViewController)
        .controller('RevistaArticuloViewController', RevistaArticuloViewController);

  function RevistaController($scope, $routeParams, $anchorScroll, rest, $sce, category) {
    $scope.tab = 'inicio';
    $scope.secciones = [];
    $scope.info = {}
    $scope.magazines = [];

    if(!angular.isUndefined($routeParams.item)){

      if($routeParams.item == "revista-en-curso") {
        rest().get({
          type: 'magazines',
          params: 'orderBy=number&sort=-1&populate=pdf,image&limit=1'
        }, function(resp) {
          $scope.info = resp[0];
          rest().get({
            type: 'magazinearticles',
            params: 'orderBy=index&sort=1&populate=pdf,image&magazine=' + $scope.info._id
          }, function(magazinearticles) {
            $scope.info.magazinearticles = magazinearticles
          })
        });
      } else if($routeParams.item == "revistas-anteriores") {
        rest().get({
          type: 'magazines',
          params: 'orderBy=number&sort=-1&populate=pdf,image'
        }, function(resp) {
          $scope.magazines = resp;
          $scope.magazines.splice(0,1);
        });
      }

      $scope.currentYear = moment().format('YYYY');

      $scope.tab = $routeParams.item;
      $anchorScroll('breadcrumb');

    } else {
      if(!angular.isUndefined(category) && !!category && $.inArray(category.category, ['relaciones-institucionales']) !== -1) {
        loadBoxes();
      }
    }

    $scope.changeTab = function(type) {
      $scope.tab = type
    }

    $scope.getHtml = function(html) {
        return $sce.trustAsHtml(html);
    };
    $scope.getUrl = function(url) {
        url = url.replace("watch?v=", "embed/");
        return $sce.trustAsResourceUrl(url);
    };

    function loadBoxes() {
      rest().get({
        type: 'categories',
        params: 'slug=' + category.category
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
            loop:true,
            dots:false,
            nav:true,
            navText:['<i class="fa fa-chevron-left"></i>','<i class="fa fa-chevron-right"></i>'],
            responsive:{
                0:{
                    items:1
                }
            }
            };
        }
      });
    }

  }
  ;

  function RevistaViewController($scope, $routeParams, $anchorScroll, rest, $sce, category) {
    $scope.tab = 'inicio';
    $scope.info = {}

    if(!angular.isUndefined($routeParams.id)){

      rest().findOne({
        type: 'magazines',
        id: $routeParams.id,
        params: 'populate=pdf,image'
      }, function(resp) {
        $scope.info = resp;
        rest().get({
          type: 'magazinearticles',
          params: 'orderBy=index&sort=1&populate=pdf,image&magazine=' + resp._id
        }, function(magazinearticles) {
          $scope.info.magazinearticles = magazinearticles
        })
      });

      $scope.currentYear = moment().format('YYYY');

      $scope.tab = 'revista-en-curso';
      $anchorScroll('breadcrumb');

    }

    $scope.changeTab = function(type) {
      $scope.tab = type
    }

    $scope.getHtml = function(html) {
        return $sce.trustAsHtml(html);
    };
    $scope.getUrl = function(url) {
        url = url.replace("watch?v=", "embed/");
        return $sce.trustAsResourceUrl(url);
    };

  }
  ;

  function RevistaArticuloViewController($scope, $routeParams, $anchorScroll, rest, $sce, category) {
    $scope.tab = 'inicio';
    $scope.info = {}

    if(!angular.isUndefined($routeParams.articulo_id)){

      rest().findOne({
        type: 'magazinearticles',
        id: $routeParams.articulo_id,
        params: 'populate=pdf,image'
      }, function(resp) {
        $scope.info = resp;
      });

      $scope.currentYear = moment().format('YYYY');

      $scope.tab = 'articulo-revista';
      $anchorScroll('breadcrumb');

    }

    $scope.changeTab = function(type) {
      $scope.tab = type
    }

    $scope.getHtml = function(html) {
        return $sce.trustAsHtml(html);
    };
    $scope.getUrl = function(url) {
        url = url.replace("watch?v=", "embed/");
        return $sce.trustAsResourceUrl(url);
    };

  }
  ;

})(window, window.angular);
