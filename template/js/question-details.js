define([], function () {
	
	// controller
	return ["$scope","$state", function ($scope,$state) {
		
		$scope.problemId = $state.params.id;
		
		$scope.user = getUser();
		console.log($scope.user);
		
		$scope.searchProblemDetails = function(){
			_get({
				url: STUDY_API + "/problem/getProblemDetails",
				param: {
					problemId: $scope.problemId
				},
				callback: function(res){
					console.log(res);
					if(res.code == "2000"){
						$scope.item = res.data;
						
						$scope.$applyAsync();
						setTimeout(()=>{
							$('.camera-box img').viewer();
						},500);
					}
				}
			})
		}
		
		
		
		/**
		 * 查找回答问题金额
		 */
		$scope.searchQuestionAmount = function(){
			_get({
				url: STUDY_API + "/sysConfig/getSysConfigRuleByType",
				param: {
					type: '2'
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
		 * 围观支付
		 * @param {Object} id
		 */
		$scope.questionDetails = function(id){
			if(isUserLogin()){
				_post({
					url: STUDY_API + "/problemFollow/createProblemFollow",
					param: {
						problemId: $scope.problemId,
						client: '1'
					},
					callback: function(res){
						if(res.code == '2000'){
							var data = res.data;
							console.log(data);
							if(data){
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
					}
				})
				return ;
			}
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
						$scope.seachProblemAnswerDetails();
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
		 * 查看答案
		 */
		$scope.seachProblemAnswerDetails = function(){
			if(isUserLogin()){
				_get({
					url: STUDY_API + "/problemAnswer/getProblemAnswerList",
					param: {
						problemId: $scope.problemId,
					},
					callback: function(res){
						if(res.code == '2000'){
							$scope.problemAnswerList = res.data;
							setTimeout(()=>{
								$('.camera-box').viewer();
							},100);
							$scope.$applyAsync();
						}
					}
				})
			}
		}
		
		
		
		$scope.searchProblemDetails();
		$scope.searchQuestionAmount();
		$scope.seachProblemAnswerDetails();
		
		
	}];
});