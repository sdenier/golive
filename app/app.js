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
    }
  })
  .value('layouts', [{
    name: '4 columns',
    url: 'views/columns4.html'
  }, {
    name: '6 columns',
    url: 'views/columns6.html'
  }]);
