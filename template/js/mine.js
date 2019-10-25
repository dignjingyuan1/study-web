define([], function () {
	
	// controller
	return ["$scope","$state", function ($scope,$state) {
		/**
		 * 切换
		 */
		$scope.switch = function(index){
			$(".content").hide().eq(index).show();
		}
		
		/**
		 * 上传图片
		 */
		$scope.downloadFile = function(){
			var file = document.getElementById("downloadFile");
			file.click();
		}
		
		var user = getUser();
	
		$scope.saveUser = function(){
			_post({
				url: STUDY_API + "/user/saveUser",
				param: {
					userId: user.userId,
					userSchool: $scope.userSchool,
					userSex: $scope.userSex,
					userCompany: $scope.userCompany,
					userPosition: $scope.userPosition,
					userRemark: $scope.userRemark,
					userHeader: $("#head-img").attr("src")
				},
				callback: function(res){
					if(res.code == '2000'){
						$scope.searchUserDetails();
					}
				}
			})
		}
		
		$scope.searchUserDetails = function(){
			_get({
				url: STUDY_API + "/user/getUserDetails",
				param: {
					userId: user.userId
				},
				callback: function(res){
					if(res.code == '2000'){
						var data = res.data;
						$scope.userPhone = data.userPhone;
						$scope.userSchool = data.userSchool;
						$scope.userSex = data.userSex;
						$scope.userCompany = data.userCompany;
						$scope.userPosition = data.userPosition;
						$scope.userRemark = data.userRemark;
						data.userHeader ? $("#head-img").attr("src", data.userHeader) : '';
					}
				}
			})
		}
		
		$scope.searchUserDetails();
	}];
});

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
        				$("#head-img").attr("src", data.fileRoot+"/"+data.filePath);
        				_post({
						url: STUDY_API + "/user/saveUser",
						param: {
							userId: getUser().userId,
							userHeader: $("#head-img").attr("src")
						},
						callback: function(res){
							if(res.code == '2000'){
							}
						}
					})
        			}
        		}
        });
	});
}