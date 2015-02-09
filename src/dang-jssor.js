angular.module("dang-jssor", [])
	.factory("jssorServices", function () {
		return {
			random: function (minimum, maximum) {
				return Math.floor((Math.random() * (maximum + 1 - minimum) + minimum));
			}
		};
	})
	.directive("enableJssor", function () {
	    return {
	        restrict: "A",
	        scope: {
	            jssorOptions: "=",
	            jssorOnChanged: "&",
	            jssorObject: "="
	        },
	        link: function (scope, element, attrs) {
	            if (attrs.jssorTrigger == 'true') {
	                var container = $(element).closest('.slides-container');

	                if (!container.attr("id"))
	                    container.attr("id", new Date().getTime());

	                if (scope.jssorOptions == undefined)
	                {
	                	console.log("I reassigned options here!");
	                	scope.jssorOptions = {};
	                }

	                var slider = new $JssorSlider$(container.attr("id"), scope.jssorOptions);

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

                	if (scope.jssorOptions)
                    	scope.jssorOptions.handle = handle;

	                if (scope.jssorObject)
	                    scope.jssorObject = handle;

                	if (scope.jssorOptions.$StartIndex == undefined || scope.jssorOptions.$StartIndex == null)
                		scope.jssorOptions.$StartIndex = 0;

                	handle.playTo(scope.jssorOptions.$StartIndex);

	                if (scope.jssorOptions.onReady) {
	                	scope.jssorOptions.onReady();
	                };

	                slider.$On($JssorSlider$.$EVT_PARK, function (slideIndex, fromIndex) {
	                    var status = null;

	                    scope.$emit("JssorSliderChanged", status = {
	                        name: scope.jssorOptions.name,
	                        slideIndex: slideIndex,
	                        fromIndex: fromIndex
	                    });

	                    if (scope.jssorOnChanged)
	                        scope.jssorOnChanged({ jssorData: status });

	                    scope.jssorOptions.status = status;
	                    
	                    //if (scope.jssorOptions.name) {
	                    //    console.log("SliderChanged:", scope.jssorOptions.name, angular.toJson(status));
	                    //}
	                    scope.$apply();
	                });
	            }
	        }
	    }
	});