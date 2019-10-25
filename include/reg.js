var app = angular.module('myApp',[]);
app.controller("reg",($scope,$state)=>{
	
	/**
	 * 关闭注册页面
	 */
	$scope.closeReg = function(){
		$("#reg-box").css("transform","scale(0)");
		setTimeout(()=>{
			$("#reg-alert").hide();
		},450);
	}

	/**
	 * 注册
	 */
	$scope.register = function(){
		if(_validtion("regForm")){
			if($scope.userPassword != $scope.confirmPassword){
				_errorMsg("两次密码不一致");
				return;
			}
			_post({
				url: STUDY_API + "/user/register",
				param: {
					userPhone: $scope.userPhone,
					userPassword: $scope.confirmPassword,
					userCode: $scope.validateCode,
				},
				callback: function(res){
					if(res.code == '2000'){
						$scope.closeReg();
					}
				}
			});
		}
	}
	
	/**
	 * 获取验证码
	 */
	$("#validateCode").click(function(){
		getValidateCode(this);
	})

});

/**
 * 获取验证码
 * @param {Object} $this
 */
function getValidateCode($this){
	var tel = $("input[name='userPhone']");
	if(tel.val() == ""){
		getMessageStyle("手机号不能为空",tel);
		return;
	}
	 var regTel = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/;
	 if(!regTel.test(tel.val())){
	 	getMessageStyle("手机号不正确",tel);
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
				TimeDown(now.Format("yyyy/MM/dd hh:mm:ss"), function() {
					_this.removeClass("unbindClass");
					$(".seconds").text("");
					_this.click(function() {
						getValidateCode(_this);
					});
				});
			}
		}
	});
}

function getMessageStyle(msg,tel){
	$(".warning").remove();
	var _postion = tel.offset().left+tel.width();
    var _top = tel.offset().top;
	 $("body").prepend("<div class='warning' style='left:" + _postion + "px;top:" + _top + "px;'>&nbsp;<i class='icon iconfont icon-warning_fill'></i>&nbsp;" + msg + "</div>");
	 var height = tel.offset().top;
	 flag = false;
	 $(tel).focus();
	 $(tel).blur(function() {
	 	$("body").find(".warning").remove();
	 })
}