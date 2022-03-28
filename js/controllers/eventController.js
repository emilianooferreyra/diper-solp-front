(function(window, angular) {
  angular
        .module('eventController', ['store-factories', 'model-factories'])
        .controller('EventListController', EventListController)
        .controller('EventViewController', EventViewController);

  function EventListController($scope, rest, $window, usSpinnerService, modelFactory, $routeParams) {
      usSpinnerService.spin('spinner');
      //Variables
      var vm = this;
      vm.module = 'events';
      vm.paginate = {
          page: 1,
          skip: 0,
          limit: 15,
          countTotal: 0,//countPaginateService || 0,
          orderBy: 'start',
          populate: 'front',//'medicalcenter',
          conditions: 'published=true'
      };

      vm.category_associated_disabled = false;
      if(!angular.isUndefined($routeParams.category)) {
          vm.category = $routeParams.category;
          rest().get({
            type: 'categories',
            params: 'slug=' + $routeParams.category
          }, function(resp) {
            // console.log(resp);
            if(!!resp) {
              vm.paginate.conditions = 'category=' + resp[0]._id;
              loadModel();
            }
          });
          vm.category_associated_disabled = true;
      }

      //Define filtersView directive
      vm.filtersView = {
        model: vm.module,
        input: [{
          name: 'Título', //placeholder filter
          model: vm.module, //model filter, usually same model
          key: 'title', //attribute on model filter
          type: 'text',
          like: true
        }],
        dropdown: [
        //   {
        //   name: 'Centro Médico', //placeholder filter
        //   model: vm.module,
        //   key: 'medicalcenter',
        //   associatedModel: 'medicalcenters', //associatedModel filter
        //   associatedKey: 'name', //attribute on associatedModel filter
        //   multiple:  false//filter with multiple associatedModel
        // }
      ]
      };

      //Functions
      vm.delete = modelFactory.deleteLogical;
      vm.paging = pagingFunction;

      //get countTotal for paginate
      modelFactory.count(vm.module, setCount);

      function loadModel(skip) {
          var skip_pg = skip || vm.paginate.skip;
          var condition = '';

          condition = setCond(condition, skip_pg);

          rest().get({
              type: vm.module,
              params: condition
          }, function (resp) {
              vm.data = resp;

              angular.forEach(vm.data, function(element) {
                if(!!element.start) {
                  element.start = element.start ? moment(element.start).utc().toISOString().slice(0, 10) : null;
                }
                if(!!element.end) {
                  element.end = element.end ? moment(element.end).utc().toISOString().slice(0, 10) : null;
                }
              });

              usSpinnerService.stop('spinner');
          }, function (error) {
              vm.data = [];
              usSpinnerService.stop('spinner');
          });
      };

      function pagingFunction(event, page, pageSize, total) {
          var skip = (page - 1) * vm.paginate.limit;
          vm.paginate.page = page;
          loadModel(skip);
      };

      function setCount(count) {
        vm.paginate.countTotal = count;
      };

      function setCond(cond, skip_pg) {
        if(!!vm.paginate.orderBy) {
          cond += 'orderBy=' + vm.paginate.orderBy + '&';
        } else {
          cond += 'orderBy=createdAt&';
        }

        cond += 'sort=-1&';

        if(!!vm.paginate.populate) {
          cond += 'populate=' + vm.paginate.populate + '&';
        }

        cond += 'skip=' + skip_pg + '&';

        if(!!vm.paginate.limit) {
          cond += 'limit=' + vm.paginate.limit;
        }

        if(!!vm.paginate.conditions) {
          cond += '&' + vm.paginate.conditions;
        }

        return cond;
      }
  }
  ;

  function EventViewController($scope, $routeParams, rest, $location, usSpinnerService, modelFactory, $sce) {
      usSpinnerService.spin('spinner');
      //Variables
      var vm = this;
      vm.module = 'events';

      if(!angular.isUndefined($routeParams.category)) {
        vm.category = $routeParams.category;
      }
      $scope.owlOptionsTestimonials = {
        loop:true,
        dots:false,
        margin:20,
        nav:true,
        navText:['<i class="fa fa-chevron-left"></i>','<i class="fa fa-chevron-right"></i>'],
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
      vm.delete = modelFactory.deleteLogical;

      loadModel();

      function loadModel() {
        rest().get({
          type: vm.module,
          params: 'slug=' + $routeParams.slug + '&populate=front,category'
        }, function(resp) {
          // console.log(resp[0]);
          if(!!resp[0]) {
            vm.info = resp[0];

            if (!!resp[0].start) {
                vm.info.start = vm.info.start ? moment(vm.info.start).utc().toISOString().slice(0, 10) : null;
            }
            if (!!resp[0].end) {
                vm.info.end = vm.info.end ? moment(vm.info.end).utc().toISOString().slice(0, 10) : null;
            }

            // rest().findOne({
            //   type: 'categories',
            //   id: resp[0].category
            // }, function(respCategory) {
            //   vm.info.category = respCategory;
            // });

          } else {
            vm.info = {};
          }

          usSpinnerService.stop('spinner');
        }, function(error) {
          vm.info = {};
          usSpinnerService.stop('spinner');
        });
      };

      vm.getHtml = function(html) {
        if(!!html && html != 'null'){
          return $sce.trustAsHtml(html);

        }
        return '';
      };
  }
  ;
})(window, window.angular);
