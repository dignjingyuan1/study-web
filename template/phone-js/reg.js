define([], function () {
	// controller
	return ["$scope","$state", function ($scope,$state) {
		$scope.recommendUserId = $state.params.recommendUserId;
		console.log($scope.recommendUserId)
        /**
         * 注册
         */
        $scope.register = function(){
            if(!$scope.userPhone){
				_successMsg("用户名不许为空");
            }else if($scope.userPassword && $scope.userPassword != $scope.confirmPassword){
				_successMsg("密码为空，或者两次密码不一致");
            }else{
                _post({
                    url: STUDY_API + "/user/register",
                    param: {
                        userPhone: $scope.userPhone,
                        userPassword: $scope.confirmPassword,
                        userCode: $scope.validateCode,
						userRecommendId: $scope.recommendUserId
                    },
                    callback: function(res){
                        if(res.code == '2000'){
                            $state.go("phone-login");
                        }
                    }
                });
            }
        }

	    /**
    	 * 获取验证码
    	 */
    	$("#validateCode").click(function(){
    		getValidateCodeReg(this);
    	})

    	$scope.goto = function(text){
    	    $state.go(text)
    	}
	}];
});

/**
 * 获取验证码
 * @param {Object} $this
 */
function getValidateCodeReg($this){
    debugger;
	var tel = $("#regForm input[name='userPhone']");
	if(tel.val() == ""){
		_successMsg("手机号不能为空");
		return;
	}
	 var regTel = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/;
	 if(!regTel.test(tel.val())){
		 _successMsg("手机号不正确");
		return;
	 }
	 console.log("123")
	_get({
		url: STUDY_API +"/user/getValidateCode",
		param: {
			userPhone: tel.val()
		},
		callback: function(res){
			if(res.code == '2000'){
				localStorage.setItem("validToken",res.data);
				var _this = $($this);
				_this.addClass("unbindClass");
				_this.unbind();
				var now = new Date();
				now.setSeconds(now.getSeconds() + 60);
				TimeDown(now.Format("yyyy/MM/dd hh:mm:ss"), "seconds", function() {
					_this.removeClass("unbindClass");
					$("#regForm .seconds").text("");
					_this.click(function() {
						getValidateCode(_this);
					});
				});
			}
		}
	});
}