angular.module('solp')
.directive("noticiasSlider", function($rootScope) {
    return {
        restrict: "E",
        templateUrl: "views/noticias-slider.html",
        controller: function($scope, rest, $window, modelFactory, $filter, $sce) {
          //Variables
          var ns = this;
          ns.module = 'articles';
          ns.paginate = {
              page: 1,
              skip: 0,
              limit: 8,
              orderBy: 'date',
              populate: ['front', 'category'].join(),
              conditions: 'starred=true'
          };
          ns.owlOptionsTestimonials = {
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
          ns.cutText = cutText;

          function loadModel(skip) {
              var skip_pg = skip || ns.paginate.skip;
              var condition = '';

              condition = setCond(condition, skip_pg);

              rest().get({
                  type: ns.module,
                  params: condition
              }, function (resp) {
                  ns.data = resp;

                  angular.forEach(ns.data, function(element) {
                    element.date = element.date ? moment(element.date).utc().toISOString().slice(0, 10) : null;
                  });
              }, function (error) {
                ns.data = [];
              });
          };

          function setCond(cond, skip_pg) {
            if(!!ns.paginate.orderBy) {
              cond += 'orderBy=' + ns.paginate.orderBy + '&';
            } else {
              cond += 'orderBy=createdAt&';
            }

            cond += 'sort=-1&';

            if(!!ns.paginate.populate) {
              cond += 'populate=' + ns.paginate.populate + '&';
            }

            cond += 'skip=' + skip_pg + '&';

            if(!!ns.paginate.limit) {
              cond += 'limit=' + ns.paginate.limit;
            }

            if(!!ns.paginate.conditions) {
              cond += '&' + ns.paginate.conditions;
            }

            return cond;
          }

          loadModel();
// console.log($scope);
          function cutText(txt, limit) {
            var l_txt = txt.length;
            txt = $filter('limitTo')(txt, limit, 0);
            if((limit > 76 || limit > 185) && (l_txt > 76 || l_txt >185)) {
              txt += '[...]';
            }

            return $sce.trustAsHtml(txt);
          }
        },
        controllerAs: "ns"
    };
});
