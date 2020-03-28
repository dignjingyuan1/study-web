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
                _successMsg("用户名不能为空！")
            }else if(!$scope.userPassword){
                _successMsg("密码不能为空！")
            }else{
                var params = {
                    userPhone: $scope.userPhone,
                    userPassword: $scope.userPassword,
                    wxLogin: ISWXWEB ? 1 : null,
                    code: localStorage.getItem('code')
                }
                alert(JSON.stringify(params))
                _post({
                    url: STUDY_API +"/user/login",
                    param: params,
                    callback: function(res){
                        if(res.code == '2000'){
                            var data = res.data;
                            localStorage.setItem("token",data.token);
                            localStorage.setItem("refreshToken",data.refreshToken);
                            $state.go('phone-mine');
                        }else{
                            _successMsg(res.message)
                        }
                    }
                })
            }

        }
	}];
});