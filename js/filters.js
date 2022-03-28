
  function zeros() {
    return function(input) {
      return  ("0000000"+input).slice(-8);
    }
  }

  function isNumber() {
    return function(input) {
      return angular.isNumber(input);
    }
  }

angular
    .module('solp')
    .filter('zeros', zeros)
    .filter('isNumber', isNumber);
