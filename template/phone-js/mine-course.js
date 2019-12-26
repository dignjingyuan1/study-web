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

		/**
		 * 查找订单列表
		 */
		$scope.searchOrderList = function(){
			_get({
				url: STUDY_API + "/order/getOrderList",
				param: {
					pageNo: 1,
					pageSize: 100,
				},
				callback: function(res){
					if(res.code == '2000'){
						$scope.orderList = res.rows;
						$scope.$applyAsync();
					}
				}
			})
		}
	}];
});