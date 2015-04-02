"use strict";

angular.module('golive', [])
  .value('config', {
    scrolling: {
      step: 400,
      interval: 10,
      animation: 1
    },
    columns: {
      height: 630
    },
    banner: {
      active: true
    }
  })
  .value('layouts', [{
    name: '2 + 4 columns',
    url: 'views/columns2-4.html'
  }, {
    name: '2 + 8 columns',
    url: 'views/columns2-8.html'
  }, {
    name: '4 columns',
    url: 'views/columns4.html'
  }, {
    name: '6 columns',
    url: 'views/columns6.html'
  }]);
