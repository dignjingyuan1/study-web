define([], function () {
	// controller
	return ["$scope","$state", function ($scope,$state) {
        $scope.go = function (text) {
            $state.go(text)
        }
		/**
         * 提交
         */
        $scope.sub = function(){
            _post({
                url: STUDY_API + "/user/saveUser",
                param: {
                    userId: user.userId,
                    userSchool: $scope.userSchool,
                    userSex: $scope.userSex,
                    userCompany: $scope.userCompany,
                    userPosition: $scope.userPosition,
                    userRemark: $scope.userRemark,
                    userHeader: $("#head-img").attr("src"),
                    userName: $scope.userName
                },
                callback: function(res){
                    if(res.code == '2000'){
                        $scope.searchUserDetails();
                    }
                }
            })
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
            $state.go("home");
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
                        $scope.$applyAsync();
                    }
                }
            })
        }
        $scope.searchUserDetails();
	}];
});