"use strict";

var App = {
  init: function init() {
    angular.module('golive', [])
    .constant('glConstants', {
      pollInterval: 20000,
      scroll: {
        step: 100,
        interval: 5000,
        animation: 500
      }
    })
    .controller('MainCtrl', function($scope, $http, $interval, glConstants) {

      function pollData() {
        var previousStatus = $scope.pollingStatus;
        $scope.pollingStatus = 'Polling';
        $http.get('/lastresults.json').success(function(data) {
          console.log('new results');
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
        polling = $interval(pollData, glConstants.pollInterval);
        $scope.pollingStatus = 'Running';
      };

      $scope.stop = function() {
        $interval.cancel(polling);
        $scope.pollingStatus = 'Stopped';
      };

    })
    .directive('glAutoScroll', function($interval, glConstants) {
      return {
        restrict: 'A',
        scope: {},
        link: function(scope, element) {
          var scrolling = $interval(function() {
            var scrollTop = element[0].scrollTop,
                scrollHeight = element[0].scrollHeight,
                clientHeight = element[0].clientHeight,
                atEnd = scrollTop + clientHeight >= scrollHeight,
                newScrollTop = atEnd ? 0 : scrollTop + glConstants.scroll.step;

            $(element).animate({
              scrollTop: newScrollTop
            }, glConstants.scroll.animation);
          }, glConstants.scroll.interval);

          scope.$on('$destroy', function() {
            $interval.cancel(scrolling);
          });
        }
      };
    });
  }
};

module.exports = App;
