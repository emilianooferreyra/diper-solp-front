(function(window, angular) {
  angular
        .module('facultadController', [])
        .controller('FacultadController', FacultadController);

  function FacultadController($scope, $routeParams, $anchorScroll, rest, $sce, category) {
    $scope.tab = 'inicio';
    $scope.secciones = [];

    if(!angular.isUndefined($routeParams.item)){
      if($.inArray($routeParams.item, ['novedades', 'actividades']) !== -1) {
        loadBoxes();
      }
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

})(window, window.angular);
