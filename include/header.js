var app = angular.module('myApp',[]);
var _index;
app.controller("header",($scope,$state)=>{
	var routeName = $state.current.name;
	_index = routeName == "home" ? "0" : routeName == "course" ? 
	"1" : routeName == "boutique" ? "2" : routeName == "mine" ? "3" : "0";
	if(_index){
		$(".logo-one-box").eq(_index).find(".index-text").addClass("index-text-active").
		parent().siblings().find(".index-text").removeClass("index-text-active");
		var $img = $(".logo-one-box").eq(_index).find(".index-logo");
		var src = $img.attr("src");
		$img.attr("src",src.substring(0, src.indexOf("."))+"-active.png")
	}
	
	/**
	 * 导航链接
	 * @param {Object} path
	 */
	$scope.go =  function(path){
		$state.go(path)
	}
	
	/**
	 * 登录
	 */
	$scope.openLogin = function(){
		$("#login-alert").show();
		setTimeout(()=>{
			$("#login-box").css("transform","scale(1)");
		},50);
	}
	
	/**
	 * 注册
	 */
	$scope.openReg = function(){
		$("#reg-alert").show();
		setTimeout(()=>{
			$("#reg-box").css("transform","scale(1)");
		},50);
	}
	$scope.user = getUser();
	/**
	 * 查找用户信息
	 */
	$scope.getUser = function(){
		$scope.user = getUser();
//		var token = localStorage.getItem("token");
//		if(token){
//			_get({
//				url: STUDY_API + "/user/getUser",
//				callback: function(res){
//					if(res.code == '2000'){
//						$scope.user = res.data;
//						localStorage.setItem("user",JSON.stringify($scope.user));
//						$scope.$applyAsync();
//					}
//				}
//			})
//		}
	}
	
//	$scope.getUser();
});