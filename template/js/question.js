define([], function () {
	
	// controller
	return ["$scope","$state", function ($scope,$state) {
		var timeOut;
		Pager.index = 1;
		Pager.limit = 6;
		$scope.searchProblemList = function(){
			var pageNo = Pager.index;
			_get({
				url: STUDY_API +"/problem/getProblemPager",
				param: {
					pageNo: pageNo,
					pageSize: Pager.limit
				},
				callback: function(res){
					if(res.code == '2000'){
						$scope.problemList = res.rows;
						Pager.total = res.total;
						Pager.Init();
						Pager.onLoad = $scope.searchProblemList;
						$scope.$applyAsync();
					}
				}
			})
		}
		
		/**
		 * 提问
		 */
		$scope.questionSend = function(){
			$state.go("question-send")
		}
		
		/**
		 * 问题详细
		 */
		$scope.questionDetails = function(id){
			if(isUserLogin()){
				_post({
					url: STUDY_API + "/problemFollow/createProblemFollow",
					param: {
						problemId: id,
						client: '1'
					},
					callback: function(res){
						console.log(res);
						if(res.code == '2000'){
							var data = res.data;
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
							}else{
								$state.go("question-details",{id:id});
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
		 * 查找回答为题金额
		 */
		$scope.searchQuestionAmount = function(){
			_get({
				url: STUDY_API + "/sysConfig/getSysConfigRuleByType",
				param: {
					type: '1'
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
		 * 获取问题数量
		 */
		$scope.searchQuestionCount = function(){
			_get({
				url: STUDY_API + "/problem/getProblemCount",
				param:{},
				callback: function(res){
					if(res.code == '2000'){
						$scope.count = res.data;
						$scope.$applyAsync();
					}
				}
			})
		}
		
		
		
		$scope.searchProblemList();
		$scope.searchQuestionAmount();
		$scope.searchQuestionCount();
	}];
});