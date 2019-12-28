define([], function () {
	// controller
	return ["$scope","$state", function ($scope,$state) {
        $scope.go = function (text) {
            $state.go(text)
        }
        var user = getUser();
        $scope.userInfo = null;
        if (user) {
            $scope.userInfo = user;
            if (!$scope.userInfo.userHeader) {
                $scope.userInfo.userHeader = "img/defalte-head.jpg"
            }
        }
	}];
});