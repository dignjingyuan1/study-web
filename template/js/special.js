define([], function () {
	
	// controller
	return ["$scope","$state", function ($scope,$state) {
		
		/**
		 * 
		 */
		$scope.searchCourseGroupTypeList = function(){
			_get({
				url: STUDY_API + "/courseGroupType/getCourseGroupTypeSpecial",
				callback: function(res){
					console.log(res);
					if(res.code == '2000'){
						$scope.courseGroupTypeList = res.data;
						$scope.$applyAsync();
					}
				}
			})
		}
		
		/**
		   * 跳转到课程详细
		   * @param {Object} id
		   */
		  $scope.goCourseDetails = function(id){
		  	$state.go("course-details",{id:id})
		  }
		
		$scope.searchCourseGroupTypeList();
	}];
});