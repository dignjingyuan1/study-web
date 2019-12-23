define([], function () {
	// controller
	return ["$scope","$state", function ($scope,$state) {
	    $scope.goto = function(text){
	        $state.go(text)
	    }

        /**
         * 登录
         */
        $scope.loginPhone =  function(){
            if(!$scope.userPhone){
                _errorMsg("用户名不能为空！")
            }else if(!$scope.userPassword){
                _errorMsg("密码不能为空！")
            }else{
                _post({
                    url: STUDY_API +"/user/login",
                    param: {
                        userPhone: $scope.userPhone,
                        userPassword: $scope.userPassword
                    },
                    callback: function(res){
                        if(res.code == '2000'){
                            var data = res.data;
                            localStorage.setItem("token",data.token);
                            localStorage.setItem("refreshToken",data.refreshToken);
                            $state.go('phone-mine');
                        }else{
                            _errorMsg(res.message)
                        }
                    }
                })
            }

        }
	}];
});