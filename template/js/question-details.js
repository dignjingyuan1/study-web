define([], function () {
	
	// controller
	return ["$scope","$state", function ($scope,$state) {
		
		$scope.problemId = $state.params.id;
		
		
		$scope.searchProblemDetails = function(){
			_get({
				url: STUDY_API + "/problem/getProblemDetails",
				param: {
					problemId: $scope.problemId
				},
				callback: function(res){
					console.log(res);
					if(res.code == "2000"){
						$scope.item = res.data;
						$scope.$applyAsync();
					}
				}
			})
		}
		
		$scope.searchProblemDetails();
	}];
});