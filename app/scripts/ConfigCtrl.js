angular.module('golive')
  .controller('ConfigCtrl', function($scope, Results, config, dataSource) {

    $scope.scrolling = config.scrolling;
    $scope.columns = config.columns;
    $scope.dataSource = dataSource;

    $scope.resultNames = function() {
      return Results.names();
    };

    $scope.refresh = function() {
      Results.refresh();
    };

    $scope.start = function() {
      Results.startPolling();
    };

    $scope.stop = function() {
      Results.stopPolling();
    };

  });
