//加法
Number.prototype.add = function(arg){
    var r1,r2,m;
    try{r1=this.toString().split(".")[1].length}catch(e){r1=0}
    try{r2=arg.toString().split(".")[1].length}catch(e){r2=0}
    m=Math.pow(10,Math.max(r1,r2))
    return (this*m+arg*m)/m
}
//减法
Number.prototype.sub = function (arg){
    return this.add(-arg);
}

define([], function () {
    // controller
    return ["$scope", "$state", function ($scope, $state) {
        var user = localStorage.getItem('user');
        $scope.userInfo = null;
        if(user){
            $scope.userInfo = JSON.parse(user);
            if(!$scope.userInfo.userHeader){
                $scope.userInfo.userHeader = "img/defalte-head.jpg"
            }
        }
        
        $scope.orderIds = [];
        /**
         * 提交
         */
        $scope.checkImgSrc = "img/checkbox-hui.png";
        $scope.classNum = 0;
        $scope.price = 0.00;
        $scope.checkThis = function (index) {
            if ($scope.orderRecordList[index].isChecked == "img/checkbox.png") {
            		$scope.classNum = $scope.classNum-1;
                $scope.orderRecordList[index].isChecked = "img/checkbox-hui.png";
                $scope.price = new Number($scope.price).sub($scope.orderRecordList[index].amount * 1);
                $scope.price = new String($scope.price).substring(0,  new String($scope.price).indexOf(".")+3);
            } else {
            	    $scope.classNum = $scope.classNum + 1;
                $scope.orderRecordList[index].isChecked = "img/checkbox.png";
                $scope.price = new Number($scope.price).add($scope.orderRecordList[index].amount * 1);
                $scope.price = new String($scope.price).substring(0,  new String($scope.price).indexOf(".")+3);
            }
            $scope.$applyAsync();
        }
        $scope.isCheckAll = "img/checkbox-hui.png";
        $scope.checkAll = function(){
        	 	$scope.classNum = 0;
        	 	$scope.price = 0.00;
            if ($scope.isCheckAll == "img/checkbox.png") {
                $scope.isCheckAll = "img/checkbox-hui.png";
                for (var i=0; i<$scope.orderRecordList.length; i++){
                    $scope.orderRecordList[i].isChecked = "img/checkbox-hui.png";
//                  $scope.price = $scope.price.sub($scope.orderRecordList[i].amount * 1);
                }
            } else {
                $scope.isCheckAll = "img/checkbox.png";
                $scope.price = 0.00;
                for (var i=0; i<$scope.orderRecordList.length; i++){
                    $scope.orderRecordList[i].isChecked = "img/checkbox.png";
                    $scope.price = $scope.price.add($scope.orderRecordList[i].amount * 1);
                }
                $scope.classNum = $scope.orderRecordList.length;
                $scope.price = new String($scope.price).substring(0,  new String($scope.price).indexOf(".")+3);
            }
           
            $scope.$applyAsync();
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
            var idArr = [];
            for (var i = 0; i < $scope.orderRecordList.length; i++){
                if ($scope.orderRecordList[i].isChecked.indexOf("img/checkbox.png")!=-1){
                    idArr.push($scope.orderRecordList[i].orderId)
                }
            }
            if (idArr.length > 0){
                $state.go("phone-marketing-invoiceDetail",{price: $scope.price,orderIds: idArr.join(',')})
            }else{
                _successMsg("请选择要开发票的订单！")
            }
        }
    }];
});