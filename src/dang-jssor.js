angular.module("dang-jssor", [])
	.directive("enableJssor", function () {
	    return {
	        restrict: "A",
	        scope: {
	            jssorOptions: "="
	        },
	        link: function (scope, element, attrs) {
	            if (attrs.jssorTrigger == 'true') {
	                var container = $(element).closest('.slides-container');
	                
	                if (!container.attr("id"))
	                	container.attr("id", new Date().getTime());

	                var slider = new $JssorSlider$(container.attr("id"), scope.jssorOptions);
                
	                slider.$On($JssorSlider$.$EVT_PARK, function (slideIndex, fromIndex) {
	                    var status = null;
	                    scope.$emit("JssorSliderChanged", status = {
	                        name: scope.jssorOptions.name,
	                        slideIndex: slideIndex,
	                        fromIndex: fromIndex
	                    });

	                    if (scope.jssorOptions.name) {
	                        console.log("SliderChanged:", scope.jssorOptions.name, angular.toJson(status));
	                    }
	                    scope.$apply();
	                });
	            }
	        }
	    }
	});