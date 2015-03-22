"use strict";

angular.module('golive', [])
  .constant('glConstants', {
    pollInterval: 30000,
    scroll: {
      step: 100,
      interval: 5000,
      animation: 500
    }
  });
