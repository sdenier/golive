angular.module('golive')
  .controller('MainCtrl', function($scope, Results, config, dataSource) {

    // Main view
    $scope.stage = Results.stage;
    $scope.columnResults = function() {
      return _.compact($scope.columnSelectors.map(function(selector) {
        return Results.results[selector];
      }));
    };

    // Config
    $scope.scrolling = config.scrolling;
    $scope.columns = config.columns;
    $scope.dataSource = dataSource;
    $scope.columnSelectors = [];

    Results.refresh();

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
