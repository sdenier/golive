angular.module('golive')
  .directive('glAutoScroll', function($timeout, $interval, config) {
    return {
      restrict: 'A',
      scope: {
        delay: '=glAutoScroll'
      },
      link: function(scope, element) {
        var scrolling;
        $timeout(function() {
          scrolling = $interval(function() {
            var scrollTop = element[0].scrollTop,
              scrollHeight = element[0].scrollHeight,
              clientHeight = element[0].clientHeight,
              atEnd = scrollTop + clientHeight >= scrollHeight,
              newScrollTop = atEnd ? 0 : scrollTop + config.scrolling.step;

            $(element).animate({
              scrollTop: newScrollTop
            }, config.scrolling.animation * 1000);
          }, config.scrolling.interval * 1000);
        }, scope.delay * 1000);

        scope.$on('$destroy', function() {
          if (scrolling) {
            $interval.cancel(scrolling);
          }
        });
      }
    };
  });
