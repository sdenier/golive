angular.module('golive')
  .controller('MainCtrl', function($scope, $http, $interval, config) {

    $scope.dataSource = config.dataSource;
    $scope.scrolling = config.scrolling;
    $scope.columns = config.columns;

    function pollData() {
      var previousStatus = config.dataSource.status;
      config.dataSource.status = 'polling';
      $http.get(config.dataSource.url).success(function(data) {
        $scope.lastTime = data.lastTime;
        $scope.stageName = data.name;
        $scope.results = data.results;
        config.dataSource.status = previousStatus;
      });
    }

    pollData();

    $scope.refresh = function() {
      pollData();
    };

    var polling;
    $scope.start = function() {
      polling = $interval(pollData, config.dataSource.pollInterval * 1000);
      config.dataSource.status = 'running';
    };

    $scope.stop = function() {
      $interval.cancel(polling);
      config.dataSource.status = 'stopped';
    };

  });
