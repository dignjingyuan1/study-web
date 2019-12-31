define([], function () {
	
	// controller
	return ["$scope","$state", function ($scope,$state) {
		Pager.index = 1;
		Pager.limit = 5;
		
		$scope.checkNumber = 0;
		$scope.checkAmount = 0.00;
		$scope.isCheck = false;
		$scope.orderIds = [];
		$scope.isCompanyType = 0;
		
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
				$scope.getBillPager();
			}else if(index == "3"){
				$scope.isCheck = false;
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
		 * 查找账单列表
		 */
		$scope.getBillPager = function(){
			var pageNo = Pager.index;
			Pager.pagerId = "#billPager";
			_get({
				url: STUDY_API + "/bill/getBillPager",
				param: {
					pageNo: pageNo,
					pageSize: Pager.limit,
				},
				callback: function(res){
					if(res.code == '2000'){
						$scope.billList = res.rows;
						Pager.total = res.total;
						Pager.Init();
						Pager.onLoad = $scope.getBillPager;
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
			_confirm("确定要退出么？",function(){
				localStorage.clear();
				$state.go("home");
			});
		}
		
		$scope.formatterType = function(type){
			if(type == '1'){
				return "推荐新人获得金额";
			}else if(type == '2'){
				return "课程收益获得金额";
			}else if(type == '3'){
				return "消费获得积分收益"
			}
		}
		
		/**
		 * 开发票
		 */
		$scope.invoice = function(){
			if($scope.orderIds.length == 0){
				alertText("未选择要开发票的订单");
				return;
			}
			$(".content").hide().eq(6).show();
		}
		
		/**
		 * 多选
		 * @param {Object} item
		 */
		$scope.checkThis = function(item){
			item.isCheck = !item.isCheck;
			if(item.isCheck){
				$scope.orderIds.push(item.orderId);
				$scope.checkNumber++;
				$scope.checkAmount = new Number($scope.checkAmount) + new Number(item.amount);
			}else {
				$scope.orderIds.remove(item.orderId);
				$scope.checkNumber--;
				$scope.checkAmount = new Number($scope.checkAmount) - new Number(item.amount);
			}
			console.log($scope.orderIds);
		}
		
		/**
		 * 全选
		 */
		$scope.checkAll = function(){
			$scope.checkAmount = 0;
			$scope.checkNumber = 0;
			$scope.orderIds = [];
			$scope.isCheck = !$scope.isCheck;
			for(var i=0; i<$scope.orderRecordList.length; i++){
				var item = $scope.orderRecordList[i];
				item.isCheck = $scope.isCheck;
				if($scope.isCheck){
					$scope.orderIds.push(item.orderId);
					$scope.checkAmount = new Number($scope.checkAmount) + new Number(item.amount);
				}
			}
			if($scope.isCheck){
				$scope.checkNumber = $scope.orderRecordList.length;
			}
		}
		
		/**
		 * 选择类别
		 * @param {Object} type
		 */
		$scope.checkIt = function(type){
			$scope.isCompanyType = type
		}
		
		/**
		 * 提交
		 */
		$scope.submitInvoice = function(){
			if(_validtion("invoiceForm")){
				_post({
					url: STUDY_API + "/invoice/saveInvoice",
					param: {
						companyType: $scope.isCompanyType,
						companyName: $scope.companyName,
						invoiceTaxNo: $scope.invoiceTaxNo,
						invoiceRemark: $scope.invoiceRemark,
						invoiceEmail: $scope.invoiceEmail,
						orderIds: $scope.orderIds.join(",")
					},
					callback: function(res){
						if(res.code == '2000'){
							alertText("提交成功");
							$scope.orderIds = [];
							setTimeout(function(){
								$state.reload();
							},2000)
						}
					}
				})
			}
			
		}
		
		$scope.searchOrderList();
		$scope.searchUserDetails();
	}];
});

Array.prototype.remove = function(val) { 
	var index = this.indexOf(val); 
	if (index > -1) { 
		this.splice(index, 1); 
	} 
};

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

function alertText(text) {
    var dom = document.getElementById('successAlert')
    dom.innerText = text
    dom.style.display = "block"
    setTimeout(function () {
        dom.style.display = "none"
    }, 1000)
}