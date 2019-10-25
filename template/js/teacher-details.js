define([], function () {
	
	// controller
	return ["$scope","$state", function ($scope,$state) {
		
		
		$scope.teacherId = $state.params.id;
		/**
		 * 查找老师详细
		 */
		$scope.searchTeacherDetails = function(){
			_get({
				url:STUDY_API+"/teacher/getTeacherDetails",
				param: {
					teacherId: $scope.teacherId
				},
				callback: function(res){
					console.log(res);
					if(res.code == '2000'){
						$scope.teacherDetails = res.data;
						$scope.$applyAsync();
					}
				}
			})
		}
		
		$scope.searchTeacherDetails();
	}];
});