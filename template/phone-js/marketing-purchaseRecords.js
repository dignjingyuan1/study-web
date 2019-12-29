define([], function () {
    // controller
    return ["$scope", "$state", function ($scope, $state) {
        /**
         * 提交
         */
        $scope.checkImgSrc = "img/checkbox-hui.png";
        $scope.classNum = 0;
        $scope.price = 0.00;
        $scope.checkThis = function (index) {
            if ($scope.orderRecordList[index].isChecked == "img/checkbox.png") {
                $scope.orderRecordList[index].isChecked = "img/checkbox-hui.png";
                $scope.price = $scope.price - $scope.orderRecordList[index].amount * 1;
            } else {
                $scope.orderRecordList[index].isChecked = "img/checkbox.png";
                $scope.price = $scope.price + $scope.orderRecordList[index].amount * 1;
            }
        }
        /**
         * 查找购买记录
         */
        $scope.searchOrderRecordList = function () {
            _get({
                url: STUDY_API + "/order/getOrderRecord",
                callback: function (res) {
                    if (res.code == '2000') {
                        $scope.orderRecordList = res.data;
                        if ($scope.orderRecordList && $scope.orderRecordList.length > 0) {
                            for (var i = 0; i < $scope.orderRecordList.length; i++) {
                                $scope.orderRecordList[i].isChecked = "img/checkbox-hui.png";
                            }
                        }
                        $scope.$applyAsync();
                    }
                }
            })
        }
        $scope.searchOrderRecordList();
        $scope.goto = function () {
            $state.go("phone-marketing-invoiceDetail",{price: $scope.price})
        }
    }];
});