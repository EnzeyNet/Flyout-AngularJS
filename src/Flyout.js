(function (angular) {
    "use strict";

	var module = angular.module('net.enzey.flyout', []);
	var repositionEventTrigger = 'NZ_EVENT_REPOSITION';

	module.directive('nzFlyout', function ($compile) {
		return {
			priority: 9999,
			compile: function ($element, $attrs) {
				angular.extend($element[0], EnzeyNet.FlyoutServices.prototype);
				$element[0].createdCallback();

				return {
					pre: function(scope, element, attrs) {
						var displayFlyout = element[0].displayFlyout;
						var lastFlyoutContainer = null;
						element[0].displayFlyout = function() {
							displayFlyout.call(this, arguments);
							if (lastFlyoutContainer != element[0].flyoutContainer) {
								lastFlyoutContainer = element[0].flyoutContainer;
								$compile(lastFlyoutContainer)(scope);
								scope.$apply();
							}
						}
					},
					post: function(scope, element, attrs) {
						element[0].attachedCallback();
					}
				}

			}
		};

	});

})(angular);