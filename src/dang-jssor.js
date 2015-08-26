'use strict';
// widlely inspired by: https://github.com/adebisi-fa/dang-jssor

angular.module('gdWebApp')
	.directive("enableJssor",  ['$window', function($window) {
	    return {
	        restrict: "A",
	        scope: {
	            jssorOptions: "=",
	            jssorOnChanged: "&",
	            jssorObject: "="
	        },
	        link: function (scope, element, attrs) {
            if (attrs.jssorTrigger == 'true') {
              var container = angular.element(element).closest('.slides-container');

              if (!container.attr("id")) {
                container.attr("id", new Date().getTime());
              }

              if (scope.jssorOptions === undefined) {
              	scope.jssorOptions = {};
              }

              var slideId = container.attr("id");

              var slider = new $JssorSlider$(slideId, scope.jssorOptions); // jshint ignore:line

            	var handle = {
                  slidesCount: slider.$SlidesCount(),
                  slider: slider,
                  playTo: function (index) {
                      slider.$PlayTo(index);
                  },
                  goTo: function (index) {
                      slider.$GoTo(index);
                  },
                  pause: function () {
                      slider.$Pause();
                  },
                  play: function () {
                      slider.$Play();
                  },
                  previous: function () {
                      slider.$Previous();
                  },
                  next: function () {
                      slider.$Next();
                  }
                };

            	if (scope.jssorOptions) {
                	scope.jssorOptions.handle = handle;
								}

              if (scope.jssorObject) {
                  scope.jssorObject = handle;
								}

            	if (scope.jssorOptions.$StartIndex === undefined || scope.jssorOptions.$StartIndex === null) {
            		scope.jssorOptions.$StartIndex = 0;
              }

            	handle.playTo(scope.jssorOptions.$StartIndex);

              if (scope.jssorOptions.onReady) {
              	scope.jssorOptions.onReady();
              }

              var ScaleSlider = function() {
                  var parentWidth = $('#' + slideId).parent().width();
                  if (parentWidth) {
                    slider.$ScaleWidth(parentWidth);
                  }
                  else {
                    $window.setTimeout(ScaleSlider, 30);
									}

									angular.element(".img-slide").attr('style', ''); // remove dynamic style which was hidding 3rd and next images
              };

              //Scale slider after document ready
              ScaleSlider();

              //Scale slider while window load/resize/orientationchange.
              angular.element($window).bind("load", ScaleSlider);
							angular.element($window).bind("resize", ScaleSlider);
							angular.element($window).bind("orientationchange", ScaleSlider);
              //responsive code end

              slider.$On($JssorSlider$. $EVT_PARK, function (slideIndex, fromIndex) {  // jshint ignore:line
                  var status = null;

                  scope.$emit("JssorSliderChanged", status = {
                      name: scope.jssorOptions.name,
                      slideIndex: slideIndex,
                      fromIndex: fromIndex
                  });

                  if (scope.jssorOnChanged) {
                      scope.jssorOnChanged({ jssorData: status });
										}

                  scope.jssorOptions.status = status;

                  if (scope.jssorOptions.name) {
                      console.log("SliderChanged:", scope.jssorOptions.name, angular.toJson(status));
                  }
                  scope.$apply();
              });
            }
	        }
	    };
	}]);
