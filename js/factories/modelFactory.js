(function (window, angular) {
    angular.module('model-factories', [])

    .factory('modelFactory', ModelFactory);

    function ModelFactory(rest, usSpinnerService, $window, $location, Alertify) {
      var model = {
        count: count,
        delete: deleteModel,
        deleteLogical: deleteLogical,
        search: search
      }

      return model;

      function count(type, callback, params) {
        rest().count({
          type: type,
          params: (!!params) ? params : ''
        }, function(resp) {
          if(!!callback)
              callback(resp.count);
        });
      };

      function deleteModel(id, type, reload) {
        Alertify.set({
            labels: {
                ok: 'Ok',
                cancel: 'Cancelar'
            }
        });
        Alertify.confirm('¿Está seguro de realizar esta acción?')
                .then(function onOk() {
                    usSpinnerService.spin('spinner');
                    rest().delete({
                       id: id,
                       type: type
                    }, function (resp) {
                      if(!!reload) {
                        $window.location.reload();
                      } else {
                        $location.path(type);
                      }
                    }, function (error) {
                        usSpinnerService.stop('spinner');
                    });
                  }, function onCancel() {
                    return false;
                  });
      }

      function deleteLogical(id, type, reload) {
        Alertify.set({
            labels: {
                ok: 'Ok',
                cancel: 'Cancelar'
            }
        });
        Alertify.confirm('¿Está seguro de realizar esta acción?')
                .then(function onOk() {
                    usSpinnerService.spin('spinner');
                    rest().update({
                       id: id,
                       type: type
                    }, {
                      deleted: true
                    }, function (resp) {
                      if(!!reload) {
                        $window.location.reload();
                      } else {
                        $location.path(type);
                      }
                    }, function (error) {
                        usSpinnerService.stop('spinner');
                    });
                  }, function onCancel() {
                    return false;
                  });
      }

      function search(element, callback) {
        // console.log(element.conditions);
        rest().get({
            type: element.type,
            params: element.conditions//pm + "orderBy="+orderBy+"&sort="+ sort + conditions
        }, function(resp) {
            if(!!callback)
                callback(resp);
        }, function(error) {
            // if(!!callback)
            //     callback(false);
        });
      }
    };
})(window, window.angular);
