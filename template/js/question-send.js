define([], function () {
	
	// controller
	return ["$scope","$state", function ($scope,$state) {
		
		$scope.now = new Date().Format("yyyy-MM-dd hh:mm:ss");
		$scope.problemFollow = "0";
		
		
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
			if(_validtion("questionFrom")){
				_post({
					url:STUDY_API + "/problem/createProblem",
					param: {
						problemTitle: $scope.problemTitle,
						problemRemark: $scope.problemRemark,
						problemImgs: $("#problemImgs").val(),
						problemFollow: $scope.problemFollow,
					},
					callback: function(res){
						console.log(res);
					}
				})
			}
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