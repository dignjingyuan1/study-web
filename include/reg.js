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
	 * 关闭注册页面
	 */
	$scope.openUserKnow = function(){
		$("#reg-box").css("transform","scale(0)");
		setTimeout(()=>{
			$("#reg-alert").hide();
		},450);

		$("#user-know-alert").show();
		setTimeout(()=>{
			$("#user-know-box").css("transform","scale(1)");
		},450);
	}

	$scope.yszc = function(){
		$("#reg-box").css("transform","scale(0)");
		setTimeout(()=>{
			$("#reg-alert").hide();
		},450);

		$("#yszc-alert").show();
		setTimeout(()=>{
			$("#yszc-box").css("transform","scale(1)");
		},450);
	}

	/**
	 * 注册
	 */
	$scope.register = function(){
		
		if(_validtion("regForm")){
			if($scope.userPassword != $scope.confirmPassword){
				_successMsg("两次密码不一致");
				return;
			}
			if(!$("#check").is(':checked')){
				_successMsg("请阅读《用户须知》《隐私政策》");
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
		getValidateCodeReg(this);
	})

});

/**
 * 获取验证码
 * @param {Object} $this
 */
function getValidateCodeReg($this){
	var tel = $("#regForm input[name='userPhone']");
	if(tel.val() == ""){
		getMessageStyleReg("手机号不能为空",tel);
		return;
	}
	 var regTel = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/;
	 if(!regTel.test(tel.val())){
	 	getMessageStyleReg("手机号不正确",tel);
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

function getMessageStyleReg(msg,tel){
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
