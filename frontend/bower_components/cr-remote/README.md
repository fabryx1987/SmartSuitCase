# crRemote

## Overview

CrRemote is a module based on $http create injectable services that work with restful and remote resources.

## Install

``` shell
$. bower install cr-remote
```

add to your html:

```html
<script src="bower_components/cr-remote/cr-remote.js"></script>
```

then inject it:

```javascript
angular.module(
  'ngtest',
  [
      'cr.remote'
  ]
)
```


## Simple configuration
```javascript
.config(function myAppConfig(crRemoteProvider) {

  //set endpoint
  crRemoteProvider.setEndpoint("http://api1.your-backend-url.com");

  //set interceptors

  //request interceptor to edit data before the call
  crRemoteProvider.addRequestInterceptor("default", function(data){
    data.params.session = "mysessionid";
    return data;
  });

  //succesful response interceptor
  crRemoteProvider.addResponseInterceptorSuccess("default", function(data){
    data.now = new Date();
    return data;
  });

  //wrong response interceptor
  crRemoteProvider.addResponseInterceptorError("default", function(data){
    console.log("aaaargh!", data);
    return data;
  });

})
```

## Simple usage

You can user directly crRemote to make simple http requests:

``` javascript
.controller('AppCtrl', function AppCtrl($scope, crRemoteHttp) {

    //retrieve product
    crRemoteHttp.get({
        resourceName: "/product"
    }).then(function(res) {
      console.log(res);
    }, function(error) {
      console.log(error);
    });

    //post a new entry
    crRemoteHttp.post({
        id: 22
        resourceName: "/product",
        data: {
          title: 'product',
          price: 22.5
        }
    }).then(function(res) {
      console.log(res);
    }, function(error) {
      console.log(error);
    });
});
```

Get, post, put, patch and delete methods return a promise.
Successful callback **returns by default an object** that contains data (body response), headers() (function that return headers) and status (http status code, exp 200). This is the same return of $http calls.

## Create services

The best way is create dedicated modules with specific methods for each remote resource.


``` javascript
  //define a new service
  .service('OrderResource', ['crRemoteHttp', function(crRemoteHttp){
   var service = crRemoteHttp.createService("order");

   service.changeStatus = function(id, status) {
     return service.patch({"id": id, data:{"status": status}});
   };

   return service;
  }])

  //use in a controller
  .controller('AppCtrl', function AppCtrl($scope, OrderResource) {
    OrderResource.changeStatus(123, 'shipped').then(function(response) {
     console.log(response);
    }, function(err) {
     console.log(err);
    })
  });
```

When you create a service, the URI is crafted with this formula:

`endpoint` + `resourceName` + `\` + `id`

So when you make a POST request with id value = 22 on the `OrderResource` service it will call the 'http://endpoint-in-config/order/22' URL.

## Methods (API)

### Options object

The options object that you can pass to methods:


key                   | type          | Description
----------------------| --------------| ----------
id                    | string/int    | the id used to build the url resource
data                  | object        | data passed in the body of request
cache                 | bool          | default false, if true caches the response
timeout               | int/promise   | the ms of timeout or a promise
params                | object        | data appendend in queery params
headers               | object        | addictional headers for the request
auth                  | bool          | false by default: if false the `Authorization` header is deleted in request


For example:

```javascript
crRemoteHttp.post({
  id: 22 // id of resource, that will be used to create the endpoint url (see advanced settings below)
  resourceName: "/product", // the name of the resource, as the id is used to create the url
  data: { //data sent to endpoint in the body of call
    title: 'product',
    price: 22.5
  },
  cache: true //if the client has to cache response, false by default
  timeout: 5000 //milliseconds or a promise for the timeout, 0 by default (no timeout),
  params: { //object of Query params (?q=myname)
    q: 'myname'
  },
  headers: { //object of addiction request headers
    'x-myheader': '123'
  },
  auth: true //if false, an eventual Authorization header will be removed for the call; false by default
})

```

### .get(options)

Make a GET call and returns a promise.

```javascript
//MyService is a crRemote service on 'example' resource

