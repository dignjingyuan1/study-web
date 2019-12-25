define([], function () {
    // controller
    return ["$scope", "$state", function ($scope, $state) {
        $scope.go = function (text) {
            $state.go(text)
        }
        $scope.goto = function (text) {
            if ($scope.userInfo) {
                $state.go(text)
            } else {
				$state.go("phone-login");
            }
        }
        var user = getUser();
        $scope.userInfo = null;
        if (user) {
            $scope.userInfo = user;
            if (!$scope.userInfo.userHeader) {
                $scope.userInfo.userHeader = "img/defalte-head.jpg"
            }
        }
        console.log("userInfo:", $scope.userInfo)
        $scope.logOut = function () {
			localStorage.clear();
			$state.go("phone-home");
        }
    }];
});