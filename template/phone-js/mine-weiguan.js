define([], function () {
    // controller
    return ["$scope", "$state", function ($scope, $state) {
        $scope.go = function (text) {
            $state.go(text)
        }
        var user = getUser();
        console.log('获取到的用户信息：', user)
        $scope.userInfo = null;
        if (user) {
            $scope.userInfo = user;
            if (!$scope.userInfo.userHeader) {
                $scope.userInfo.userHeader = "img/defalte-head.jpg"
            }
        }

        $scope.pager = {
            index: 1,
            limit: 10
        }
        $scope.problemFollowList = [];
        /**
         * 查找问题列表
         */
        /**
         * 查找围观列表
         */
        $scope.searchProblemFollowPager = function(){
            var pageNo = Pager.index;
            Pager.pagerId = "#problemFollowPager";
            _get({
                url: STUDY_API + "/problemFollow/getProblemFollowPager",
                param: {
                    pageNo: $scope.pager.index,
                    pageSize: $scope.pager.limit,
                },
                callback: function(res){
                    if(res.code == '2000' && res.rows){
                        for (var i=0; i< res.rows.length; i++){
                            $scope.problemFollowList.push(res.rows[i])
                        }
                        $scope.$applyAsync();
                    }
                }
            })
        }
        $scope.searchProblemFollowPager();
        /**
         * 提问详细页面
         * @param {Object} id
         */
        $scope.questionDetails = function(id){
            $state.go("phone-question-detail",{id:id});
        }
        // 翻页
        $(window).scroll(function () {
            var scrollTop = $(this).scrollTop();
            var scrollHeight = $(document).height();
            var windowHeight = $(this).height();
            if (scrollTop + windowHeight == scrollHeight && location.href.indexOf("phone-mine-weiguan") != -1) {
                // alert("已经到最底部了！");
                $scope.pager.index++;
                $scope.searchProblemFollowPager();
            }
        });
    }];
});