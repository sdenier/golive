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
    name: '1 + 6 columns',
    url: 'views/columns1-6.html'
  }, {
    name: '3 columns',
    url: 'views/columns3.html'
  }, {
    name: '3 columns ROA',
    url: 'views/columns3-roa.html'
  }, {
    name: '4 columns',
    url: 'views/columns4.html'
  }, {
    name: '6 columns',
    url: 'views/columns6.html'
  }]);
