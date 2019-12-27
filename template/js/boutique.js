define([], function () {
	
	// controller
	return ["$scope","$state", function ($scope,$state) {
		
		$scope.go = function(path){
			$state.go(path)
		}
		
		/**
		 * 查找已经开始的课程组数量
		 */
		$scope.getBeginCourseGroupCount = function(){
			_get({
				url : STUDY_API +"/courseGroup/getBeginCourseGroupCount",
				callback: function(res){
					if(res.code == "2000"){
						$scope.beginCount = res.data;
						$scope.$applyAsync();
					}
				}
			})
		}
		
		/**
		 * 查找未开始的课程组数量
		 */
		$scope.getNotBeginCourseGroupCount = function(){
			_get({
				url :STUDY_API +"/courseGroup/getNotBeginCourseGroupCount",
				callback: function(res){
					if(res.code == "2000"){
						$scope.notBeginCount = res.data;
						$scope.$applyAsync();
					}
				}
			})
		}
		
		/**
		 * 查找提问数量
		 */
		$scope.searchQuestionCount = function(){
			_get({
				url : STUDY_API + "/problem/getProblemCount",
				callback: function(res){
					if(res.code == "2000"){
						$scope.questionCount = res.data;
						$scope.$applyAsync();
					}
				}
			})
		}
		
		/**
		 * 查找订单数量
		 */
		$scope.searchOrderCount = function(){
			_get({
				url: STUDY_API + "/order/getOrderCount",
				callback: function(res){
					if(res.code == "2000"){
						$scope.orderCount = res.data;
						$scope.$applyAsync();
					}
				}
			})
		}
		
		$scope.getBeginCourseGroupCount();
		$scope.getNotBeginCourseGroupCount();
		$scope.searchQuestionCount();
		$scope.searchOrderCount();
	}];
});