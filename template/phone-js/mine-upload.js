define([], function () {
    // controller
    return ["$scope", "$state", function ($scope, $state) {
        $scope.go = function (text) {
            $state.go(text)
        }
        var user = localStorage.getItem('user');
        $scope.userInfo = null;
        if (user) {
            $scope.userInfo = JSON.parse(user);
            if (!$scope.userInfo.userHeader) {
                $scope.userInfo.userHeader = "img/defalte-head.jpg"
            }
        }
        console.log("userInfo:", $scope.userInfo)

        $scope.pager = {
            index: 1,
            limit: 10
        }
        $scope.myCourseGroupList = [];
        /**
         * 查找我的上传
         */
        $scope.searchCourseGroupMyPagerApi = function () {
            var pageNo = Pager.index;
            Pager.pagerId = "#myCoursePager";
            _get({
                url: STUDY_API + "/courseGroup/getCourseGroupMyPagerApi",
                param: {
                    pageNo: $scope.pager.index,
                    pageSize: 10,
                },
                callback: function (res) {
                    if (res.code == '2000' && res.rows) {
                        if (res.rows && res.rows.length > 0) {
                            for (var i = 0; i < res.rows.length; i++) {
                                $scope.myCourseGroupList.push(res.rows[i])
                            }
                        }
                        $scope.$applyAsync();
                    }
                }
            })
        }
        $scope.searchCourseGroupMyPagerApi();

        // 翻页
        $(window).scroll(function () {
            var scrollTop = $(this).scrollTop();
            var scrollHeight = $(document).height();
            var windowHeight = $(this).height();
            if (scrollTop + windowHeight == scrollHeight && location.href.indexOf("phone-mine-upload") != -1) {
                // alert("已经到最底部了！");
                $scope.pager.index++;
                $scope.searchCourseGroupMyPagerApi();
            }
        });
    }];
});