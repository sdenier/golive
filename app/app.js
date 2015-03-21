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
        polling = $interval(pollData, 10000);
        $scope.pollingStatus = 'Running';
      };

      $scope.stop = function() {
        $interval.cancel(polling);
        $scope.pollingStatus = 'Stopped';
      };

    })
    .directive('glAutoScroll', function($interval) {
      return {
        restrict: 'A',
        scope: {},
        link: function(scope, element) {
          var scrolling = $interval(function() {
            var scrollTop = element[0].scrollTop,
                scrollHeight = element[0].scrollHeight,
                clientHeight = element[0].clientHeight;

            if (scrollTop + clientHeight >= scrollHeight) {
              element[0].scrollTop = 0;
            } else {
              element[0].scrollTop = scrollTop + 100;
            }
            console.log(element[0].scrollTop, element[0].scrollTop + clientHeight, scrollHeight);
          }, 5000);

          scope.$on('$destroy', function() {
            $interval.cancel(scrolling);
          });
        }
      };
    });
  }
};

module.exports = App;
