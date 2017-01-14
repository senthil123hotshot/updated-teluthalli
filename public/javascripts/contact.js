var messageform = angular.module("messageform", []);
messageform.controller("formCtrl", function($scope, $http) {
    $scope.sendmsg = function(){
        console.log($scope.user);
        $http.post('/sendmessage', $scope.user).success(function(response){
          $scope.message = response.message;
          $scope.user = "";
        });

    };
});
