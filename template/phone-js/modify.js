define([], function () {
	// controller
	return ["$scope","$state", function ($scope,$state) {
        /**
         * 注册
         */
        $scope.submit = function(){
            if(!$scope.mUserPhone){
                _errorMsg("用户名不许为空");
            }else if(!$scope.mUserPassword){
                 _errorMsg("密码不许为空");
            }else{
                _post({
                    url: STUDY_API + "/user/modify",
                    param: {
                        userPassword: $scope.mUserPassword,
                        userPhone: $scope.mUserPhone,
                        userCode: $scope.mValidateCode,
                    },
                    callback: function(res){
                        if(res.code == '2000'){
                            $state.go("phone-login")
                        }
                    }
                })
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
	var tel = $("#regForm input[name='userPhone']");
	if(tel.val() == ""){
	    _errorMsg("手机号不能为空");
		return;
	}
	 var regTel = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/;
	 if(!regTel.test(tel.val())){
	    _errorMsg("手机号不正确");
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