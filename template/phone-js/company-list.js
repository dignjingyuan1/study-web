define([], function () {
	
	// controller
	return ["$scope","$state", function ($scope,$state) {
		var type = $state.params.type;
		console.log(type);
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
		console.log(url)
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
		/**
		 * 查找企业列表
		 */
		$scope.searchCompanyPagerApi = function(text){
			var pageNo = Pager.index;
			_get({
				url: STUDY_API + pagerUrl,
				param: {
					pageNo: 1,
					pageSize: 2000,
					companyName: text
				},
				callback: function(res){
					console.log(res);
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
		
		$scope.goCompanyDetails = function(id){
			$state.go("phone-company-detail",{id: id});
		}
		
		$scope.searchCompanyRecommend();
		$scope.searchCompanyPagerApi();

		// 搜索
        document.getElementById("searchButton").addEventListener('keydown', function(e){
            var keywd = e.target.value;
            if(event.keyCode == 13 && keywd) {
                $scope.searchCompanyPagerApi(document.getElementById("searchButton").value);
            } 
        });
	}];
});