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
  });
