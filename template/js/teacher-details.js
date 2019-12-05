define([], function () {
	
	// controller
	return ["$scope","$state", function ($scope,$state) {
		
		
		$scope.teacherId = $state.params.id;
		/**
		 * 查找老师详细
		 */
		$scope.searchTeacherDetails = function(){
			_get({
				url:STUDY_API+"/teacher/getTeacherDetails",
				param: {
					teacherId: $scope.teacherId
				},
				callback: function(res){
					console.log(res);
					if(res.code == '2000'){
						$scope.teacherDetails = res.data;
						$scope.$applyAsync();
					}
				}
			})
		}
		/**
		 * tab切换
		 * @param {Object} $event
		 */
		$scope.tabSwitch =  function(index){
			$(".tab-button").removeClass("button-act").eq(index).addClass("button-act");
			$(".group").css("display","none").eq(index).css("display","block");
		}
		
		/**
		 * 查找详细
		 * @param {Object} id
		 */
		$scope.goToDetails = function(id){
			$state.go("course-details",{id:id});
		}
		
		$scope.searchTeacherDetails();
	}];
});