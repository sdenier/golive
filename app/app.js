"use strict";

angular.module('golive', [])
  .value('config', {
    dataSource: {
      url: '/lastresults.json',
      pollInterval: 30,
      status: 'stopped'
    },
    scrolling: {
      step: 200,
      interval: 5,
      animation: 1
    },
    columns: {
      height: 630
    }
  });
