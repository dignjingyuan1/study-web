define([], function () {
	return ["$scope", "$state", function ($scope, $state) {
	    $scope.isPayStatus = '0';
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
				if (ISWXWEB){
					_post({
						url: STUDY_API + "/order/createOrder",
						param: {
							courseGroupId: $scope.courseGroupId,
							code: localStorage.getItem("code"),
							client: '2'
						},
						callback: function (res) {
							console.log('支付返回结果：', res)
							alert('微信支付返回结果：' + JSON.stringify(res))
							if(res.code == '2000'){
								var wxRes = JSON.parse(res.data.qrcode);
								wxPay2(wxRes);
//								wxPay(wxRes.prepay_id,wxRes.nonce_str,wxRes.sign,wxRes.mch_id,wxRes.appid,function(res){
//									alert("支付成功")
//								})
							}
						}
					});
				} else {
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
								window.location.href = data.qrcode;
							}
						}
					});
				}
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

		/**
         * 获取当前课程组的支付情况
         */
        $scope.searchCourseStatus = function(){
            if(isUserLogin()){
                _get({
                    url: STUDY_API + "/order/getOrderSuccessCount",
                    param: {
                        courseGroupId: 	$scope.courseGroupId
                    },
                    callback: function(res){
                        if(res.code == '2000'){
                            $scope.isPayStatus = res.data;
                            $scope.$applyAsync();
                        }
                    }
                })
            }
        }
        $scope.searchCourseStatus();
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


function wxPay2(wxRes){
	function onBridgeReady(){
		var timestamp = (Date.parse(new Date())/1000).toString();
		_get({
			url: PAY_API+"/sign/getSign",
			param:{
				appId: wxRes.appid,
				timeStamp: timestamp,
				nonceStr: wxRes.nonce_str,
				packageKey: "prepay_id="+wxRes.prepay_id,
				signType: "MD5"
			},
			callback: function(res1){
				WeixinJSBridge.invoke(
			      'getBrandWCPayRequest', {
			         "appId": wxRes.appid,     //公众号名称，由商户传入     
			         "timeStamp": timestamp,         //时间戳，自1970年以来的秒数     
			         "nonceStr":wxRes.nonce_str, //随机串     
			         "package":"prepay_id="+wxRes.prepay_id,     
			         "signType":"MD5",         //微信签名方式：     
			         "paySign":  res1.data//微信签名 
			      },
			      function(res){
					alert("支付成功回调：" + JSON.stringify(res))
					if(res.err_msg == "get_brand_wcpay_request:ok" ){
						alert("支付成功")
						// 使用以上方式判断前端返回,微信团队郑重提示：
						//res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
					} 
				}); 
			}
		})
	}
	if (typeof WeixinJSBridge == "undefined"){
	   if( document.addEventListener ){
	       document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
	   }else if (document.attachEvent){
	       document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
	       document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
	   }
	}else{
	   onBridgeReady();
	}
}
