define([], function () {
	// controller
	return ["$scope","$state", function ($scope,$state) {
		$scope.go = function(text){
			$state.go(text)
		}
	}];
});