define([], function () {

    // controller
    return ["$scope", "$state", function ($scope, $state) {
        $scope.pager = {
            index: 1,
            limit: 10
        }
        $scope.problemList = [];
        $scope.searchProblemList = function () {
            var pageNo = $scope.pager.index;
            _get({
                url: STUDY_API + "/problem/getProblemPager",
                param: {
                    pageNo: pageNo,
                    pageSize: $scope.pager.limit
                },
                callback: function (res) {
                    console.log(res);
                    if (res.code == '2000') {
                        if (res.rows) {
                            for (var i = 0; i < res.rows.length; i++) {
                                $scope.problemList.push(res.rows[i])
                            }
                            $scope.$applyAsync()
                        }
                    }
                }
            })
        }

        // 翻页
        $(window).scroll(function () {
            var scrollTop = $(this).scrollTop();
            var scrollHeight = $(document).height();
            var windowHeight = $(this).height();
            if (scrollTop + windowHeight == scrollHeight) {
                // alert("已经到最底部了！");
                $scope.pager.index++;
                $scope.searchProblemList();
            }
        });

        /**
         * 提问
         */
        $scope.question = function () {
            $state.go("phone-want-question")
        }

        /**
         * 问题详细
         */
        $scope.questionDetails = function (id) {
            console.log(id)
            $state.go("phone-question-detail", {id: id})
        }
        /**
         * 查找回答问题金额
         */
        $scope.searchQuestionAmount = function () {
            _get({
                url: STUDY_API + "/sysConfig/getSysConfigRuleByType",
                param: {
                    type: '1'
                },
                callback: function (res) {
                    if (res.code == '2000') {
                        $scope.amount = res.data;
                        $scope.$applyAsync();
                    }
                }
            })
        }

        /**
         * 获取问题数量
         */
        $scope.searchQuestionCount = function () {
            _get({
                url: STUDY_API + "/problem/getProblemCount",
                param: {},
                callback: function (res) {
                    if (res.code == '2000') {
                        $scope.count = res.data;
                        $scope.$applyAsync();
                    }
                }
            })
        }

        $scope.searchQuestionAmount();
        $scope.searchQuestionCount();
        $scope.searchProblemList();
    }];
});