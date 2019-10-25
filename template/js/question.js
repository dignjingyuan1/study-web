define([], function () {
	
	// controller
	return ["$scope","$state", function ($scope,$state) {
		
		/**
		 * 提问
		 */
		$scope.questionSend = function(path){
			$state.go(path)
		}
	}];
});