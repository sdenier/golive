"use strict";

var App = {
  init: function init() {
    angular.module('golive', []).controller('MainCtrl', function($scope, $http) {
      $http.get('/osplitsdata.json').success(function(data) {
        console.log(data, _(data.circuits).pluck('description'));
        $scope.courses = _(data.circuits).pluck('description').value();
      });
    });
  }
};

module.exports = App;
