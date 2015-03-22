angular.module('golive')
  .directive('glAutoScroll', function($timeout, $interval, glConstants) {
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
              newScrollTop = atEnd ? 0 : scrollTop + glConstants.scroll.step;

            $(element).animate({
              scrollTop: newScrollTop
            }, glConstants.scroll.animation);
          }, glConstants.scroll.interval);
        }, scope.delay * 250);

        scope.$on('$destroy', function() {
          if (scrolling) {
            $interval.cancel(scrolling);
          }
        });
      }
    };
  });
