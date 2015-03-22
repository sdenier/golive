"use strict";

angular.module('golive', [])
  .value('config', {
    dataSource: {
      url: '/lastresults.json',
      pollInterval: 30,
      status: 'stopped'
    },
    scrolling: {
      step: 100,
      interval: 5,
      animation: 0.5
    }
  });
