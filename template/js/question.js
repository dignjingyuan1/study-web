define([], function () {
	
	// controller
	return ["$scope","$state", function ($scope,$state) {
		
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
					console.log(res);
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
			$state.go("question-details",{id:id})
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