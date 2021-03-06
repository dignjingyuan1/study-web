define([], function () {
	
	// controller
	return ["$scope","$state", function ($scope,$state) {
		
	
		  /**
		   * 查找推荐的课程
		   */
		  $scope.searchCourseRecommend = function(){
		  	_get({
		  		url: STUDY_API + "/courseGroup/getCourseGroupListRecommendApi",
		  		param:{
		  			startSize: 0,
		  			endSize: 5
		  		},
		  		callback: function(res){
		  			if(res.code == '2000'){
		  				var data = res.data;
		  				$scope.courseGroupList = res.data;
		  				$scope.$applyAsync();
		  			}
		  		}
		  	})
		  }
		  
		  /**
		   * 查找推荐的老师
		   */
		  $scope.searchTeacherRecommend = function(){
		  	_get({
		  		url:STUDY_API +"/teacher/getTeacherRecommendListApi",
		  		param:{
		  			startSize: 0,
		  			endSize: 4
		  		},
		  		callback: function(res){
		  			if(res.code == '2000'){
		  				$scope.teacherList = res.data;
		  				$scope.$applyAsync();
		  			}
		  		}
		  	})
		  }
		  
		  /**
		   * 查找推荐的企业
		   */
		  $scope.searchCompanyRecommend = function(){
		  	_get({
		  		url: STUDY_API +"/company/getCompanyRecommendListApi",
		  		param:{
		  			startSize: 0,
		  			endSize: 4
		  		},
		  		callback: function(res){
		  			if(res.code == '2000'){
		  				$scope.companyList = res.data;
		  				$scope.$applyAsync();
		  			}
		  		}
		  	})
		  }
		  
		  /**
		   * 推荐学校
		   */
		  $scope.searchSchoolRecommend = function(){
		  	_get({
		  		url: STUDY_API +"/company/getCompanySchoolRecommendListApi",
		  		param:{
		  			startSize: 0,
		  			endSize: 4
		  		},
		  		callback: function(res){
		  			if(res.code == '2000'){
		  				$scope.schoolList = res.data;
		  				$scope.$applyAsync();
		  			}
		  		}
		  	})
		  }
		  
		  /**
		   * 热门企业
		   */
		  $scope.searchCompanyHotsRecommend = function(){
		  	_get({
		  		url: STUDY_API +"/company/getCompanyHotsListApi",
		  		param:{
		  			startSize: 0,
		  			endSize: 4
		  		},
		  		callback: function(res){
		  			if(res.code == '2000'){
		  				$scope.companyHotsList = res.data;
		  				$scope.$applyAsync();
		  			}
		  		}
		  	})
		  }
		  
		  /**
		   * 推荐最新课程
		   */
		  $scope.searchCourceNewRecommend = function(){
		  	_get({
		  		url: STUDY_API +"/courseGroup/getCourseGroupListNewApi",
		  		param:{
		  			startSize: 0,
		  			endSize: 4
		  		},
		  		callback: function(res){
		  			if(res.code == '2000'){
		  				$scope.courseNewList = res.data;
		  				$scope.$applyAsync();
		  			}
		  		}
		  	})
		  }
		  
		  /**
		   * 推荐热门课程
		   */
		  $scope.searchCourceHotsRecommend = function(){
		  	_get({
		  		url: STUDY_API +"/courseGroup/getCourseGroupListHotsApi",
		  		param:{
		  			startSize: 0,
		  			endSize: 4
		  		},
		  		callback: function(res){
		  			if(res.code == '2000'){
		  				$scope.courseHotsList = res.data;
		  				$scope.$applyAsync();
		  			}
		  		}
		  	})
		  }
		  
		  $scope.more = function(path,params){
			$state.go(path,params?params:{});
		  }
		  
		  /**
		   * 跳转到课程详细
		   * @param {Object} id
		   */
		  $scope.goCourseDetails = function(id){
		  	$state.go("course-details",{id:id})
		  }
		  
		  /**
		   * 跳转到老师详细
		   * @param {Object} id
		   */
		  $scope.goTeacherDetails = function(id){
		  	$state.go("teacher-details",{id: id});
		  }
		  
		  /**
		   * 企业详细
		   * @param {Object} id
		   */
		  $scope.goCompanyDetails = function(id){
		  	$state.go("company-details",{id: id});
		  }
		  
		  /**
		   * 去商品页面
		   */
		  $scope.goToGoods = function(){
		  	$state.go("goods");
		  }
		  
		   $scope.searchCourseRecommend();
		   $scope.searchTeacherRecommend();
		   $scope.searchCompanyRecommend();
		   $scope.searchSchoolRecommend();
		   $scope.searchCourceNewRecommend();
		   $scope.searchCourceHotsRecommend();
		   $scope.searchCompanyHotsRecommend();
	}];
});