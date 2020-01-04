
require.config({
    paths: {
        // angular
        "angular": "lib/components/angular/angular",
//      
        "angular-sanitize": "lib/angular-sanitize/angular-sanitize",
        
        // angular-ui
        "angular-ui-router": "lib/components/angular-ui-router/release/angular-ui-router",
        
        // angularAMD
        "angularAMD": "lib/components/angularAMD/angularAMD",
        
        "ngload": "lib/components/angularAMD/ngload"
    },
    shim: {
        // angular
		"angular": { exports: "angular" },
		
		"angular-sanitize": ["angular"],
        
        // angular-ui
        "angular-ui-router": ["angular"],
        
        // angularAMD
        "angularAMD": ["angular"],
        "ngload": ["angularAMD"]
    },
    waitSeconds: 0
});

define(["angular", "angularAMD", "angular-ui-router", "angular-sanitize"], function (angular, angularAMD) {
    
    let _ROUTER = undefined;
    // routes
    var registerRoutes = function($stateProvider, $urlRouterProvider,$locationProvider,$httpProvider) {
        	
        // default
        $urlRouterProvider.otherwise("/home");
        
        if (!$httpProvider.defaults.headers.get) {
    	      $httpProvider.defaults.headers.get = {};
    	    }
    	    $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
    	    $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
    	    $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';

        if(isPC()){
	        	 // route
	        var router = $stateProvider.state("home", angularAMD.route({
	                url: "/home",
	                templateUrl: "template/page/home.html",
	                controllerUrl: "template/js/home.js"
	        })).state("course", angularAMD.route({
	        		url: "/course",
	        		templateUrl: "template/page/course.html",
	        		controllerUrl: "template/js/course.js"
	        })).state("boutique", angularAMD.route({
	        		url: "/boutique",
	        		templateUrl: "template/page/boutique.html",
	        		controllerUrl: "template/js/boutique.js"
	        })).state("mine", angularAMD.route({
	        		url: "/mine",
	        		templateUrl: "template/page/mine.html",
	        		controllerUrl: "template/js/mine.js"
	        })).state("teacher-list", angularAMD.route({
	        		url: "/teacher-list",
	        		templateUrl: "template/page/teacher-list.html",
	        		controllerUrl: "template/js/teacher-list.js"
	        })).state("company-list", angularAMD.route({
	        		url: "/company-list?:type",
	        		params: {type: null},
	        		templateUrl: "template/page/company-list.html",
	        		controllerUrl: "template/js/company-list.js"
	        })).state("live", angularAMD.route({
	        		url: "/live",
	        		templateUrl: "template/page/live.html",
	        		controllerUrl: "template/js/live.js"
	        })).state("question", angularAMD.route({
	        		url: "/question",
	        		templateUrl: "template/page/question.html",
	        		controllerUrl: "template/js/question.js"
	        })).state("question-details", angularAMD.route({
	        		url: "/question-details?:id",
	        		param: {id: null},
	        		templateUrl: "template/page/question-details.html",
	        		controllerUrl: "template/js/question-details.js"
	        })).state("special", angularAMD.route({
	        		url: "/special",
	        		templateUrl: "template/page/special.html",
	        		controllerUrl: "template/js/special.js"
	        })).state("course-details", angularAMD.route({
	        		url: "/course-details?:id",
	        		params: {id: null},
	        		templateUrl: "template/page/course-details.html",
	        		controllerUrl: "template/js/course-details.js"
	        })).state("teacher-details", angularAMD.route({
	        		url: "/teacher-details?:id",
	        		params: {id: null},
	        		templateUrl: "template/page/teacher-details.html",
	        		controllerUrl: "template/js/teacher-details.js"
	        })).state("company-details", angularAMD.route({
	        		url: "/company-details?:id",
	        		params: {id: null},
	        		templateUrl: "template/page/company-details.html",
	        		controllerUrl: "template/js/company-details.js"
	        })).state("question-send", angularAMD.route({
	        		url: "/question-send",
	        		templateUrl: "template/page/question-send.html",
	        		controllerUrl: "template/js/question-send.js"
	        })).state("company-customer", angularAMD.route({
	        		url: "/company-customer",
	        		templateUrl: "template/page/company-customer.html",
	        		controllerUrl: "template/js/company-customer.js"
	        }));
        }else{
	        // 手机端路由
	        var phoneRouter = $stateProvider.state("home", angularAMD.route({
	                url: "/home",
	                templateUrl: "template/phone-page/home.html",
	                controllerUrl: "template/phone-js/home.js"
	        })).state("phone-course", angularAMD.route({
	            url: "/phone-course",
	            templateUrl: "template/phone-page/course.html",
	            controllerUrl: "template/phone-js/course.js"
	        })).state("phone-teacher", angularAMD.route({
	            url: "/phone-teacher",
	            templateUrl: "template/phone-page/teacher.html",
	            controllerUrl: "template/phone-js/teacher.js"
	        })).state("phone-company-list", angularAMD.route({
				url: "/phone-company-list?:type",
				templateUrl: "template/phone-page/company-list.html",
				controllerUrl: "template/phone-js/company-list.js"
			})).state("phone-course-detail", angularAMD.route({
				url: "/phone-course-detail?:id",
				templateUrl: "template/phone-page/course-detail.html",
				controllerUrl: "template/phone-js/course-detail.js"
			})).state("phone-teacher-detail", angularAMD.route({
	            url: "/phone-teacher-detail?:id",
	            templateUrl: "template/phone-page/teacher-detail.html",
	            controllerUrl: "template/phone-js/teacher-detail.js"
	        })).state("phone-company-detail", angularAMD.route({
	            url: "/phone-company-detail?:id",
	            templateUrl: "template/phone-page/company-detail.html",
	            controllerUrl: "template/phone-js/company-detail.js"
	        })).state("phone-boutique", angularAMD.route({
	            url: "/phone-boutique",
	            templateUrl: "template/phone-page/boutique.html",
	            controllerUrl: "template/phone-js/boutique.js"
	        })).state("phone-live", angularAMD.route({
	            url: "/phone-live",
	            templateUrl: "template/phone-page/live.html",
	            controllerUrl: "template/phone-js/live.js"
	        })).state("phone-question", angularAMD.route({
	            url: "/phone-question",
	            templateUrl: "template/phone-page/question.html",
	            controllerUrl: "template/phone-js/question.js"
	        })).state("phone-question-detail", angularAMD.route({
	            url: "/phone-question-detail?:id",
	            templateUrl: "template/phone-page/question-detail.html",
	            controllerUrl: "template/phone-js/question-details.js"
	        })).state("phone-special", angularAMD.route({
	            url: "/phone-special",
	            templateUrl: "template/phone-page/special.html",
	            controllerUrl: "template/phone-js/special.js"
	        })).state("phone-login", angularAMD.route({
	            url: "/phone-login",
	            templateUrl: "template/phone-page/login.html",
	            controllerUrl: "template/phone-js/login.js"
	        })).state("phone-reg", angularAMD.route({
	           url: "/phone-reg?:recommendUserId",
	           params: {recommendUserId: null},
	           templateUrl: "template/phone-page/reg.html",
	           controllerUrl: "template/phone-js/reg.js"
	        })).state("phone-modify", angularAMD.route({
	           url: "/phone-modify",
	           templateUrl: "template/phone-page/modify.html",
	           controllerUrl: "template/phone-js/modify.js"
	        })).state("phone-mine", angularAMD.route({
	           url: "/phone-mine",
	           templateUrl: "template/phone-page/mine.html",
	           controllerUrl: "template/phone-js/mine.js"
	        })).state("phone-mine-course", angularAMD.route({
	           url: "/phone-mine-course",
	           templateUrl: "template/phone-page/mine-course.html",
	           controllerUrl: "template/phone-js/mine-course.js"
	        })).state("phone-marketing-invoiceDetail", angularAMD.route({
	            url: "/phone-marketing-invoiceDetail?:price:orderIds",
	            templateUrl: "template/phone-page/marketing-invoiceDetail.html",
	            controllerUrl: "template/phone-js/marketing-invoiceDetail.js"
	        })).state("phone-course-list", angularAMD.route({
	            url: "/phone-course-list?:typeCode",
	            templateUrl: "template/phone-page/course-list.html",
	            controllerUrl: "template/phone-js/course-list.js"
	        })).state("phone-marketing-personInfo", angularAMD.route({
	            url: "/phone-marketing-personInfo",
	            templateUrl: "template/phone-page/marketing-personInfo.html",
	            controllerUrl: "template/phone-js/marketing-personInfo.js"
	        })).state("phone-want-question", angularAMD.route({
	            url: "/phone-want-question",
	            templateUrl: "template/phone-page/want-question.html",
	            controllerUrl: "template/phone-js/want-question.js"
	        })).state("phone-marketing-billingDetails", angularAMD.route({
                url: "/phone-marketing-billingDetails",
                templateUrl: "template/phone-page/marketing-billingDetails.html",
                controllerUrl: "template/phone-js/marketing-billingDetails.js"
            })).state("phone-marketing-myQuestions", angularAMD.route({
                url: "/phone-marketing-myQuestions",
                templateUrl: "template/phone-page/marketing-myQuestions.html",
                controllerUrl: "template/phone-js/marketing-myQuestions.js"
            })).state("phone-marketing-purchaseRecords", angularAMD.route({
				url: "/phone-marketing-purchaseRecords",
				templateUrl: "template/phone-page/marketing-purchaseRecords.html",
				controllerUrl: "template/phone-js/marketing-purchaseRecords.js"
			})).state("phone-tuijian", angularAMD.route({
				url: "/phone-tuijian",
				templateUrl: "template/phone-page/tuijian.html",
				controllerUrl: "template/phone-js/tuijian.js"
			}))
        }

    };
        
    // module
    var app = angular.module("myApp", ["ngSanitize","ui.router"]);
    
    
    app.run(function ($rootScope,$state) {
    		$rootScope.$on('$stateChangeStart',function(event){
    			document.documentElement.scrollTop = 0;
    			var token = localStorage.getItem("token");
			if(token){
				isUserLogin();
			}
    		});
    });

    // config
    app.config(["$stateProvider", "$urlRouterProvider",'$locationProvider','$httpProvider', registerRoutes]);
   	
 	
   	
    return angularAMD.bootstrap(app);
});