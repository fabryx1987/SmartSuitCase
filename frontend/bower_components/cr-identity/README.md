# crIdentity
[![Build Status](https://api.travis-ci.org/ngutils/cr-identity.svg?branch=master)](https://travis-ci.org/ngutils/cr-identity)

## Overview

crIdentity helps you to manage user's identity with ([crSession](https://github.com/ngutils/cr-session) and [crAcl](https://github.com/ngutils/cr-acl)). crIdentity stores in local storage (with a fallback on cookies) the user's identity restoring it after page reload/new tab opening. So your users identity will be ever consistent.


## Install

```bash
bower install cr-identity
```
add to your html:

```html
<script src="bower_components/cr-acl/cr-acl.js"></script>
<script src="bower_components/cr-identity/cr-identity.js"></script>
<script src="bower_components/cr-session/cr-session.js"></script>
```

then inject it:

```javascript
angular.module(
        'ngtest',
        [
            'ui.router',
            'cr.acl',
            'cr.session',
            'cr.identity'
        ]
)
```

## What's an identity

The identity consists of and object with:

1. a `role` (for example *ROLE_USER*) that can be used to manage access to routes and resources vith crAcl
2. a `provider`(for example *facebook*) to remember which is the identity provider
3. a `user` object (for example *{'name': 'Bruce Banner', 'age': 30}*) that's the data that will be stored in session

## Create a new identity

You can create and destroy a identity triggering events where you need. Imagine that your backend sends back the user's identity after a successful login:

```javascript
/*
the backend returns
{
  'role': 'ROLE_USER',
  'identity': {
    'name': 'Bruce Banner',
    'age': 30
  }
}
*/

$scope.$broadcast("auth:login:success", {'role': backend.role, 'provider': 'fakelogin', 'user': backend.identity});
```

This event will start the identity, then you can catch the `auth:identity:success` when the identity is ready, then run your logic:

```javascript
$scope.$on("auth:identity:success", function(identity) {
  console.log(identity);
  $state.go("reserved-area"); //for example redirect to a specific route
});
```

## Restore an identity

Whenever your app starts (for example after a page reload or new tab opened) crIdentity rebuilds the identity, letting you to manage the restore with a promise:

```javascript
crIdentity.restore().then(function(identity) {
  //add your logic
});
```

or catching an event:

```javascript
$scope.$on("auth:restore:success", function(identity) {
  //add your logic
});
```

## Destroy an identity

You can purge your identity (and related session) triggering an event:

```javascript
$scope.$broadcast("auth:logout:success");
```

then you can catch the successful purge event:

```javascript
$scope.$on("auth:purge:success", function() {
  $state.go("home"); //for example redirect to home after logout
});
```
