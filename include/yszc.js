var app = angular.module('myApp',[]);
app.controller("yszc",($scope,$state)=>{

	/**
	 * 关闭登录页面
	 */
	$scope.closeUser = function(){
		$("#yszc-box").css("transform","scale(0)");
		setTimeout(()=>{
			$("#yszc-alert").hide();
		},450);

		$("#reg-alert").show();
		setTimeout(()=>{
			$("#reg-box").css("transform","scale(1)");
		},450);
	}
});
