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
        $scope.searchUserDetails = function(){
            _get({
                url: STUDY_API + "/user/getUserDetails",
                param: {
                    userId: user.userId
                },
                callback: function(res){
                    console.log(res);
                    if(res.code == '2000'){
                        var data = res.data;
                        $scope.userPhone = data.userPhone;
                        $scope.userSchool = data.userSchool;
                        $scope.userSex = data.userSex;
                        $scope.userCompany = data.userCompany;
                        $scope.userPosition = data.userPosition;
                        $scope.userRemark = data.userRemark;
                        $scope.userName = data.userName;
                        data.userHeader ? $("#head-img").attr("src", data.userHeader) : '';
                        $scope.userIntegral = data.userIntegral;
                        $scope.userAmount = data.userAmount;
                        $scope.userRole = data.userRole;
                        $scope.userQrcode = data.userQrcode;
                        $scope.userRecommendCount = data.userRecommendCount;
                        $scope.$applyAsync();
                    }
                }
            })
        }
        $scope.searchUserDetails();
	}];
});