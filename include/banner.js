var app = angular.module('myApp',[]);
app.controller("banner",($scope,$state)=>{
var mySwiper = new Swiper('.swiper-container',{
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
});