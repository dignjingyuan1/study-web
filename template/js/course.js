define([], function () {
	
	// controller
	return ["$scope","$state", function ($scope,$state) {
		
		
		
		
		/**
		 * 
		 */
		$scope.searchCourseGroupTypeList = function(){
			_get({
				url: STUDY_API + "/courseGroupType/getCourseGroupTypeRecommend",
				param: {
					courseGroupTypeId: $scope.courseGroupTypeId
				},
				callback: function(res){
					if(res.code == '2000'){
						var data = res.data;
						Pager.list = data;
						for(var i=0; i<data.length; i++){
							var item = data[i];
							$scope.searchPager(item);
						}
						$scope.courseGroupTypeList = res.data;
						$scope.$applyAsync();
					}
				}
			})
		}
		
		$scope.searchCourseTypeList = function(){
			_get({
				url: STUDY_API + "/courseGroupType/getCourseGroupTypeList",
				callback: function(res){
					if(res.code == '2000'){
						$scope.typeList = res.data;
						$scope.$applyAsync();
					}
				}
			})
		}
		
		/**
		   * 跳转到课程详细
		   * @param {Object} id
		   */
		  $scope.goCourseDetails = function(id){
		  	$state.go("course-details",{id:id})
		  }
		  
		  /**
		   * 分页
		   * @param {Object} item
		   */
		  $scope.searchPager = function(item){
		  	Pager.limit = 8;
		  	var pageNo = Pager.index;
		  	_get({
		  		url: STUDY_API + "/courseGroup/getCourseGroupPagerApi",
		  		param: {
		  			courseGroupTypeId: item.id,
		  			pageNo: pageNo,
					pageSize: 8,
					courseGroupName: $scope.courseGroupName,
					courseIsSpecial: '0'
		  		},
		  		callback: function(res){
		  			if(res.code == '2000'){
						Pager.pagerId = "#pager_"+item.id;
						item['courseList'] = res.rows;
						Pager.total = res.total;
						Pager.Init();
						Pager.onLoad = $scope.searchPager;
						$scope.$applyAsync();
		  			}
		  		}
		  	})
		  }
		  
		  
		  
		  $(document).bind("keydown",(event)=>{
			let e = event ? event :(window.event ? window.event : null); 
			if(e.keyCode==13){ 
				$scope.searchCourseGroupTypeList();
			} 
			});
	
			$scope.$on("$destroy", function() {
	            $(document).unbind("keydown");
	        })
		  
		  $scope.switchType = function(id,name){
		  	$scope.typeName = name;
		  	$scope.courseGroupTypeId = id;
		  	$scope.searchCourseGroupTypeList();
		  }
		  
		  
		  $scope.remove = function(){
		  	$scope.typeName = "";
		  	$scope.courseGroupTypeId = "";
		  	$scope.searchCourseGroupTypeList();
		  }
		
		$scope.searchCourseGroupTypeList();
		$scope.searchCourseTypeList();
		
		setTimeout(function(){
			var id = $state.params.id;
			var texts = $(".class-text");
			for(var i=0;i< texts.length; i++){
				var item = $(texts[i]);
				if(id == '1'){
					if(item.text() == "职业规划"){
						var height = item.offset().top;
						$('html,body').animate({scrollTop: height-50});
					}
				}else if(id == '2'){
					if(item.text() == "行业剖析"){
						var height = item.offset().top;
						$('html,body').animate({scrollTop: height-50});
					}
				}else if(id == '3'){
					if(item.text() == "通用技能"){
						var height = item.offset().top;
						$('html,body').animate({scrollTop: height-50});
					}
				}else if(id == '4'){
					if(item.text() == "专业技能"){
						var height = item.offset().top;
						$('html,body').animate({scrollTop: height-50});
					}
				}
			}
		},200)
	}];
});