angular.module('cr.remote', [])
.service('crRemoteDynamo', ['crRemote', 'crAws', '$q',  function(crRemote, crAws, $q) {
	this._config = {
    id: false,
    params: false,
    resourceName: "",
    endpoint: "default",
    endpointBuilder: "default",
    requestInterceptor: "default",
    responseInterceptorSuccess:  "default",
    responseInterceptorError:  "default",

    headers: {},
    authHandlers: {},
    authType: false,
    cache:false,
    timeout:0,

    endpoints: {},
    endpointBuilders: {},
    requestInterceptors: {},
    responseInterceptorSuccesss: {},
    responseInterceptorErrors: {}
	};

	/**
  * Create service
  * @param options Object init configuration
  */
  this.createService = function(resourceName, options) {
    var service = angular.copy(this);
    service._config = service.getMergedConfig(crRemote);
    if(options) {
      service._config = service.getMergedConfig(options);
    }
    service._config.resourceName = resourceName;
    return service;
  };

  /**
  * Merge configuration
  * @param options Object your configuration
  * @return Object
  */
  this.getMergedConfig = function(options) {
    var results = angular.copy(this.getConfig());
    for(var iii in options) {
      if(results[iii] !== null) {
        results[iii] = options[iii];
      }
    }
    return results;
  };

  /**
  * Get entry point
  * @param options Object Call configuration
  * @return $q
  */
  this['get'] = function(options) {
    if(!options) {
      options = {};
    }
    options.method = "GET";
    return this._call(options);
  };

  /**
  * Post entry point
  * @param options Object Call configuration
  * @return $q
  */
  this['post'] = function(options) {
    if(!options) {
      options = {};
    }
    options.method = "POST";
    return this._call(options);
  };

  /**
  * Wrap of $http
  * @param options Object Call configuration
  * @return $http
  */
  this._call = function(options) {
    options = this.getMergedConfig(options);
    var d = $q.defer();
    var dynamo = crAws.cognito.getDynamo(options.resourceName);

    if(options.requestInterceptors[options.requestInterceptor]) {
      options = options.requestInterceptors[options.requestInterceptor](options);
    }
    dynamo.then(function(dynamoObj) {
      if(options.method == "GET") {
        dynamoObj.get(options.id).then(function(data){
          if(options.responseInterceptorSuccesss[options.responseInterceptorSuccess]) {
            data = options.responseInterceptorSuccesss[options.responseInterceptorSuccess](data);
          }
          d.resolve(data);
        },function(data){
          if(options.responseInterceptorErrors[options.responseInterceptorError]) {
            data = options.responseInterceptorErrors[options.responseInterceptorError](data);
          }
          d.reject(data);
        });
      }
    });
    return d.promise;
  };

  this.getConfig = function() {
    return this._config;
  };

  this.setConfig = function(obj) {
    for (var ii in obj) {
      this._config[ii] = obj[ii];
    }
  };
}])

