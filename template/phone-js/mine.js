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

        $scope.searchUserDetails = function () {
            _get({
                url: STUDY_API + "/user/getUserDetails",
                param: {
                    userId: user.userId
                },
                callback: function (res) {
                    if (res.code == '2000') {
                        var data = res.data;
                        $scope.userPhone = data.userPhone;
                        $scope.userSchool = data.userSchool;
                        $scope.userSex = data.userSex;
                        $scope.userCompany = data.userCompany;
                        $scope.userPosition = data.userPosition;
                        $scope.userRemark = data.userRemark;
                        $scope.userName = data.userName;
                        $scope.userHeader = data.userHeader ? data.userHeader : img/defalte-head.jpg;
                        $scope.userIntegral = data.userIntegral;
                        $scope.userAmount = data.userAmount;
                        $scope.userRole = data.userRole;
                        $scope.userQrcode = data.userQrcode;
                        $scope.userRecommendCount = data.userRecommendCount;
                        user.userName = $scope.userName;
                        user.userHeader = $scope.userHeader;
                        setUser(user)
                        $scope.$applyAsync();
                    }
                }
            })
        }
        $scope.searchUserDetails();
        console.log("userInfo:", $scope.userInfo)
        $scope.logOut = function () {
            localStorage.clear();
            $state.go("home");
        }
    }];
});