define([], function () {
	
	// controller
	return ["$scope","$state", function ($scope,$state) {
		$scope.price = $state.params.price;
		/**
		 * 保存提现记录
		 */
		$scope.saveCashphone = function(){
			console.log("123123")
			if(!$scope.cashUserName){
				_successMsg("用户名不许为空！")
				return;
			} else if(!$scope.backNo){
				_successMsg("银行账号不许为空！")
				return;
			}else if(!$scope.backName){
				_successMsg("开户行不许为空！")
				return;
			}else if(!$scope.amount && $scope.amount * 1 > $scope.price * 1){
				_successMsg("金额不许为空并且不能大于提现金额！")
				return;
			} else {
				_post({
					url: STUDY_API + "/cash/saveCash",
					param: {
						cashBackNo: $scope.backNo,
						cashBackName: $scope.backName,
						cashUserName: $scope.cashUserName,
						cashAmount: $scope.amount
					},
					callback: function(res){
						if(res.code == '2000'){
							_successMsg("提交成功！")
							window.history.go(-1)
						}
					}
				})
			}
		}
	}];
});