.service('crRemoteCognitoSync', ['crRemote', 'crAws', '$q',  function(crRemote, crAws, $q) {
	this._config = {
    id: false,
    params: false,
    resourceName: "",
    endpoint: "default",
    endpointBuilder: "default",
    requestInterceptor: "default",
    responseInterceptorSuccess:  "default",
    responseInterceptorError:  "default",

    headers: {},
    authHandlers: {},
    authType: false,
    cache:false,
    timeout:0,

    endpoints: {},
    endpointBuilders: {},
    requestInterceptors: {},
    responseInterceptorSuccesss: {},
    responseInterceptorErrors: {}
	};

  /**
  * Create service
  * @param options Object init configuration
  */
  this.createService = function(resourceName, options) {
    var service = angular.copy(this);
    service._config = service.getMergedConfig(crRemote);
    if(options) {
      service._config = service.getMergedConfig(options);
    }
    service._config.resourceName = resourceName;
    return service;
  };

  /**
  * Wrap of $http
  * @param options Object Call configuration
  * @return $http
  */
  this._call = function(options) {
    options = this.getMergedConfig(options);
    var d = $q.defer();
    var sync = crAws.cognito.getSync(options.resourceName);

    if(options.requestInterceptors[options.requestInterceptor]) {
      options = options.requestInterceptors[options.requestInterceptor](options);
    }

    sync.then(function(syncObj) {
      if(options.method == "GET") {
        syncObj.get(options.id).then(function(data){
          if(options.responseInterceptorSuccesss[options.responseInterceptorSuccess]) {
            data = options.responseInterceptorSuccesss[options.responseInterceptorSuccess](data);
          }
          d.resolve(data);
        },function(data){
          if(options.responseInterceptorErrors[options.responseInterceptorError]) {
            data = options.responseInterceptorErrors[options.responseInterceptorError](data);
          }
          d.reject(data);
        });
      }
      if(options.method == "POST" || options.method == "PUT" || options.method == "PATCH") {
        syncObj.set(options.id, options.data).then(function(data){
          if(options.responseInterceptorSuccesss[options.responseInterceptorSuccess]) {
            data = options.responseInterceptorSuccesss[options.responseInterceptorSuccess](data);
          }
          d.resolve(data);
        },function(data){
          if(options.responseInterceptorErrors[options.responseInterceptorError]) {
            data = options.responseInterceptorErrors[options.responseInterceptorError](data);
          }
          d.reject(data);
        });
      }
      if(options.method == "DELETE") {
        syncObj.remove(options.id).then(function(data){
          if(options.responseInterceptorSuccesss[options.responseInterceptorSuccess]) {
            data = options.responseInterceptorSuccesss[options.responseInterceptorSuccess](data);
          }
          d.resolve(data);
        },function(data){
          if(options.responseInterceptorErrors[options.responseInterceptorError]) {
            data = options.responseInterceptorErrors[options.responseInterceptorError](data);
          }
          d.reject(data);
        });
      }
    });

    return d.promise;
  };


  /**
  * Merge configuration
  * @param options Object your configuration
  * @return Object
  */
  this.getMergedConfig = function(options) {
    var results = angular.copy(this.getConfig());
    for(var iii in options) {
      if(results[iii] !== null) {
        results[iii] = options[iii];
      }
    }
    return results;
  };

  /**
  * Get entry point
  * @param options Object Call configuration
  * @return $q
  */
  this['get'] = function(options) {
    if(!options) {
      options = {};
    }
    options.method = "GET";
    return this._call(options);
  };


  /**
  * Delete entry point
  * @param options Object Call configuration
  * @return $q
  */
  this['delete'] = function(options) {
    if(!options) {
      options = {};
    }
    options.method = "DELETE";
    return this._call(options);
  };

  /**
  * Post entry point
  * @param options Object Call configuration
  * @return $q
  */
  this['post'] = function(options) {
    if(!options) {
      options = {};
    }
    options.method = "POST";
    return this._call(options);
  };

  /**
  * Put entry point
  * @param options Object Call configuration
  * @return $q
  */
  this['put'] = function(options) {
    if(!options) {
      options = {};
    }
    options.method = "PUT";
    return this._call(options);
  };

  /**
  * Patch entry point
  * @param options Object Call configuration
  * @return $q
  */
  this['patch'] = function(options) {
    if(!options) {
      options = {};
    }
    options.method = "PATCH";
    return this._call(options);
  };

  this.getConfig = function() {
    return this._config;
  };

  this.setConfig = function(obj) {
    for (var ii in obj) {
        this._config[ii] = obj[ii];
    }
  };
}])
.service('crRemoteHttp', ['crRemote', '$http', '$q', '$log', function(crRemote, $http, $q, $log) {
  /**
  * configuration
  * @param _config Object
  */
  this._config = {
    id: false,
    params: false,
    resourceName: "",
    endpoint: "default",
    endpointBuilder: "default",
    requestInterceptor: "default",
    responseInterceptorSuccess:  "default",
    responseInterceptorError:  "default",

    callName: "",

    headers: {},
    authHandlers: {},
    authType: false,
    cache:false,
    timeout:0,

    endpoints: {},
    endpointBuilders: {},
    requestInterceptors: {},
    responseInterceptorSuccesss: {},
    responseInterceptorErrors: {},
  };

  /**
  * Create service
  * @param options Object init configuration
  */
  this.createService = function(resourceName, options) {
    var service = angular.copy(this);
    service._config = service.getMergedConfig(crRemote);
    if(options) {
      service._config = service.getMergedConfig(options);
    }
    service._config.resourceName = resourceName;
    $log.debug("Rem new remote: " + resourceName, service._config);
    return service;
  };

  /**
  * Return build endpoint by name
  * @param endpointBuilderType String name of your endpoint builder
  * @return endpoint String
  */
  this.getEndpointBuilder = function(endpointBuilderType) {
    if(!endpointBuilderType) {
      endpointBuilderType = "default";
    }
    if(this.getConfig()['endpointBuilders'][endpointBuilderType]) {
      return this.getConfig()['endpointBuilders'][endpointBuilderType];
    } else {
      var parseParams = this.parseParams;
      return function(endpoint, resourceName, resourceId, params) {
        if(resourceName) {
          endpoint += resourceName;
        }
        if(resourceId) {
          endpoint += "/" + resourceId;
        }
        if(params) {
          endpoint += "?" + this.parseParams(params, null, parseParams);
        }
        return endpoint;
      } ;
    }
  };

  /**
  * Authorize request
  * @param requt Object HTTP request
  * @return Object
  */
  this.authorizeRequest = function(request) {
    var handler = this.getAuthHandler(request.authType);
    if(handler) {
      return handler.sign(request);
    }
    return request;
  };

  /**
  * Return config
  * @return Object
  */
  this.getConfig = function() {
    return this._config;
  };

  /**
  * Set configuration
  * @param Object obj
  */
  this.setConfig = function(obj) {
    for (var ii in obj) {
      this._config[ii] = obj[ii];
    }
  };

  /**
  * Merge configuration
  * @param options Object your configuration
  * @return Object
  */
  this.getMergedConfig = function(options) {
    var results = angular.copy(this.getConfig());
    for(var iii in options) {
      if(results[iii] !== null) {
        results[iii] = options[iii];
      }
    }
    return results;
  };

  /**
  * Set Authentication Handler
  * @param authHandler Object
  * @param authType    String Name of authentication
  */
  this.setAuthHandler = function (authHandler, authType) {
    if(!authType) {
      authType = "default";
    }
    this.getConfig()['authHandlers'][authType] = authHandler;
  };

  /**
  * Return authentication handler
  * @param authType String
  * @return {}|false
  */
  this.getAuthHandler = function(authType) {
    if(!authType) {
      authType = "default";
    }
    return this.getConfig().authHandlers[authType];
  };

  this.parseParams = function(obj, prefix, recursive) {
    var str = [];
    for(var p in obj) {
      var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
      if (typeof v === "object") {
        for (var iii in v) {
          str.push(iii + "=" + v[iii]);
        }
      } else {
        str.push(typeof v == "object" ?
        recursive(v, k, recursive) :
        //k + "=" + v);
        encodeURIComponent(k) + "=" + encodeURIComponent(v));
      }
    }
    return str.join("&");
  };

  /**
  * Return endpoint
  * @param endpointType String endpoint name
  * @return config|""
  */
  this.getEndpoint = function(endpointType) {
    if(!endpointType) {
      endpointType = "default";
    }
    if(this.getConfig().endpoints[endpointType]) {
      return this.getConfig().endpoints[endpointType];
    }
    else {
      return "" ;
    }
  };


  /**
  * Wrap of $http
  * @param options Object Call configuration
  * @return $http
  */
  this._call = function(options) {
    options = this.getMergedConfig(options);
    var builder = this.getEndpointBuilder(options.endpointBuilder);
    var url = builder(this.getEndpoint(options.endpoint), options.resourceName, options.id);
    options = this.authorizeRequest(options);

    var logId = "Rem #" + parseInt((Math.random() * 1000)) + " " + options.resourceName + ": " +options.callName + " ";

    var d = $q.defer();
    var httpConfig = {
      "url": url,
      "method": options.method,
      "params": options.params,
      "headers": options.headers,
      "cache": options.cache,
      "timeout": options.timeout,
      "callName": options.callName
    };
    if(options.data) {
      httpConfig.data = options.data;
    }

    if(options.requestInterceptors[options.requestInterceptor]) {
      httpConfig = options.requestInterceptors[options.requestInterceptor](httpConfig);
    }

    $log.debug(logId + "config", httpConfig);

    $http(httpConfig).then(function(data){
      $log.info(logId + "OK (pre)", options.resourceName, data);
      if(options.responseInterceptorSuccesss[options.responseInterceptorSuccess]) {
        data = options.responseInterceptorSuccesss[options.responseInterceptorSuccess](data);
        $log.info(logId + "OK (post)", options.resourceName, data);
      }
      d.resolve(data);
    },function(data){
      $log.error(logId + "ERROR (pre)", options.resourceName, data);
      if(options.responseInterceptorErrors[options.responseInterceptorError]) {
        data = options.responseInterceptorErrors[options.responseInterceptorError](data);
        $log.error(logId + "ERROR (post)", options.resourceName, data);
      }
      d.reject(data);
    });
    return d.promise;
  };

  /**
  * Get entry point
  * @param options Object Call configuration
  * @return $q
  */
  this['get'] = function(options) {
    if(!options) {
      options = {};
    }
    options.method = "GET";
    options.callName = "get";
    return this._call(options);
  };

  /**
  * Get entry point with params or search intents
  * @param options Object Call configuration
  * @return $q
  */
  this['query'] = function(options) {
    if(!options) {
      options = {};
    }
    options.method = "GET";
    options.callName = "query";
    return this._call(options);
  };

  /**
  * Delete entry point
  * @param options Object Call configuration
  * @return $q
  */
  this['delete'] = function(options) {
    if(!options) {
      options = {};
    }
    options.method = "DELETE";
    options.callName = "delete";
    return this._call(options);
  };

  /**
  * Post entry point
  * @param options Object Call configuration
  * @return $q
  */
  this['post'] = function(options) {
    if(!options) {
      options = {};
    }
    options.method = "POST";
    options.callName = "post";
    return this._call(options);
  };

  /**
  * Put entry point
  * @param options Object Call configuration
  * @return $q
  */
  this['put'] = function(options) {
    if(!options) {
      options = {};
    }
    options.method = "PUT";
    options.callName = "put";
    return this._call(options);
  };

  /**
  * Patch entry point
  * @param options Object Call configuration
  * @return $q
  */
  this['patch'] = function(options) {
    if(!options) {
      options = {};
    }
    options.method = "PATCH";
    options.callName = "patch";
    return this._call(options);
  };
}])
.provider('crRemote', function() {
	var _config = {
    endpointBuilders: {},
    endpoints: {},
    requestInterceptors: {},
    responseInterceptorSuccesss: {},
    responseInterceptorErrors: {}
	};

	/**
	* Add an endpoint (es http://myrestendpoint.tld/)
	* @param String name the endpoint identifier
	* @param String endpoint the endpoint
	*/
	this.addEndpoint = function(name, endpoint) {
    this.getConfig().endpoints[name] = endpoint;
	};

	/**
	* Get an endpoint by name
	* @param String name the endpoint identifier
	* @return String the endpoint or null if not set
	*/
	this.getEndpoint = function(name) {
    return (getConfig().endpoints[name]) ? getConfig().endpoints[name] : null;
	};

	/**
	* set all endpoints overriding the previous
	* @param Object endpoints a list of names and endpoints
	*/
	this.setEndpoints = function(endpoints) {
    for(var iii in endpoints) {
        this.addEndpoint(iii, endpoints[iii]);
    }
	};

		/**
		* Add an endpoint builder function (es http://myrestendpoint.tld/)
		* @param String name the endpoint identifier
		* @param Function builder the function that create the final endpoint for the remote request
		*/
	this.addEndpointBuilder = function(name, builder) {
    this.getConfig().endpointBuilders[name] = builder;
	};

		/**
		* Get an endpoint by name
		* @param String name the builder identifier
		* @return Function the builder used for this name
		*/
		this.getEndpointBuilder = function(name) {
      return (getConfig().endpointBuilders[name]) ? getConfig().endpointBuilders[name] : null;
		};

		/**
		* set all builders overriding the previous
		* @param Object builders a list of names and builder functions
		*/
		this.setEndpointBuilders = function(builders) {
      for(var iii in builders) {
          this.addEndpointBuilder(iii, builders[iii]);
      }
		};

		/**
		* Add an interceptor for request
		* @param String name the interceptor identifier
		* @param Function interceptor the interceptor
		*/
		this.addRequestInterceptor = function(name, interceptor) {
      this.getConfig().requestInterceptors[name] = interceptor;
		};

		/**
		* Get an interceptor for request  by name
		* @param String name the interceptor identifier
		* @return Function the intercpetor function or null if not set
		*/
		this.getRequestInterceptor = function(name) {
      return (getConfig().requestInterceptors[name]) ? getConfig().requestInterceptors[name] : function(data) {return data;};
		};

		/**
		* set all interceptors for request
		* @param Object intercpetors a list of names and intercpetor functions
		*/
		this.setRequestInterceptors = function(interceptors) {
      for(var iii in interceptors) {
          this.addRequestInterceptor(iii, interceptors[iii]);
      }
		};

		/**
		* Add an interceptor for response success
		* @param String name the interceptor identifier
		* @param Function interceptor the interceptor
		*/
		this.addResponseInterceptorSuccess = function(name, interceptor) {
      this.getConfig().responseInterceptorSuccesss[name] = interceptor;
		};

		/**
		* Get an interceptor for response success by name
		* @param String name the interceptor identifier
		* @return Function the intercpetor function or null if not set
		*/
		this.getResponseInterceptorSuccess = function(name) {
      return (getConfig().responseInterceptorSuccesss[name]) ? getConfig().responseInterceptorSuccesss[name] : function(data) {return data;};
		};

		/**
		* set all interceptors for response success
		* @param Object intercpetors a list of names and intercpetor functions
		*/
		this.setResponseInterceptorSuccesss = function(interceptors) {
      for(var iii in interceptors) {
          this.addResponseInterceptorSuccess(iii, interceptors[iii]);
      }
		};

		/**
		* Add an interceptor for response error
		* @param String name the interceptor identifier
		* @param Function interceptor the interceptor
		*/
		this.addResponseInterceptorError = function(name, interceptor) {
      this.getConfig().responseInterceptorErrors[name] = interceptor;
		};

		/**
		* Get an interceptor for response error by name
		* @param String name the interceptor identifier
		* @return Function the intercpetor function or null if not set
		*/
		this.getResponseInterceptorError = function(name) {
      return (getConfig().responseInterceptorErrors[name]) ? getConfig().responseInterceptorErrors[name] : function(data) {return data;};
		};

		/**
		* set all interceptors for response error
		* @param Object intercpetors a list of names and intercpetor functions
		*/
		this.setResponseInterceptorErrors = function(interceptors) {
      for(var iii in interceptors) {
          this.addResponseInterceptorError(iii, interceptors[iii]);
      }
		};

	/**
	* Return config
	* @return Object
	*/
	this.getConfig = function() {
		return _config;
	};

	this.$get = function() {
    return this.getConfig();
	};
})
.provider('crRemoteCognito', function() {
  var _config = {
    endpointBuilders: {},
    endpoints: {}
  };

  /**
  * Build your endpoint
  * @param   buildFunction function Callback to create endpoint url
  * @param   buildType     function Name of endpoint
  */
  this.setEndpointBuilder = function(buildFunction, buildType) {
    if(!buildType) {
        buildType = "default";
    }
    this.getConfig().endpointBuilders[buildType] = buildFunction;
  };

  /**
  * Set new endpoint
  * @param endpoint String endpoint url
  * @param endpointType String name of endpoint
  */
  this.setEndpoint = function (endpoint, endpointType) {
    if(!endpointType) {
        endpointType = "default";
    }
    this.getConfig().endpoints[endpointType] = endpoint;
  };

  /**
  * Return config
  * @return Object
  */
  this.getConfig = function() {
    return _config;
  };

  this.$get = ["crRemoteCognitoSync", function(crRemoteCognitoSync) {
    crRemoteCognitoSync.setConfig(this.getConfig());
    return crRemoteCognitoSync;
  }];
});
