var emailApp = angular.module("emailApp", []);

emailApp.controller("emailCtrl", function($scope, $http) {
    $scope.saveEmail = function(){
        $http.post('/saveemail', $scope.user).success(function(response){
            $scope.message = response.message;
            $scope.user = "";
        });
    };
});

