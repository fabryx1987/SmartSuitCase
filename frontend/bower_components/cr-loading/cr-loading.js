angular.module('cr.loading', [
  'angular-loading-bar',
  'ngAnimate'
])
.constant("crLoading.config", {
  "clickSpinnerClass": "fa fa-spin fa-spinner spin"
})
.provider("crLoading", ["crLoading.config", function(config) {
  var self = {};

  self.clickSpinnerClass = config.clickSpinnerClass;

  self.getClickSpinnerClass = function()
  {
    return self.clickSpinnerClass;
  }

  this.setClickSpinnerClass = function(s)
  {
    self.clickSpinnerClass = s;
  }

  this.$get = [function(){
    return self;
  }];

  return this;
}])
.directive('crLoading', ['$timeout', "crLoading", function($timeout, crLoading) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var el = null;
      scope.loader = function() {
        $(el).blur();
        scope.oldClass = "";
        el.attr('disabled', 'disabled');
        if(el.find('i').length === 0) {
          el.prepend(angular.element('<i>'));
        }
        else {
          scope.oldClass = el.find('i').attr('class');
        }
        el.find('i').attr('class', crLoading.getClickSpinnerClass());
        scope.$on('cfpLoadingBar:loaded', function(event, data) {
          $timeout(function() {
            el.removeAttr('disabled');
            if(scope.oldClass) {
              el.find('i').attr('class', scope.oldClass);
            }
            else {
              el.find('i').remove();
            }
          }, 250);
        });
      };

      if(element[0].tagName == "FORM") {
        element.bind('submit', function() {
            var els = element.find('button');
            for(var iii in els) {
              if(els[iii].type == "submit") {
                el = angular.element(els[iii]);
              }
            }
            if(el) {
              scope.loader();
            }
          });
      }
      else {
        el = element;
        el.bind('click', scope.loader);
      }
    }
  };
}]);