//GET http://myendpoint/example/22
MyService.get({'id': 22}).then(function(response) {
  console.log(response);
}, function(error) {
  console.log(error);  
});
```

Search with query params:


```javascript
//MyService is a crRemote service on 'example' resource

//GET http://myendpoint/example/?q=searchkey with 5 seconds timeout
MyService.get({'params': {'q': 'searchkey'}, 'timeout': 5000}).then(function(response) {
  console.log(response);
}, function(error) {
  console.log(error);  
});
```


### .post(options)

Make a POST call and returns a promise.

```javascript
//MyService is a crRemote service on 'example' resource

//POST {'amount': 1000} with no deleting authorization header to http://myendpoint/example/22
MyService.post({'id': 22, 'data': {'amount': 1000}, 'auth': true}).then(function(response) {
  console.log(response);
}, function(error) {
  console.log(error);  
});
```

### .put(options)

Make a PUT call and returns a promise.

```javascript
//MyService is a crRemote service on 'example' resource

//PUT {'amount': 1000} with no deleting authorization header to http://myendpoint/example/22
MyService.put({'id': 22, 'data': {'amount': 1000}, 'auth': true}).then(function(response) {
  console.log(response);
}, function(error) {
  console.log(error);  
});
```
### .patch(options)

Make a PATCH call and returns a promise.

```javascript
//MyService is a crRemote service on 'example' resource

//PATCH {'amount': 2000} with no deleting authorization header to http://myendpoint/example/22
MyService.put({'id': 22, 'data': {'amount': 200}, 'auth': true}).then(function(response) {
  console.log(response);
}, function(error) {
  console.log(error);  
});
```

### .delete(options)

Make a DELETE call and returns a promise.

```javascript
//MyService is a crRemote service on 'example' resource

//DELETE http://myendpoint/example/22
MyService.delete({'id': 22}).then(function(response) {
  console.log(response);
}, function(error) {
  console.log(error);  
});
```



## Manage authorization
We recommend to use [Satellizer](https://github.com/sahat/satellizer) to manage login and authetication. Satellizer adds Authentication header to http calls (and crRemote it's based on $http).

However, you case easily use directly $http to set authorization headers for your calls.

```javascript
//in a controller or service
$http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.user.authtoken; // it's just an example

OrderResource.get({'id': 22, 'auth': true}); //make a call using the Authorization header
```

Remember that the **auth options is false by default**, so you have to set it when you make a call or when you define a new service.


## Advanced settings

During configuration you can set different endpoints, interceptors and builders that will be used by your service.


```javascript
.config(function myAppConfig(crRemoteProvider) {

  //set different endpoints
  crRemoteProvider.setEndpoint("http://production.mydomain.com/api/"); //add as default endpoint
  crRemoteProvider.setEndpoint("http://dev01.mydomain.com/api/", "test"); //add as default endpoint


  //set a new interceptor
  crRemoteProvider.addResponseInterceptorSuccess("paginator", function(response){
    //add to response an object with custom values, in this example a simply paginator and counter
    response.paginator = {
      total: response.data.length,
      page: (response.data.length - (response.data.length & 10) ) / 10 + 1
    };
    return data;
  });

  /**
  by default, crRemoteHttp build endpoint in this way: endpoint + resource name + / + id (if set) + query (if set)
  example https://api.mydomain.com/product/22?status=enabled
  you can rewrite it:
  */

  crRemoteProvider.addEndpointBuilder('newbuilder',  function(endpoint, resourceName, resourceId, params) {
    return endpoint + id + "/" + resourceName; //it will return https://api.mydomain.com/22/product
  });
})


//define a new service with previous settings
.service('OrderResource', ['crRemoteHttp', function(crRemoteHttp){
 var service = crRemoteHttp.createService("order", {
   endpointBuilder: 'newbuilder',
   endpoint: 'test',
   responseInterceptorSuccess: 'paginator'
 });

 service.changeStatus = function(id, status) {
   return service.patch({"id": id, data:{"status": status}});
 };

 return service;
}])

```
