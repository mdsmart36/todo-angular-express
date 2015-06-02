'use strict';

// Declare app level module which depends on filters, and services

angular.module('myApp', [
  'myApp.controllers',
  'myApp.filters',
  'myApp.services',
  'myApp.directives'
]).
config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/', {
      templateUrl: 'partials/login',
      controller: 'MyCtrl1'
    }).
    when('/register', {
      templateUrl: 'partials/register',
      controller: 'MyCtrl2'
    }).
    when('/tasklist', {
      templateUrl: 'partials/tasklist',
      controller: 'MyCtrl3'
    }).
    when('/newtask', {
      templateUrl: 'partials/newtask',
      controller: 'MyCtrl4'
    }).
    otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode(true);

  console.log($('.menu'));
});
