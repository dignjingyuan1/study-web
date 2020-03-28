define([], function () {

	// controller
	return ["$scope","$state", function ($scope,$state) {

		$scope.problemId = $state.params.id;
        $scope.user = getUser();

		$scope.searchProblemDetails = function(){
			_get({
				url: STUDY_API + "/problem/getProblemDetails",
				param: {
					problemId: $scope.problemId
				},
				callback: function(res){
					if(res.code == "2000"){
						$scope.item = res.data;
						$scope.$applyAsync();
					}
				}
			})
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
							$scope.$applyAsync();
						}
					}
				})
			}
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
		$scope.searchQuestionAmount();
		$scope.seachProblemAnswerDetails();
		$scope.searchProblemDetails();

		/**
		 * 围观支付
		 * @param {Object} id
		 */
		$scope.questionDetails = function(id){
			if(isUserLogin()){
				if (ISWXWEB){
					_post({
						url: STUDY_API + "/problemFollow/createProblemFollow",
						param: {
							problemId: $scope.problemId,
							client: '2',
							code: localStorage.getItem("code"),
						},
						callback: function (res) {
							console.log('支付返回结果：', res)
							if(res.code == '2000'){
								var wxRes = JSON.parse(res.data.qrcode);
								wxPay(wxRes);
							}
						}
					});
				} else{
					_post({
						url: STUDY_API + "/problemFollow/createProblemFollow",
						param: {
							problemId: $scope.problemId,
							client: '0'
						},
						callback: function(res){
							if(res.code == '2000'){
								var data = res.data;
								console.log(data);
								location.href=data.qrcode
							}
						}
					})
				}
			}
			$("#login-alert").show();
			setTimeout(()=>{
				$("#login-box").css("transform","scale(1)");
			},50);
		}
	}];
});

