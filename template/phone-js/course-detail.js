define([], function () {

    // controller
    return ["$scope", "$state", function ($scope, $state) {
        $scope.go = function (path) {
            $state.go(path)
        }
        $scope.courseGroupId = $state.params.id;

        /**
         * 查找课程组详细
         */
        $scope.searchCourseGropeDetails = function () {
            _get({
                url: STUDY_API + "/courseGroup/getCourseGroupDetails",
                param: {
                    courseGroupId: $scope.courseGroupId
                },
                callback: function (res) {
                    console.log(res);
                    if (res.code == "2000") {
                        $scope.courseGroup = res.data;
                        $scope.$applyAsync();
                    }
                }
            })
        }

        /**
         * 支付
         */
        $scope.goToPay = function () {
            if (isUserLogin()) {
                _post({
                    url: STUDY_API + "/order/createOrder",
                    param: {
                        courseGroupId: $scope.courseGroupId,
                        client: '0'
                    },
                    callback: function (res) {
                        console.log('支付返回结果：', res)
                        if (res.code == '2000') {
                            var data = res.data;
                        }
                    }
                });
                return;
            } else {
                $state.go("phone-login")
            }
        }

        /**
         * 播放
         */
        $scope.playVideo = function (courseId) {
            $scope.reload(courseId, true);
            document.getElementById('videoImg').style.display = "none";
            document.getElementById('videoButton').style.display = "none";
            $("#videoPlay").show();
            document.getElementById('videoPlay').play();
        }

        /**
         * reload
         */
        $scope.reload = function (courseId, play) {
            if (isUserLogin()) {
                _get({
                    url: STUDY_API + "/course/getCourseAddress",
                    param: {
                        courseId: courseId
                    },
                    callback: function (res) {
                        console.log(res);
                        if (res.code == "2000") {
                            document.documentElement.scrollTop = 0;
                            $("#videoPlay").bind("contextmenu", function () {
                                return false;
                            });
                            $("#move").attr("src", res.data);
                            $("#videoPlay").load();
                            if (play) {
                                document.getElementById('videoPlay').play();
                            }

                        }
                    }
                })
                return;
            } else {
                $state.go("phone-login")
            }
        }

        $scope.searchCourseGropeDetails();

        $scope.tabChange = function (index) {
            if (index == 1) {
                document.getElementById("courseInfo").style.display = "block"
				document.getElementById("teacherInfo").style.display = "none"
				document.getElementById("courseButton").classList.add("button-act")
				document.getElementById("teacherButton").classList.remove("button-act")

            } else {
                document.getElementById("teacherInfo").style.display = "block"
				document.getElementById("courseInfo").style.display = "none"
				document.getElementById("teacherButton").classList.add("button-act")
				document.getElementById("courseButton").classList.remove("button-act")
            }
        }
    }];
});

function listOnlick(dom) {
    var playArr = document.getElementsByClassName('play-button');
    for (var index = 0; index < playArr.length; index++) {
        var playImg = playArr[index];
        playImg.src = "img/play-hui.png"
    }
    var playTextArr = document.getElementsByClassName('class-item-title');
    for (var index = 0; index < playTextArr.length; index++) {
        var playText = playTextArr[index];
        playText.classList.remove('tilte-act')
    }
    dom.getElementsByClassName('play-button')[0].src = "img/play-act.png"
    dom.getElementsByClassName('class-item-title')[0].classList.add('tilte-act')
}