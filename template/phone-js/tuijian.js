define([], function () {
	
	// controller
	return ["$scope","$state", function ($scope,$state) {
		
		$scope.go = function(path){
		    console.log(path)
			$state.go(path)
		}

		var user = getUser();
		$scope.searchUserDetails = function(){
			_get({
				url: STUDY_API + "/user/getUserDetails",
				param: {
					userId: user.userId
				},
				callback: function(res){
					console.log(res);
					if(res.code == '2000'){
						var data = res.data;
						$scope.userPhone = data.userPhone;
						$scope.userSchool = data.userSchool;
						$scope.userSex = data.userSex;
						$scope.userCompany = data.userCompany;
						$scope.userPosition = data.userPosition;
						$scope.userRemark = data.userRemark;
						$scope.userName = data.userName;
						data.userHeader ? $("#head-img").attr("src", data.userHeader) : '';
						$scope.userIntegral = data.userIntegral;
						$scope.userAmount = data.userAmount;
						$scope.userRole = data.userRole;
						$scope.userQrcode = data.userQrcode;
						$scope.userRecommendCount = data.userRecommendCount;
						$scope.$applyAsync();
					}
				}
			})
		}

		$scope.searchUserDetails();

		$scope.savePicture = function(){
			var Url = $scope.userQrcode;
			var blob=new Blob([''], {type:'application/octet-stream'});
			var url = URL.createObjectURL(blob);
			var a = document.createElement('a');
			a.href = Url;
			a.download = Url.replace(/(.*\/)*([^.]+.*)/ig,"$2").split("?")[0];
			var e = document.createEvent('MouseEvents');
			e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
			a.dispatchEvent(e);
			URL.revokeObjectURL(url);
		}
	}];
});