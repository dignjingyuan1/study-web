var app = angular.module('myApp',[]);
app.controller("login",($scope,$state)=>{
	
	/**
	 * 关闭登录页面
	 */
	$scope.closeLogin = function(){
		$("#login-box").css("transform","scale(0)");
		setTimeout(()=>{
			$("#login-alert").hide();
		},450);
	}
	
	/**
	 * 登录
	 */
	$scope.login =  function(){
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
					$state.reload();
					$scope.closeLogin();
				}
			}
		})
	}
	
	/**
	 * 打开登录
	 */
	$scope.openReg = function(){
		$("#login-box").css("transform","scale(0)");
		setTimeout(()=>{
			$("#login-alert").hide();
		},450);
		
		
		$("#reg-alert").show();
		setTimeout(()=>{
			$("#reg-box").css("transform","scale(1)");
		},50);
	}


	/**
	 * 修改密码
	 */
	$scope.modify = function(){
		$("#login-box").css("transform","scale(0)");
		setTimeout(()=>{
			$("#login-alert").hide();
		},450);
		
		$("#modify-alert").show();
		setTimeout(()=>{
			$("#modify-box").css("transform","scale(1)");
		},50);
	}
});