angular.module('golive')
  .controller('ConfigCtrl', function($scope, Results, config, dataSource, layouts) {

    $scope.scrolling = config.scrolling;
    $scope.columns = config.columns;
    $scope.banner = config.banner;
    $scope.dataSource = dataSource;

    $scope.layouts = layouts;
    $scope.columns.layout = _.first(layouts);

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
