var app = angular.module('myApp',[]);
app.controller("modify",($scope,$state)=>{
	
	/**
	 * 关闭页面
	 */
	$scope.closeModify = function(){
		$("#modify-box").css("transform","scale(0)");
		setTimeout(()=>{
			$("#modify-alert").hide();
		},450);
	}

	/**
	 * 提交
	 */
	$scope.submit = function(){
		if(_validtion("modifyForm")){
			_post({
				url: STUDY_API + "/user/modify",
				param: {
					userPassword: $scope.mUserPassword,
					userPhone: $scope.mUserPhone,
					userCode: $scope.mValidateCode,
				},
				callback: function(res){
					if(res.code == '2000'){
						$scope.closeModify();
					}
				}
			})
		}
	}
	
	/**
	 * 获取验证码
	 */
	$("#validateCodeModify").click(function(){
		getValidateCode(this);
	})
});


/**
 * 获取验证码
 * @param {Object} $this
 */
function getValidateCode($this){
	var tel = $("#modifyForm input[name='mUserPhone']");
	if(tel.val() == ""){
		getMessageStyle("手机号不能为空",tel);
		return;
	}
	 var regTel = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/;
	 if(!regTel.test(tel.val())){
	 	getMessageStyle("手机号不正确",tel);
		return;
	 }
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
					$("#validateCodeModify .seconds").text("");
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