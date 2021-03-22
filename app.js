// MODULE
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

// ROUTES
weatherApp.config(function ($routeProvider) {

    $routeProvider

        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'homeController'
        })

        .when('/forecast', {
            templateUrl: 'pages/forecast.html',
            controller: 'forecastController'
        })

        .when('/forecast/:days', {
            templateUrl: 'pages/forecast.html',
            controller: 'forecastController'
        })

        .when('/forecast/5', {
            templateUrl: 'pages/forecast.html',
            controller: 'forecastController'
        })

        .when('/forecast/15', {
            templateUrl: 'pages/forecast.html',
            controller: 'forecastController'
        })

        .when('/forecast/10', {
            templateUrl: 'pages/forecast.html',
            controller: 'forecastController'
        })

});

// SERVICES
weatherApp.service('cityService', function() {

    this.city = "Delhi";

});

// CONTROLLERS
weatherApp.controller('homeController', ['$scope', 'cityService', function($scope, cityService) {

    $scope.city = cityService.city;

    $scope.$watch('city', function() {
        cityService.city = $scope.city;
    });

}]);

weatherApp.controller('forecastController', ['$scope', '$resource', '$routeParams', 'cityService', function($scope, $resource, $routeParams, cityService) {

    $scope.city = cityService.city;

    $scope.days = $routeParams.days || 2;

    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast?APPID=ee9fb9b11bcf2e7c901570fbedb5ea2d",{ callback: "JSON_CALLBACK" }, { get: { method: "JSONP" }});

    $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: $scope.days });

    console.log($scope.weatherResult);

    $scope.convertToCelsius = function(temp)
    {
        return Math.round(1.8 * (temp - 273)+ 32);

    }

    $scope.convertToDate = function(dt) {

        return new Date(dt * 1000);

    };

}]);
