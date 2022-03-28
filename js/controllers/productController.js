(function(window, angular) {
  angular
        .module('productController', ['store-factories', 'model-factories'])
        .controller('ProductListController', ProductListController)
        .controller('ProductViewController', ProductViewController);

  function ProductListController($scope, rest, $window, usSpinnerService, modelFactory) {
      usSpinnerService.spin('spinner');
      //Variables
      var vm = this;
      vm.module = 'products';
      vm.text_module = 'Nuevo Producto';
      vm.paginate = {
          page: 1,
          skip: 0,
          limit: 999,
          countTotal: 0,//countPaginateService || 0,
          orderBy: 'createdAt',
          populate: 'front',//'medicalcenter',
          conditions: 'visible=true'
      };

      //Functions
      vm.paging = pagingFunction;

      //get countTotal for paginate
      modelFactory.count(vm.module, setCount);

      loadModel();

      function loadModel(skip) {
          var skip_pg = skip || vm.paginate.skip;
          var condition = '';

          condition = setCond(condition, skip_pg);

          rest().get({
              type: vm.module,
              params: condition
          }, function (resp) {
              vm.data = resp;
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

  function ProductViewController($scope, $routeParams, rest, $location, usSpinnerService, modelFactory, $sce) {
      usSpinnerService.spin('spinner');
      //Variables
      var vm = this;
      vm.module = 'products';
      vm.info = {};

      loadModel();

      function loadModel() {
          rest().get({
              type: vm.module,
              params: 'populate=front&code=' + $routeParams.code
          }, function (resp) {
            if(!!resp[0]) {
              vm.info = resp[0];
            }

              usSpinnerService.stop('spinner');
          }, function (error) {
              usSpinnerService.stop('spinner');
          });
      };
  }
  ;
})(window, window.angular);
