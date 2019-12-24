define([], function () {
	
	// controller
	return ["$scope","$state", function ($scope,$state) {

		$scope.typeCode = $state.params.typeCode;

        $scope.go = function(path){
            $state.go(path)
        };
        $scope.isShowType = "";

		$scope.groupChange = function(name){
            $scope.isShowType = name;
		};
		
		/**
		   * 跳转到课程详细
		   * @param {Object} id
		   */
		  $scope.goCourseDetails = function(id){
			$state.go("phone-course-detail",{id:id})
		  };
		var Pager = {
		  	limit: 10,
			index: 1
		};
		$scope.courseList = [];
		/**
		 * 分页
		 * @param {Object} item
		 */
		$scope.searchPager = function(){
			_get({
				url: STUDY_API + "/courseGroup/getCourseGroupPagerApi",
				param: {
					courseGroupTypeId: $scope.typeCode,
					pageNo: Pager.index,
					pageSize: 1000,
					courseGroupName: $scope.courseGroupName,
					courseIsSpecial: '0'
				},
				callback: function(res){
					if(res.code == '2000'){
						$scope.courseList = res.rows;
						$scope.$applyAsync();
					}
				}
			})
		};

		$scope.searchPager();
		// 搜索
        document.getElementById("searchButton").addEventListener('keydown', function(e){
            var keywd = e.target.value;
            if(event.keyCode == 13) {
                $scope.searchPager();
            } 
        });
	}];
});