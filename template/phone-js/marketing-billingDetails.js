define([], function () {
	// controller
	return ["$scope","$state", function ($scope,$state) {
        $scope.go = function (text) {
            $state.go(text)
        }
        var user = getUser();
        $scope.userInfo = null;
        if (user) {
            $scope.userInfo = user;
            if (!$scope.userInfo.userHeader) {
                $scope.userInfo.userHeader = "img/defalte-head.jpg"
            }
        }
        $scope.searchUserDetails = function(){
            _get({
                url: STUDY_API + "/user/getUserDetails",
                param: {
                    userId: user.userId
                },
                callback: function(res){
                    console.log(res);
                    if(res.code == '2000'){
                        var data = res.data;
                        $scope.userPhone = data.userPhone;
                        $scope.userSchool = data.userSchool;
                        $scope.userSex = data.userSex;
                        $scope.userCompany = data.userCompany;
                        $scope.userPosition = data.userPosition;
                        $scope.userRemark = data.userRemark;
                        $scope.userName = data.userName;
                        data.userHeader ? $("#head-img").attr("src", data.userHeader) : '';
                        $scope.userIntegral = data.userIntegral;
                        $scope.userAmount = data.userAmount;
                        $scope.userRole = data.userRole;
                        $scope.userQrcode = data.userQrcode;
                        $scope.userRecommendCount = data.userRecommendCount;
                        $scope.$applyAsync();
                    }
                }
            })
        }
        $scope.searchUserDetails();

        $scope.billList = [];
        $scope.Pager = {
            index: 1,
            limit: 10
        }
        /**
         * 查找账单列表
         */
        $scope.getBillPager = function(){
            _get({
                url: STUDY_API + "/bill/getBillPager",
                param: {
                    pageNo: $scope.Pager.index,
                    pageSize: $scope.Pager.limit,
                },
                callback: function(res){
                    if(res.code == '2000'){
                        if (res.rows && res.rows.length>0){
                            for (var i=0; i<res.rows.length;i++){
                                $scope.billList.push(res.rows[i])
                            }
                        }
                        $scope.$applyAsync();
                    }
                }
            })
        }
        $scope.getBillPager();

        // 翻页
        $(window).scroll(function () {
            var scrollTop = $(this).scrollTop();
            var scrollHeight = $(document).height();
            var windowHeight = $(this).height();
            if (scrollTop + windowHeight == scrollHeight && location.href.indexOf("phone-marketing-billingDetails") != -1) {
                // alert("已经到最底部了！");
                $scope.Pager.index++;
                $scope.searchPager();
            }
        });

        $scope.formatterType = function(type){
            if(type == '1'){
                return "推荐新人获得金额";
            }else if(type == '2'){
                return "课程收益获得金额";
            }else if(type == '3'){
                return "消费获得积分收益"
            }
        }
	}];
});