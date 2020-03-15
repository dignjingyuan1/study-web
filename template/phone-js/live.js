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
					if(res.code == '2000' && res.rows){
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
		 * 获取当前课程组的支付情况
		 */
		$scope.searchCourseStatus = function(courseGroupId){
			var payText = "立即支付";
			console.log(payText)
			if(isUserLogin()){
				_get({
					url: STUDY_API + "/order/getOrderSuccessCount",
					cache: false, 
       				async: false,
					param: {
						courseGroupId: 	courseGroupId
					},
					callback: function(res){
						if(res.code == '2000'){
							payText = res.data == "0" ? "未付款" : "已支付";
						}
					}
				})
			}
			return payText;
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