define([], function () {
	
	// controller
	return ["$scope","$state", function ($scope,$state) {
		Pager.index = 1;
		Pager.limit = 8;
		/**
		 * 查找企业列表
		 */
		$scope.searchTeacherPager = function(){
			var pageNo = Pager.index;
			_get({
				url: STUDY_API + "/teacher/getTeacherPager",
				param: {
					pageNo: pageNo,
					pageSize: 8
				},
				callback: function(res){
					console.log(res)
					if(res.code == '2000'){
						$scope.teacherList = res.rows;
						Pager.total = res.total;
						Pager.Init();
						Pager.onLoad = $scope.searchTeacherPager;
						$scope.$applyAsync();
					}
				}
			})
		}
		
		$scope.goTeacherDetails = function(id){
			$state.go("teacher-details",{id: id})
		}
		
		$scope.searchTeacherPager();
	}];
});