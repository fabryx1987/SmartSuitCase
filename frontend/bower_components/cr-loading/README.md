# crLoading
[![Build Status](https://travis-ci.org/ngutils/cr-loading.svg)](https://travis-ci.org/ngutils/cr-loading)  

## Overview

crLoading works with [angular-loading-bar](https://github.com/chieffancypants/angular-loading-bar) that show spinnsers and loading bar when during $http calls. When a form/button starts a $http call, crLoading disables the form/button showing a spinner inside. Oh yeah!

![](http://s11.postimg.org/8ypjcppz7/crloading_2_1.gif)


## Install

```
bower install cr-loading
```
add to your html:

```html
<script src="bower_components/angular-animate/angular-animate.js"></script>
<script src="bower_components/angular-loading-bar/build/loading-bar.js"></script>
<script src="bower_components/cr-loading/cr-loading.js"></script>
<link href="bower_components/angular-loading-bar/build/loading-bar.css" rel="stylesheet"></link>
```
then inject it:

```javascript
angular.module("myApp", [
  "cr-loading"
])
```

## Usage

You can add it to a button:

```html
<button class="btn" cr-loading>Login</button>
```

or a form (that must contain a `submit` button):

```html
<form cr-loading ng-submit="send()">
  <!-- inputs... -->
 <button type='submit'>Send</button>
</form>
```

If you're using Font Awesome crLoading will show a spinner inside the button.

## Configuration

You can change the css class appended to the button with the `crLoadingProvider`.

```javascript
angular.module("myApp", [
  "cr-loading"
])
.config(["crLoadingProvider", function(crLoadingProvider){
  crLoadingProvider.setClickSpinnerClass("my custom class");
});
```
