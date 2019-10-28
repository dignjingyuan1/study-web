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
//			$state.go()
		}
		
		/**
		 * 问题详细
		 */
		$scope.questionDetails = function(id){
			$state.go("question-details",{id:id})
		}
		
		$scope.searchProblemList();
	}];
});