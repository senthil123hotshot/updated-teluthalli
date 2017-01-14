var signupform = angular.module("signupApp", []);
signupform.controller("signupCtrl", function($scope, $http, $window) {
    $scope.adduser = function(){
        console.log($scope.user);
        $http.post('/signup', $scope.user).success(function(response){
          console.log(response.error);
          //$scope.error = response.error;
          $scope.user = "";
          //if(!$scope.error)
          //{
          //$scope.$apply(function() { $location.path("/route"); });
      	  //$window.location.href = '/';
      	//}
        });

    };
});
