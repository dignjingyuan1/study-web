define([], function () {
	
	// controller
	return ["$scope","$state", function ($scope,$state) {
		
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
						var list = res.rows;
						$scope.courseGroupList = list;
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
			$state.go("course-details",{id:id});
		}
		
		$scope.formmaterDate = function(time){
			var date = new Date(time);
			var now = new Date();
			if(date.getTime() > now.getTime()){
				return "即将开始";
			}else{
				return "直播中";
			}
		}
		
		$scope.searchCourseGroupList();
	}];
});