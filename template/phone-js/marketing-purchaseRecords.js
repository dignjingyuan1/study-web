define([], function () {
	// controller
	return ["$scope","$state", function ($scope,$state) {
		/**
         * 提交
         */
        $scope.checkImgSrc = "img/checkbox-hui.png";
        $scope.classNum = 0;
        $scope.price = 0.00;
        $scope.checkThis = function($event){
            if($scope.checkImgSrc == "img/checkbox-hui.png"){

                $scope.checkImgSrc = "img/checkbox.png";
            }else{
                $scope.checkImgSrc = "img/checkbox-hui.png";
            }
            
        }
	}];
});