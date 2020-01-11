define([], function () {
	// controller
	return ["$scope","$state", function ($scope,$state) {
		$scope.go = function(text){
			$state.go(text)
		}
		var user = localStorage.getItem('user');
		$scope.userInfo = null;
		if(user){
			$scope.userInfo = JSON.parse(user);
			if(!$scope.userInfo.userHeader){
				$scope.userInfo.userHeader = "img/defalte-head.jpg"
			}
		}
		console.log("userInfo:", $scope.userInfo)

		$scope.pager = {
			index: 1,
			limit: 10
		}
		$scope.orderList = [];
		/**
		 * 查找订单列表
		 */
		$scope.searchOrderList = function(){
			_get({
				url: STUDY_API + "/order/getOrderList",
				param: {
					pageNo: $scope.pager.index,
					pageSize: 10,
				},
				callback: function(res){
					if(res.code == '2000' && res.rows){
						if (res.rows && res.rows.length){
							for (var i=0; i<res.rows.length; i++){
								$scope.orderList.push(res.rows[i])
							}
						}
						$scope.$applyAsync();
					}
				}
			})
		}
		$scope.searchOrderList();

		// 翻页
		$(window).scroll(function () {
			var scrollTop = $(this).scrollTop();
			var scrollHeight = $(document).height();
			var windowHeight = $(this).height();
			if (scrollTop + windowHeight == scrollHeight && location.href.indexOf("phone-mine-course") != -1) {
				// alert("已经到最底部了！");
				$scope.pager.index++;
				$scope.searchOrderList();
			}
		});
	}];
});