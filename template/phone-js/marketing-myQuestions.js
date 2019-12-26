define([], function () {
    // controller
    return ["$scope", "$state", function ($scope, $state) {
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

        $scope.pager = {
            index: 1,
            limit: 10
        }
        $scope.problemList = [];
        /**
         * 查找问题列表
         */
        $scope.searchProblemList = function () {
            _get({
                url: STUDY_API + "/problem/getProblemList",
                param: {
                    pageNo: $scope.pager.index,
                    pageSize: $scope.pager.limit
                },
                callback: function (res) {
                    console.log(res);
                    if (res.code == '2000') {
                        for (var i = 0; i < res.rows.length; i++) {
                            $scope.problemList.push(res.rows[i])
                        }
                        $scope.$applyAsync();
                    }
                }
            })
        }
        $scope.searchProblemList();
        // 翻页
        $(window).scroll(function () {
            var scrollTop = $(this).scrollTop();
            var scrollHeight = $(document).height();
            var windowHeight = $(this).height();
            if (scrollTop + windowHeight == scrollHeight && location.href.indexOf("marketing-myQuestions") != -1) {
                // alert("已经到最底部了！");
                $scope.pager.index++;
                $scope.searchProblemList();
            }
        });
    }];
});