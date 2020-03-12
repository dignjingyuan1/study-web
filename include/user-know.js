var app = angular.module('myApp',[]);
app.controller("userKnow",($scope,$state)=>{

	/**
	 * 关闭登录页面
	 */
	$scope.closeUser = function(){
		$("#user-know-box").css("transform","scale(0)");
		setTimeout(()=>{
			$("#user-know-alert").hide();
		},450);

		$("#reg-alert").show();
		setTimeout(()=>{
			$("#reg-box").css("transform","scale(1)");
		},450);
	}
});
