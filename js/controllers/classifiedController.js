(function(window, angular) {
  angular
        .module('classifiedController', ['store-factories', 'model-factories', 'vcRecaptcha'])
        .controller('ClassifiedListController', ClassifiedListController)
        .controller('ClassifiedViewController', ClassifiedViewController);

  function ClassifiedListController($scope, rest, $window, usSpinnerService, modelFactory, Upload, $rootScope, vcRecaptchaService, $location) {
      usSpinnerService.spin('spinner');
      //Variables
      var vm = this;
      vm.module = 'classifieds';
      vm.paginate = {
          page: 1,
          skip: 0,
          limit: 999999,
          countTotal: 0,//countPaginateService || 0,
          orderBy: 'publishedAt',
          populate: '',//'medicalcenter',
          conditions: 'published=true'
      };
      vm.info = {};

      //Functions
      vm.paging = pagingFunction;
      vm.save = save;
      vm.clearGallery = clearGallery;

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

              angular.forEach(vm.data, function(element) {
                element.publishedAt = element.publishedAt ? moment(element.publishedAt).utc().toISOString().slice(0, 10) : null;
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

      function clearGallery(index) {
        if (vm.info.gallery.indexOf(index) === -1) {
          vm.info.gallery.splice(index, 1);
        }
      };

      recaptchaId = null;

      $scope.setRecaptchaId = function(widgetId) {
          recaptchaId = widgetId;
      };

      function save() {
        usSpinnerService.spin('spinner');
        if (!vcRecaptchaService.getResponse(recaptchaId)) {
            vm.od_captcha = null;
            vcRecaptchaService.reload(recaptchaId);
            Alertify.alert('Por favor, completa el captcha.');
        } else {
        var data = {
          title: vm.info.title,
          name: vm.info.name,
          lastname: vm.info.lastname,
          description: vm.info.description,
          price: vm.info.price,
          email: vm.info.email,
          phone: vm.info.phone,
          matricula: vm.info.matricula,
          published: true,
          publishedAt: moment().format('YYYY-MM-DD'),
          recaptcha: vcRecaptchaService.getResponse(recaptchaId)
        };

        if (!!vm.info.gallery && vm.info.gallery.length > 0) {
             data.gallery = vm.info.gallery;
         }
// console.log(data);
        Upload.upload({
             url: $rootScope.url + "/" + vm.module + "/send",
             arrayKey: '',
             data: data,
             // headers: {
             //     'Authorization': 'JWT ' + $rootScope.adminglob.currentUser.token
             // }
         }).then(function(resp) {
           vcRecaptchaService.reload(recaptchaId);
           vm.info = {};
            usSpinnerService.stop('spinner');
             $location.url('/clasificados');
         }, function(error) {
           vcRecaptchaService.reload(recaptchaId);
           usSpinnerService.stop('spinner');
         }, function(evt) {
             var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
         });
       }
      }
  }
  ;

  function ClassifiedViewController($scope, $routeParams, rest, $location, usSpinnerService, modelFactory, $sce) {
      usSpinnerService.spin('spinner');
      //Variables
      var vm = this;
      vm.module = 'classifieds';
      vm.owlCarouselOptions = {
        loop:true,
        dots:false,
        nav:true,
        navText:['<i class="fa fa-chevron-left"></i>','<i class="fa fa-chevron-right"></i>'],
        responsive:{
            0:{
                items:1
            }
        }
      }

      //Functions

      loadModel();

      function loadModel() {
          rest().findOne({
              id: $routeParams.id,
              type: vm.module,
              params: 'populate=images'
          }, function (resp) {
              vm.info = resp;

              if(!!vm.info.createdAt) {
                vm.info.createdAt = vm.info.createdAt ? moment(vm.info.createdAt).utc().toISOString().slice(0, 10) : null;
              }
              if(!!vm.info.publishedAt) {
                vm.info.publishedAt = vm.info.publishedAt ? moment(vm.info.publishedAt).utc().toISOString().slice(0, 10) : null;
              }
              if(!!vm.info.updatedAt) {
                vm.info.updatedAt = vm.info.updatedAt ? moment(vm.info.updatedAt).utc().toISOString().slice(0, 10) : null;
              }

              usSpinnerService.stop('spinner');
          }, function (error) {
              vm.info = {};
              usSpinnerService.stop('spinner');
          });
      };
  }
  ;
})(window, window.angular);
