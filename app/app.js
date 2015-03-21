"use strict";

var App = {
  init: function init() {
    angular.module('golive', []).controller('MainCtrl', function($scope, $http, $interval) {

      function pollData() {
        var previousStatus = $scope.pollingStatus;
        $scope.pollingStatus = 'Polling';
        $http.get('/lastresults.json').success(function(data) {
          $scope.lastTime = data.lastTime;
          $scope.stageName = data.name;
          $scope.courses = data.courses;
          $scope.pollingStatus = previousStatus;
        });
      }

      $scope.pollingStatus = 'Stopped';

      $scope.refresh = function() {
        pollData();
      };
      pollData();

      var polling;
      $scope.start = function() {
        polling = $interval(pollData, 5000);
        $scope.pollingStatus = 'Running';
      };

      $scope.stop = function() {
        $interval.cancel(polling);
        $scope.pollingStatus = 'Stopped';
      };

    });
  }
};

module.exports = App;
