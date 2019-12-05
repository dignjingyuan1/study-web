define([], function () {
	
	// controller
	return ["$scope","$state", function ($scope,$state) {
		var type = $state.params.type;
		$scope.title = type == "1" ? "企业展示" : "高校展示";
		var url;
		var pagerUrl;
		if(type == 1){
			url = "/company/getCompanyRecommendListApi";
			pagerUrl = "/company/getCompanyPagerApi"
		}else if(type == 2){
			url = "/company/getCompanySchoolRecommendListApi";
			pagerUrl = "/company/getCompanySchoolPagerApi"
		}else if(type == 3){
			url = "/company/getCompanyHotsListApi";
			pagerUrl = "/company/getCompanyPagerApi"
		}
		/**
		 * 查找推荐的企业
		 */
		$scope.searchCompanyRecommend = function(){
			_get({
				url: STUDY_API + url,
				param: {
					startSize: 0,
					endSize: 5
				},
				callback: function(res){
					if(res.code == "2000"){
						$scope.companyRecommendList = res.data;
						$scope.$applyAsync();
					}
				}
			})
		}
		
		
		Pager.index = 1;
		Pager.limit = 8;
		Pager.pagerId = "#pager";
		/**
		 * 查找企业列表
		 */
		$scope.searchCompanyPagerApi = function(){
			var pageNo = Pager.index;
			_get({
				url: STUDY_API + pagerUrl,
				param: {
					pageNo: pageNo,
					pageSize: 8,
					companyName: $scope.companyName
				},
				callback: function(res){
					if(res.code == '2000'){
						$scope.companyList = res.rows;
						Pager.total = res.total;
						Pager.Init();
						Pager.onLoad = $scope.searchCompanyPagerApi;
						$scope.$applyAsync();
					}
				}
			})
		}
		
		/**
		 * 搜索
		 */
		$scope.search = function(){
			$scope.searchCompanyPagerApi();
		}
		
		$(document).bind("keydown",(event)=>{
			let e = event ? event :(window.event ? window.event : null); 
			if(e.keyCode==13){ 
				$scope.search();
			} 
		});

		$scope.$on("$destroy", function() {
            $(document).unbind("keydown");
       })
		
		
		/**
		   * 企业详细
		   * @param {Object} id
		   */
		  $scope.goCompanyDetails = function(id){
		  	$state.go("company-details",{id: id});
		  }
		  
		  
		$scope.searchCompanyRecommend();
		$scope.searchCompanyPagerApi();
	}];
});