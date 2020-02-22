define([], function () {

    // controller
    return ["$scope", "$state", function ($scope, $state) {
        $scope.isShowType = $state.params.name;
        console.log("13123",$scope.isShowType)
        $scope.go = function (path) {
            $state.go(path)
        }
        /**
         *
         */
        $scope.searchCourseGroupTypeList = function () {
            _get({
                url: STUDY_API + "/courseGroupType/getCourseGroupTypeRecommend",
                callback: function (res) {
                    console.log(res);
                    if (res.code == '2000') {
                        $scope.courseGroupTypeList = res.data;
                        $scope.$applyAsync();
                    }
                }
            })
        }
        $scope.groupChange = function (name) {
            console.log('显示tip:', name)
            $scope.isShowType = name;
        }
        setTimeout(function(){
            $scope.groupChange($scope.isShowType);
        })


        /**
         * 跳转到课程详细
         * @param {Object} id
         */
        $scope.goCourseDetails = function (id) {
            $state.go("phone-course-detail", {id: id})
        }

        $scope.searchCourseGroupTypeList();
        // 搜索
        document.getElementById("searchButton").addEventListener('keydown', function (e) {
            var keywd = e.target.value;
            if (event.keyCode == 13 && keywd) {
                $scope.searchCourseGroupTypeList(document.getElementById("searchButton").value);
            }
        });

        $scope.goSearch = function (id) {
            $state.go("phone-course-list", {typeCode: id})
        }
    }];
});

var isMenuShow = false;

function menuShow() {
    console.log('dudu')
    if (isMenuShow) {
        document.getElementById('menu').style.display = 'none'
        isMenuShow = false;
    } else {
        document.getElementById('menu').style.display = 'block'
        isMenuShow = true;
    }
}