angular.module('golive')
  .controller('MainCtrl', function($scope, Results, config, dataSource) {

    // Main view
    $scope.stage = Results.stage;
    $scope.dataSource = dataSource;

    $scope.columnResults = function() {
      return _.compact($scope.columnSelectors.map(function(selector) {
        return Results.resultsFor(selector);
      }));
    };

    $scope.columns = config.columns;

    $scope.columnSelectors = [];
    Results.refresh().then(function() {
      $scope.columnSelectors = Results.names();
    });

  });
