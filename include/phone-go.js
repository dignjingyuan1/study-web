var app = angular.module('myApp',[]);
app.controller("footer",($scope,$state)=>{
    $scope.go = function(path){
        $state.go(path)
    }
});