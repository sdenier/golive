angular.module('golive')
  .value('dataSource', {
    url: '/lastresults.json',
    pollInterval: 30,
    status: 'stopped'
  })
  .factory('Results', function Results($http, $interval, dataSource) {

    var stage = {},
        results = {};
    var polling;

    function pollData() {
      var previousStatus = dataSource.status;
      dataSource.status = 'polling';
      return $http.get(dataSource.url).success(function(data) {
        stage.lastTime = data.lastTime;
        stage.name = data.name;
        data.results.forEach(function(result) {
          results[result.name] = transformResult(result);
        })
        dataSource.status = previousStatus;
      });
    }

    function transformResult(result) {
      result.unrankedRunners.forEach(function(runner) {
        runner.rank = runner.nc ? 'nc' : '';
      });
      return result;
    }

    return {
      stage: stage,
      results: results,
      names: function() {
        return _.pluck(results, 'name');
      },
      refresh: function() {
        return pollData();
      },
      startPolling: function() {
        if (!polling) {
          polling = $interval(pollData, dataSource.pollInterval * 1000);
          dataSource.status = 'running';          
        }
      },
      stopPolling: function() {
        if (polling) {
          $interval.cancel(polling);
          dataSource.status = 'stopped';
          polling = undefined;
        }
      }
    }

  });
