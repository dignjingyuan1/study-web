var app = angular.module('myApp',[]);
app.controller("banner",($scope,$state)=>{

		/**
		 * 查找轮播图
		 */
		$scope.searchBannnerList = function(){
			_get({
				url: STUDY_API + '/banner/getBannerList',
				callback: function(res){
					if(res.code == '2000'){
						$scope.bannerList = res.data;
						$scope.$applyAsync();
						setTimeout(function(){
							new Swiper('.swiper-container',{
							    loop: true,
								speed:600,
								grabCursor : true,
								parallax:true,
								autoplay:{
								  delay: 3000,
								//loop无效  stopOnLastSlide: true,
								},	
								pagination: {
								  el:'.swiper-pagination',
								  clickable :true,
								},
								navigation: {
							      nextEl: '.swiper-button-next',
							      prevEl: '.swiper-button-prev',
							    },
						  	});
						},500)
					}
				}
			});
		}
	
		$scope.searchBannnerList();
});