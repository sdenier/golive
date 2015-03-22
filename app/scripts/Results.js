angular.module('golive')
  .value('dataSource', {
    url: '/lastresults.json',
    pollInterval: 30,
    status: 'stopped'
  })
  .factory('Results', function Results($http, $interval, dataSource) {

    var stage = {},
        results = [];
    var polling;

    function pollData() {
      var previousStatus = dataSource.status;
      dataSource.status = 'polling';
      $http.get(dataSource.url).success(function(data) {
        stage.lastTime = data.lastTime;
        stage.name = data.name;
        results = data.results;
        dataSource.status = previousStatus;
      });
    }

    return {
      stage: {},
      resultNames: function() {
        return _.pluck(results, 'name');
      },
      findResult: function(name) {
        return results.findWhere({name: name});
      },
      refresh: function() {
        pollData();
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
