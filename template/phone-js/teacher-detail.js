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
		 * 查找详细
		 * @param {Object} id
		 */
		$scope.goToDetails = function(id){
			$state.go("phone-course-detail",{id:id});
		}
		
		$scope.searchTeacherDetails();

		$scope.tabChage = function (index) {
			if (index == 1){
				document.getElementById("course").classList.add("button-act")
				document.getElementById("teacher").classList.remove("button-act")
				document.getElementById("courseid").style.display = "block"
				document.getElementById("teacherid").style.display = "none"
			}else{
				document.getElementById("course").classList.remove("button-act")
				document.getElementById("teacher").classList.add("button-act")
				document.getElementById("courseid").style.display = "none"
				document.getElementById("teacherid").style.display = "block"
			}
		}
	}];
});