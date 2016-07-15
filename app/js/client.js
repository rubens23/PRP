'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');
const app = angular.module('BucketListApp', [ngRoute]);

require('./controllers')(app);
require('./directives')(app);
require('./services')(app);

app.config(function($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl: './views/partials/home.html',
    controller: 'AuthController',
    controllerAs: 'ac'
  })
  .when('/blog',{
    templateUrl: './views/partials/blog.html',
    controller: 'BlogController',
    controllerAs: 'bc'
  })
  .when('/blog-admin', {
    templateUrl: './views/partials/blog-admin.html',
    controller: 'BlogAdminController',
    controllerAs: 'bac'
  })
  .when('/profile-admin', {
    templateUrl: './views/partials/profile-admin.html',
    controller: 'ProfileAdminController',
    controllerAs: 'pac'
  })
  .when('/profile', {
    templateUrl: './views/partials/profile.html',
    controller: 'ProfileController',
    controllerAs: 'pc'
  })
  .otherwise({
    redirectTo: '/'
  });
});
