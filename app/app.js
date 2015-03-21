"use strict";

var App = {
  init: function init() {
    angular.module('golive', []).controller('MainCtrl', function($scope, $http, $interval) {

      function pollData() {
        $http.get('/lastresults.json').success(function(data) {
          $scope.lastTime = data.lastTime;
          $scope.stageName = data.name;
          $scope.courses = data.courses;
        });
      }

      var polling;
      $scope.start = function() {
        polling = $interval(pollData, 5000);
      };
      $scope.stop = function() {
        $interval.cancel(polling);
      };

      pollData();

    });
  }
};

module.exports = App;
