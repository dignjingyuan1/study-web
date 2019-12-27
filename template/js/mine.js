define([], function () {
	
	// controller
	return ["$scope","$state", function ($scope,$state) {
		Pager.index = 1;
		Pager.limit = 5;
		/**
		 * 切换
		 */
		$scope.switch = function(index){
			Pager.index = 1;
			Pager.limit = 5;
			$(".content").hide().eq(index).show();
			if(index == "0"){
				$scope.searchOrderList();
			}else if(index == "1"){
				$scope.searchProblemList();
			}else if(index == "2"){
				
			}else if(index == "3"){
				$scope.searchOrderRecordList();
			}
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
					userHeader: $("#head-img").attr("src"),
					userName: $scope.userName
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
						$scope.$applyAsync();
					}
				}
			})
		}
		
		/**
		 * 查找订单列表
		 */
		$scope.searchOrderList = function(){
			var pageNo = Pager.index;
			Pager.pagerId = "#coursePager";
			_get({
				url: STUDY_API + "/order/getOrderList",
				param: {
					pageNo: pageNo,
					pageSize: Pager.limit,
				},
				callback: function(res){
					if(res.code == '2000'){
						$scope.orderList = res.rows;
						Pager.total = res.total;
						Pager.Init();
						Pager.onLoad = $scope.searchOrderList;
						$scope.$applyAsync();
					}
				}
			})
		}
		
		/**
		 * 查找购买记录
		 */
		$scope.searchOrderRecordList = function(){
			_get({
				url: STUDY_API + "/order/getOrderRecord",
				callback: function(res){
					if(res.code == '2000'){
						$scope.orderRecordList = res.data;
						$scope.$applyAsync();
					}
				}
			})
		}
		
		/**
		 * 查找问题列表
		 */
		$scope.searchProblemList = function(){
			var pageNo = Pager.index;
			Pager.pagerId = "#problemPager";
			_get({
				url: STUDY_API + "/problem/getProblemList",
				param: {
					pageNo: pageNo,
					pageSize: Pager.limit,
				},
				callback:  function(res){
						console.log(res);
					if(res.code == '2000'){
						$scope.problemList = res.rows;
						Pager.total = res.total;
						Pager.Init();
						Pager.onLoad = $scope.searchProblemList;
						$scope.$applyAsync();
					}
				}
			})
		}
		
		/**
		 * 跳转到课程详细
		 */
		$scope.courseGroupDetails =  function(id){
			$state.go("course-details",{id:id});
		}
		
		/**
		 * 提问详细页面
		 * @param {Object} id
		 */
		$scope.questionDetails = function(id){
			$state.go("question-details",{id:id});
		}
		
		/**
		 * 退出
		 */
		$scope.logOut = function(){
			console.log("123")
			_confirm("确定要退出么？",function(){
				localStorage.clear();
				$state.go("home");
			});
		}
		
		$scope.searchOrderList();
		$scope.searchUserDetails();
	}];
});

function selectImg($event){
	var file = $event.files[0];
	lrz(file,{}).then(function(resFile){
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