define([], function () {
	// controller
	return ["$scope","$state", function ($scope,$state) {
		$scope.go = function(text){
			$state.go(text)
		}
		var user = getUser();
		$scope.userInfo = null;
		if(user){
		    $scope.userInfo = user;
		    if(!$scope.userInfo.userHeader){
		        $scope.userInfo.userHeader = "img/defalte-head.jpg"
		    }
		}
		console.log("userInfo:", $scope.userInfo)
		$scope.logOut = function () {
			_confirm("确定要退出么？",function(){
				localStorage.clear();
				$state.go("phone-home");
			});
		}
	}];
});