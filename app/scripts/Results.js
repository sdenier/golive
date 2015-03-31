angular.module('golive')
  .value('dataSource', {
    url: '/json/lastresults',
    pollInterval: 30,
    status: 'stopped'
  })
  .factory('Results', function Results($http, $interval, dataSource) {

    var stage = {},
        results = {};
    var previousStatus = dataSource.status,
        polling;

    function pollData() {
      dataSource.status = 'polling';
      return $http.get(dataSource.url).success(function(data) {
        stage.lastTime = data.lastTime;
        stage.name = data.name;
        data.results.forEach(function(result) {
          results[result.name] = transformResult(result, data.lastTime);
        });
        dataSource.status = previousStatus;
      }).error(function() {
        dataSource.status = 'error';
      });
    }

    function transformResult(result, lastTime) {
      var latestTime = lastTime - 60000;
      var recentTime = lastTime - 5 * 60000;
      result.rankedRunners.concat(result.unrankedRunners).forEach(function(runner) {
        runner.isLatest = runner.readTime >= latestTime && runner.readTime;
        runner.isRecent = runner.readTime >= recentTime && runner.readTime < latestTime;        
      });
      result.unrankedRunners.forEach(function(runner) {
        runner.rank = runner.nc ? 'nc' : '';
      });
      return result;
    }

    return {
      stage: stage,
      resultsFor: function(name) {
        return results[name];
      },
      names: function() {
        return _.pluck(results, 'name');
      },
      refresh: function() {
        results = {}; // reset previous results
        return pollData();
      },
      startPolling: function() {
        if (!polling) {
          polling = $interval(pollData, dataSource.pollInterval * 1000);
          dataSource.status = previousStatus = 'running';
        }
      },
      stopPolling: function() {
        if (polling) {
          $interval.cancel(polling);
          dataSource.status = previousStatus = 'stopped';
          polling = undefined;
        }
      }
    }

  });
