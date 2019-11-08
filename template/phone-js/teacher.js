define([], function () {
	
	// controller
	return ["$scope","$state", function ($scope,$state) {
		Pager.index = 1;
		Pager.limit = 8;
		/**
		 * 查找企业列表
		 */
		$scope.searchTeacherPager = function(text){
			var pageNo = Pager.index;
			_get({
				url: STUDY_API + "/teacher/getTeacherPager",
				param: {
					pageNo: pageNo,
					pageSize: 1000,
					teacherName:text
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
			$state.go("phone-teacher-detail",{id: id})
		}
		
		$scope.searchTeacherPager();

		// 搜索
		document.getElementById("searchButton").addEventListener('keydown', function(e){
            var keywd = e.target.value;
            if(event.keyCode == 13 && keywd) {
                $scope.searchTeacherPager(document.getElementById("searchButton").value);
            } 
        });
	}];
});