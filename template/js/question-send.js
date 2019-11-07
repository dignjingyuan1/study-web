define([], function () {
	
	// controller
	return ["$scope","$state", function ($scope,$state) {
		
		$scope.now = new Date().Format("yyyy-MM-dd hh:mm:ss");
		$scope.problemFollow = "0";
		
		var timeOut;
		/**
		 * 上传图片
		 */
		$scope.downloadFile = function(){
			var file = document.getElementById("downloadFile");
			file.click();
		}
		/**
		 * 保存
		 */
		$scope.submit = function(){
			if(isUserLogin()){
				if(_validtion("questionFrom")){
					_post({
						url:STUDY_API + "/problem/createProblem",
						param: {
							problemTitle: $scope.problemTitle,
							problemRemark: $scope.problemRemark,
							problemImgs: $("#problemImgs").val(),
							problemFollow: $scope.problemFollow,
							client: '1'
						},
						callback: function(res){
							if(res.code == '2000'){
								var data = res.data;
								showPopup({
									url : 'select-wxpay',
									title: '微信支付',
									callback: function(){
										$("#zfbcode").qrcode(data.qrcode);
									}
								});
								createTime = new Date();
								$scope.searchOrderStatus(data.orderId);
							}
						}
					})
				}
				return;
			}
			$("#login-alert").show();
			setTimeout(()=>{
				$("#login-box").css("transform","scale(1)");
			},50);
		}
		
		/**
		 * 查找订单状态
		 * @param {Object} orderId
		 */
		$scope.searchOrderStatus = function(orderId){
			_get({
				url: STUDY_API + "/order/getOrderDetails",
				param: {
					orderId: orderId
				},
				loading: false,
				callback: function(res){
					var data = res.data;
					console.log(data);
					if(data.orderStatus == "SUCCESS"){
						$(".pay-body").empty();
						var now = new Date();
						var html = "<div class='pay-success'>" +
									"<i class='icon iconfont'></i>" +
									"<span class='success-title'>您已支付成功！请到我的订单中查看。</span>" +
									"</div>" +
									"<div class='clear'>" +
									"<div class='pay-close'>"+
									"<span class='success-date'>支付时间：" + now.Format("yyyy-MM-dd hh:mm:ss") + "</span>" +
									"</div>"+
									"<div class='pay-close'>" +
									"</div>";
						$(".pay-body").append(html);
						clearTimeout(timeOut);
						return;
					}
					var now = new Date();
					if((createTime.getTime()+5*60*1000) < now.getTime()){
						clearTimeout(timeOut);
						closePopup();
						return;
					}
					timeOut = setTimeout(function(){
						$scope.searchOrderStatus(orderId);
					}, 1000);
				}
			});
		}
		
		
		$scope.weiguan = function($event){
			var ev = $event.target;
			if($scope.problemFollow == '0'){
				_confirm('您已将问题公开，其他人可以进行围观，围观费用全部进入您个人账户，如问题涉及隐私请关闭此按钮。',function(){
					$scope.problemFollow = "1";
		        		$(ev).attr("src","img/checkbox.png")
		        });
			}else if($scope.problemFollow == '1'){
				$scope.problemFollow = "0";
				$(ev).attr("src","img/checkbox-hui.png")
			}
		}
		
		
	}];
});
var arrayImg = [];
function selectImg($event){
	var file = $event.files[0];
	lrz(file,{width:450,quality:0.7}).then(function(resFile){
		var param = {};
        param['fileName'] = resFile.base64;
        param['fileType'] = "image/jpeg";
        _post({
        		url: BASIS_API+'/upload/uploadFile',
        		param: param,
        		callback: (res)=>{
        			if(res.code == '2000'){
        				let data = res.data;
        				arrayImg.push(data.fileRoot+"/"+data.filePath)
        				$("#problemImgs").val(arrayImg.join(","))
        				var html = "<div style='margin-left: 10px' class='camera-box'><img src="+data.fileRoot+"/"+data.filePath+" ></div>";
        				$("#imgs").append(html);
        			}
        		}
        });
	});
}