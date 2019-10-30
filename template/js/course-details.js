define([], function () {
	
	// controller
	return ["$scope","$state", function ($scope,$state) {
		
		$scope.courseGroupId = $state.params.id;
		
		/**
		 * 查找课程组详细
		 */
		$scope.searchCourseGropeDetails = function(){
			_get({
				url : STUDY_API + "/courseGroup/getCourseGroupDetails",
				param: {
					courseGroupId : $scope.courseGroupId
				},
				callback: function(res){
					console.log(res);
					if(res.code == "2000"){
						$scope.courseGroup = res.data;
						$scope.$applyAsync();
					}
				}
			})
		}
		
		/**
		 * 支付
		 */
		$scope.goToPay = function(){
			_post({
				url: STUDY_API + "/order/createOrder",
				param: {
					courseGroupId: $scope.courseGroupId
				},
				callback: function(res){
					console.log(res);
					if(res.code == '2000'){
						showPopup({
							url : 'select-wxpay',
							title: '微信支付',
							callback: function(){
								
							}
						})
					}
				}
			})
		}
		
		/**
		 * 获取课程金额
		 */
		$scope.searchCourseAmount = function(){
			_get({
				url: STUDY_API + "/course/getCourseAmount",
				param: {
					courseGroupId: $scope.courseGroupId
				},
				callback: function(res){
					if(res.code == '2000'){
						$scope.amount = res.data;
						$scope.$applyAsync();
					}
				}
			})
		}
		
		/**
		 * 播放
		 */
		$scope.playVideo = function(url){
			var address = $("#move").attr("src");
			if(!address){
				$scope.reload(url);
			}
			document.getElementById('videoImg').style.display = "none";
		    document.getElementById('videoButton').style.display = "none";
 			$("#videoPlay").show();
		    document.getElementById('videoPlay').play();
		}
		
		/**
		 * reload
		 */
		$scope.reload = function(url){
			document.documentElement.scrollTop = 0;
			$("#move").attr("src",url);
			$("#videoPlay").load();
		}
		
		$scope.searchCourseGropeDetails();
		$scope.searchCourseAmount();
	}];
});