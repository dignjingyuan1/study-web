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
    }
});

define(["angular", "angularAMD", "angular-ui-router", "angular-sanitize"], function (angular, angularAMD) {
    
    let _ROUTER = undefined;
    // routes
    var registerRoutes = function($stateProvider, $urlRouterProvider,$locationProvider) {
        	
        // default
        $urlRouterProvider.otherwise("/home");
        
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
        }))
    };        
        
    // module
    var app = angular.module("myApp", ["ngSanitize","ui.router"]);
    
    
    app.run(function ($rootScope,$state) {
    		$rootScope.$on('$stateChangeStart',function(event){
    			document.documentElement.scrollTop = 0;
    			var token = localStorage.getItem("token");
			if(token){
				_get({
					url: STUDY_API + "/user/getUser",
					callback: function(res){
						if(res.code == '2000'){
							localStorage.setItem("user",JSON.stringify(res.data));
						}
					}
				})
			}
    		});
    });

    // config
    app.config(["$stateProvider", "$urlRouterProvider",'$locationProvider', registerRoutes]);
   	
 	
   	
    return angularAMD.bootstrap(app);
});