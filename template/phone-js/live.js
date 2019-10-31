define([], function () {
	
	// controller
	return ["$scope","$state", function ($scope,$state) {
        $scope.go = function(path){
            $state.go(path)
        }
		Pager.index = 1;
		Pager.limit = 6;
		$scope.searchCourseGroupList = function(){
			var pageNo = Pager.index;
			_get({
				url: STUDY_API +"/courseGroup/getCourseGroupListApi",
				param: {
					pageNo: pageNo,
					pageSize: Pager.limit
				},
				callback: function(res){
					console.log(res);
					if(res.code == '2000'){
						$scope.courseGroupList = res.rows;
						Pager.total = res.total;
						Pager.Init();
						Pager.onLoad = $scope.searchCourseGroupList;
						$scope.$applyAsync();
					}
				}
			})
		}
		
		/**
		 * 查找详细
		 * @param {Object} id
		 */
		$scope.goToDetails = function(id){
			$state.go("phone-course-detail",{id:id});
		}
		
		$scope.searchCourseGroupList();
	}];
});