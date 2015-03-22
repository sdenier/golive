"use strict";

angular.module('golive', [])
  .value('config', {
    scrolling: {
      step: 200,
      interval: 5,
      animation: 1
    },
    columns: {
      height: 630
    }
  });
