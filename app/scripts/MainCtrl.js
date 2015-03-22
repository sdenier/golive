angular.module('golive')
  .controller('MainCtrl', function($scope, $http, $interval, glConstants) {

    function pollData() {
      var previousStatus = $scope.pollingStatus;
      $scope.pollingStatus = 'Polling';
      $http.get('/lastresults.json').success(function(data) {
        console.log('new results');
        $scope.lastTime = data.lastTime;
        $scope.stageName = data.name;
        $scope.results = data.results;
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

  });
