define([], function () {
	
	// controller
	return ["$scope","$state", function ($scope,$state) {
        $scope.go = function(path){
            $state.go(path)
        }
		$scope.courseGroupId = $state.params.id;
		
		/**
		 * 查找课程组详细
		 */
		$scope.searchCourseGropeDetails = function(){
			_get({
				url : STUDY_API + "/courseGroup/getCourseGroupDetails",
				param: {
					courseGroupId : $scope.courseGroupId
				},
				callback: function(res){
					console.log(res);
					if(res.code == "2000"){
						$scope.courseGroup = res.data;
						$scope.$applyAsync();
					}
				}
			})
		}
		
/**
		 * 支付
		 */
		$scope.goToPay = function(){
			if(isUserLogin()){
				_post({
					url: STUDY_API + "/order/createOrder",
					param: {
						courseGroupId: $scope.courseGroupId,
						client: '0'
					},
					callback: function(res){
					    console.log('支付返回结果：',res)
						if(res.code == '2000'){
							var data = res.data;
						}
					}
				});
				return;
			}
		}
		
		/**
		 * 播放
		 */
		$scope.playVideo = function(url){
			var address = $("#move").attr("src");
			if(!address){
				$scope.reload(url);
			}
			document.getElementById('videoImg').style.display = "none";
		    document.getElementById('videoButton').style.display = "none";
 			$("#videoPlay").show();
		    document.getElementById('videoPlay').play();
		}

		/**
		 * reload
		 */
		$scope.reload = function(url){
			document.documentElement.scrollTop = 0;
			$("#move").attr("src",url);
			$("#videoPlay").load();
		}
		
		$scope.searchCourseGropeDetails();
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