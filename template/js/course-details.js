define([], function () {
	
	// controller
	return ["$scope","$state", function ($scope,$state) {
		
		$scope.courseGroupId = $state.params.id;
		
		/**
		 * 查找课程组详细
		 */
		$scope.searchCourseGropeDetails = function(){
			_get({
				url : STUDY_API + "/courseGroup/getCourseGroupDetails",
				param: {
					courseGroupId : $scope.courseGroupId
				},
				callback: function(res){
					console.log(res);
					if(res.code == "2000"){
						$scope.courseGroup = res.data;
						$scope.$applyAsync();
					}
				}
			})
		}
		
		$scope.searchCourseGropeDetails();
	}];
});