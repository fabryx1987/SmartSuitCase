angular.module('cr.identity', [
  'LocalStorageModule',
  'cr.acl',
  'ui.router',
  'cr.session'
])
.service('crIdentity', ['crSession', 'crAcl', '$rootScope', '$log', '$q', function(crSession, crAcl, $rootScope, $log, $q) {
    var self = this;

    self.getSign = function(type) {
      var auth = crSession.get('identity', "cr-identity");
      if(auth && auth.type && auth.token) {
        return auth;
      }
      else {
        return false;
      }
    };

    self.set = function(identity)
    {
        $log.debug("[crIdentity] Identity:", identity);
        crSession.set('identity', identity, "cr-identity");
        $rootScope._identity = identity;
    };

    /**
    * Return identity from session
    * @return Object
    */
    self.get = function()
    {
      return crSession.get('identity', "cr-identity");
    };

    /**
    * Clear auth session
    */
    self.purge = function()
    {
      delete $rootScope._identity;
      return crSession.purgeNamespace("cr-identity");
    };


    self.restore = function() {
      var d = $q.defer();
      var identity = self.get();
      if(!identity) {
        d.reject();
      }
      else if(identity && identity.role) {
        crAcl.setRole(identity.role);
      }
      $rootScope._identity = identity;
      //crSession.delete('satellizer_token');
      $rootScope.$emit("auth:restore:success", identity);
      $log.debug("[crIdentity] Broadcast auth:restore:success");

      d.resolve(identity);
      return d.promise;
    };


    $rootScope.$on('auth:login:success', function(event, data) {
      self.set(data);
      // crAcl.setCredentials(data.auth);
      if(data.role) {
        crAcl.setRole(data.role);
      }
      $rootScope.$broadcast('auth:identity:success', data);
      $log.debug("[crAuth] Broadcast auth:identity:success");
    });

    $rootScope.$on('auth:logout:success', function(event, data) {
      self.purge();
      // crAcl.voidCredentials();
      crAcl.setRole();
      $rootScope.$broadcast('auth:purge:success', data);
      $log.debug("[crAuth] Broadcast auth:purge:success");

    });



    return self;
}]);
