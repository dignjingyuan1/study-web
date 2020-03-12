define([], function () {
	// controller
	return ["$scope","$state", function ($scope,$state) {
	    $scope.goto = function(text){
	        $state.go(text)
	    }


	}];
});
