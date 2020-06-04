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
function getCode(){
    var href = location.href;
    var start = href.indexOf("code=");
    var end = href.indexOf("&state");
    if(start!=-1){
      return href.substring(start+5,end)
    } else {
      return null
    }
}
if(ISWXWEB){
    var code = getCode()
    if (!code){
      location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx75229920bc3def4e&redirect_uri=http%3A%2F%2Fwww.marketing-platform.net%2F%23%2Fphone-login&response_type=code&scope=snsapi_base&state=123#wechat_redirect"
    }else {
      localStorage.setItem("code",code)
    }
}
