 define([], function () {
	
	// controller
	return ["$scope","$state", function ($scope,$state) {
		
		/**
		 * 
		 */
		$scope.searchCourseGroupTypeList = function(){
			_get({
				url: STUDY_API + "/courseGroupType/getCourseGroupTypeSpecial",
				param: {
					courseGroupTypeId: $scope.courseGroupTypeId,
				},
				callback: function(res){
					if(res.code == '2000'){
						var data = res.data
						Pager.list = data;
						for(var i=0;i< data.length;i++){
							var item = res.data[i];
							for(var j=0;j < item.courseGroupLists.length; j++){
								item.courseGroupLists[j]['payStatus'] =  $scope.searchCourseStatus(item.courseGroupLists[j].courseGroupId);
							}
							$scope.searchPager(item);
						}
						$scope.courseGroupTypeList = res.data;
						$scope.$applyAsync();
					}
				}
			})
		}
		
		/**
		 * 获取当前课程组的支付情况
		 */
		$scope.searchCourseStatus = function(courseGroupId){
			var status = 0;
			if(isUserLogin()){
				_get({
					url: STUDY_API + "/order/getOrderSuccessCount",
					param: {
						courseGroupId: 	courseGroupId
					},
					cache: false,
					async: false,
					callback: function(res){
						if(res.code == '2000'){
							status = res.data;
						}
					}
				})
			}
			return status;
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
					courseIsSpecial: '1'
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
		
		 $scope.switchType = function(id,name){
		  	$scope.typeName = name;
		  	$scope.courseGroupTypeId = id;
		  	$scope.searchCourseGroupTypeList()
		  }
		  
		  $scope.remove = function(){
		  	$scope.typeName = "";
		  	$scope.courseGroupTypeId = "";
		  	$scope.searchCourseGroupTypeList()
		  }
		
		/**
		   * 跳转到课程详细
		   * @param {Object} id
		   */
		  $scope.goCourseDetails = function(id){
		  	$state.go("course-details",{id:id})
		  }
		
		$scope.searchCourseGroupTypeList();
		$scope.searchCourseTypeList();
	}];
});