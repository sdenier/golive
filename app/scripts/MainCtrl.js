angular.module('golive')
  .controller('MainCtrl', function($scope, Results, config, dataSource) {

    $scope.scrolling = config.scrolling;
    $scope.columns = config.columns;
    $scope.dataSource = dataSource;

    $scope.columnResults = [];
    $scope.columnSelectors = [];

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
