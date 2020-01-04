define([], function () {
    // controller
    return ["$scope", "$state", function ($scope, $state) {

        $scope.isCompanyType = 0
        $scope.checkAmount = $state.params.price;
        $scope.orderIds = $state.params.orderIds;

        /**
         * 选择类别
         * @param {Object} type
         */
        $scope.checkIt = function (type) {
            $scope.isCompanyType = type
        }

        /**
         * 提交
         */
        $scope.sub = function () {
            if (!$scope.companyName) {
                _successMsg("发票抬头不能为空！");
            } else if (!$scope.invoiceTaxNo) {
                _successMsg("税号不能为空！");
            } else if (!$scope.invoiceEmail) {
                _successMsg("邮箱不能为空！");
            } else {
                console.log("发起请求")
                _post({
                    url: STUDY_API + "/invoice/saveInvoice",
                    param: {
                        companyType: $scope.isCompanyType,
                        companyName: $scope.companyName,
                        invoiceTaxNo: $scope.invoiceTaxNo,
                        invoiceRemark: $scope.invoiceRemark,
                        invoiceEmail: $scope.invoiceEmail,
                        orderIds: $scope.orderIds
                    },
                    callback: function (res) {
                        if (res.code == '2000') {
                            _successMsg("提交成功");
                            setTimeout(function () {
                                window.history.back();
                            }, 1000)
                        }
                    }
                })
            }
        }
    }];
});