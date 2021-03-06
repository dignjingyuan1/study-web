define([], function () {
	
	// controller
	return ["$scope","$state", function ($scope,$state) {
		
		$scope.courseGroupId = $state.params.id;
		$scope.isPayStatus = '0';
		$scope.isShow = "0";
		var timeOut;
		var createTime;
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
					if(res.code == "2000"){
						var data = res.data;
						var now = new Date();
						var startNow = new Date(data.courseGroupStartTime);
						if(now.getTime() >= startNow.getTime() || data.courseRecommend == '1' || data.courseRecommend == '2' || data.courseRecommend == '3'){
							$scope.isShow = "1";
							$scope.$applyAsync();
						}else{
							TimeDown(startNow.Format("yyyy/MM/dd hh:mm:ss"), "seconds", function() {
								$scope.isShow = "1";
								$scope.$applyAsync();
							}, true);
						}
						$scope.courseGroup = data;
						$scope.$applyAsync();
					}
				}
			})
		}
		
		/**
		 * 支付
		 */
		$scope.goToPay = function(){
			if(isUserLogin()){
				_post({
					url: STUDY_API + "/order/createOrder",
					param: {
						courseGroupId: $scope.courseGroupId,
						client: '1'
					},
					callback: function(res){
						if(res.code == '2000'){
							var data = res.data;
							showPopup({
								url : 'select-wxpay',
								title: '微信支付',
								callback: function(){
									$("#zfbcode").qrcode(data.qrcode);
								}
							});
							createTime = new Date();
							$scope.searchOrderStatus(data.orderId);
						}
					}
				});
				return;
			}
			// 
			$("#login-alert").show();
			setTimeout(()=>{
				$("#login-box").css("transform","scale(1)");
			},50);
		}
		
		/**
		 * 查找订单详细
		 * @param {Object} orderId
		 */
		$scope.searchOrderStatus = function(orderId){
			_get({
				url: STUDY_API + "/order/getOrderDetails",
				param: {
					orderId: orderId
				},
				loading: false,
				callback: function(res){
					var data = res.data;
					if(data.orderStatus == "SUCCESS"){
						$(".pay-body").empty();
						var now = new Date();
						var html = "<div class='pay-success'>" +
									"<i class='icon iconfont'></i>" +
									"<span class='success-title'>您已支付成功！请到我的订单中查看。</span>" +
									"</div>" +
									"<div class='clear'>" +
									"<div class='pay-close'>"+
									"<span class='success-date'>支付时间：" + now.Format("yyyy-MM-dd hh:mm:ss") + "</span>" +
									"</div>"+
									"<div class='pay-close'>" +
									"</div>";
						$(".pay-body").append(html);
						clearTimeout(timeOut);
						$scope.searchCourseGropeDetails();
						$scope.searchCourseStatus();
						return;
					}
					var now = new Date();
					if((createTime.getTime()+5*60*1000) < now.getTime()){
						clearTimeout(timeOut);
						closePopup();
						return;
					}
					timeOut = setTimeout(function(){
						$scope.searchOrderStatus(orderId);
					}, 1000);
				}
			});
			
		}
		
		
		/**
		 * 播放
		 */
		$scope.playVideo = function(courseId){
			var address = $("#move").attr("src");
			if(!address){
				$scope.reload(courseId, true);
			}
			document.getElementById('videoImg').style.display = "none";
		    document.getElementById('videoButton').style.display = "none";
   			$("#videoPlay").show();
		    
		}
		
		/**
		 * reload
		 */
		$scope.reload = function(courseId,play){
			if(isUserLogin()){
				_get({
					url: STUDY_API + "/course/getCourseAddress",
					param: {
						courseId: courseId
					},
					callback: function(res){
						console.log(res);
						if(res.code == "2000"){
							document.documentElement.scrollTop = 0;
							$("#videoPlay").bind("contextmenu",function(){return false;});
							$("#move").attr("src",res.data);
							$("#videoPlay").load();
							if(play){
								document.getElementById('videoPlay').play();
							}
							
						}
					}
				})
				return;
			}
			$("#login-alert").show();
			setTimeout(()=>{
				$("#login-box").css("transform","scale(1)");
			},50);
		}
		
		/**
		 * 获取当前课程组的支付情况
		 */
		$scope.searchCourseStatus = function(){
			if(isUserLogin()){
				_get({
					url: STUDY_API + "/order/getOrderSuccessCount",
					param: {
						courseGroupId: 	$scope.courseGroupId
					},
					callback: function(res){
						if(res.code == '2000'){
							$scope.isPayStatus = res.data;
							$scope.$applyAsync();
						}
					}
				})
			}
		}
		
		/**
		 * tab切换
		 * @param {Object} $event
		 */
		$scope.tabSwitch =  function(index){
			$(".tab-button").removeClass("button-act").eq(index).addClass("button-act");
			$(".group").css("display","none").eq(index).css("display","block");
		}
		
		$scope.searchCourseGropeDetails();
		$scope.searchCourseStatus();

	}];
});