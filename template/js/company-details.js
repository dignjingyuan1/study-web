define([], function () {
	
	// controller
	return ["$scope","$state", function ($scope,$state) {
		$scope.companyId = $state.params.id;
		
		/**
		 * 查找企业详细
		 */
		$scope.searchCompanyDetails = function(){
			_get({
				url:STUDY_API +"/company/getCompanyDetails",
				param: {
					companyId: $scope.companyId
				},
				callback: function(res){
					console.log(res);
					if(res.code == '2000'){
						$scope.companyDetails = res.data;
						$scope.$applyAsync();
					}
				}
			})
		}
		
		$scope.searchCompanyDetails();
	}];
});