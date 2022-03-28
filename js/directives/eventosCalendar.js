angular.module('solp')
.directive("eventosCalendar", function($rootScope, rest) {
    return {
        restrict: "E",
        templateUrl: "views/eventos-calendar.html",
        controller: function($scope) {
          var ec = this;
          ec.events = [];
          ec.today = moment().format('YYYY-MM-DD');

          ec.module = 'events';
          ec.paginate = {
              page: 1,
              skip: 0,
              limit: 99999,
              countTotal: 0,//countPaginateService || 0,
              orderBy: 'start',
              populate: 'category',
              conditions: 'calendar=true'
          };

          //Functions
          function loadModel(skip) {
              var skip_pg = skip || ec.paginate.skip;
              var condition = '';

              condition = setCond(condition, skip_pg);

              rest().get({
                  type: ec.module,
                  params: condition
              }, function (resp) {
                // console.log(resp);
                  ec.data = resp;

                  var thisYear = moment().year();

                  angular.forEach(ec.data, function(element) {
                    if(!!element.start && moment(element.start).format('YYYY') == thisYear) {

                      if(!!element.start) {
                        element.start = element.start ? moment(element.start).utc().toISOString().slice(0, 10) : null;
                      }
                      if(!!element.end) {
                        element.end = element.end ? moment(element.end).add('d', 1).utc().toISOString().slice(0, 10) : null;
                      }

                      var event = {
                        title: element.title,
                        start: element.start,
                        end: element.end,
                        className: element.category.color,
                        url: '/eventos/' + element.category.slug + '/' + element.slug
                      }

                      ec.events.push(event);
                    }
                  });

              });
          };

          function setCond(cond, skip_pg) {
            if(!!ec.paginate.orderBy) {
              cond += 'orderBy=' + ec.paginate.orderBy + '&';
            } else {
              cond += 'orderBy=createdAt&';
            }

            cond += 'sort=-1&';

            if(!!ec.paginate.populate) {
              cond += 'populate=' + ec.paginate.populate + '&';
            }

            cond += 'skip=' + skip_pg + '&';

            if(!!ec.paginate.limit) {
              cond += 'limit=' + ec.paginate.limit;
            }

            if(!!ec.paginate.conditions) {
              cond += '&' + ec.paginate.conditions;
            }

            return cond;
          }

          loadModel();
          ec.uiConfig = {
            calendar:{
              height: "100%",
              defaultDate: ec.today,
              lang: 'es',
              buttonText: {
                today:'Hoy'
              },
              events: ec.events
            }
          };
        },
        controllerAs: "ec"
    };
});
