angular.module('solp')
.directive("productosSlider", function($rootScope) {
    return {
        restrict: "E",
        templateUrl: "views/productos-slider.html",
        controller: function($scope, rest, $window, modelFactory, $filter, $sce) {
          //Variables
          var ps = this;
          ps.module = 'products';
          ps.paginate = {
              page: 1,
              skip: 0,
              limit: 8,
              orderBy: 'updatedAt',
              populate: ['front'].join(),
              conditions: 'visible=true&starred=true'
          };
          ps.owlOptionsTestimonials = {
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

          //Functions
          ps.cutText = cutText;

          function loadModel(skip) {
              var skip_pg = skip || ps.paginate.skip;
              var condition = '';

              condition = setCond(condition, skip_pg);

              rest().get({
                  type: ps.module,
                  params: condition
              }, function (resp) {
                  ps.data = resp;
              }, function (error) {
                  ps.data = [];
              });
          };

          function setCond(cond, skip_pg) {
            if(!!ps.paginate.orderBy) {
              cond += 'orderBy=' + ps.paginate.orderBy + '&';
            } else {
              cond += 'orderBy=createdAt&';
            }

            cond += 'sort=-1&';

            if(!!ps.paginate.populate) {
              cond += 'populate=' + ps.paginate.populate + '&';
            }

            cond += 'skip=' + skip_pg + '&';

            if(!!ps.paginate.limit) {
              cond += 'limit=' + ps.paginate.limit;
            }

            if(!!ps.paginate.conditions) {
              cond += '&' + ps.paginate.conditions;
            }

            return cond;
          }

          loadModel();

          function cutText(txt, limit) {
            txt = $filter('limitTo')(txt, limit, 0);
            if(limit > 76 || limit > 185) {
              txt += '[...]';
            }

            return $sce.trustAsHtml(txt);
          }
        },
        controllerAs: "ps"
    };
});
