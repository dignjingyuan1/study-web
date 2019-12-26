define([], function () {
	// controller
	return ["$scope","$state", function ($scope,$state) {
		/**
         * 提交
         */
        $scope.sub = function(){
            if(!$scope.userPhone){
                _successMsg("提交成功");
            }
            
        }
	}];
});