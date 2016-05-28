

(function (angular) {

    //function MainController($scope, $http, $log) {
    //    $scope.orderKey = "Ad";
    //    $scope.User = "";
    //    $http.get("home/UserInfo")
    //        .success(function (response) {
    //            $log.info("servis çaðrýsý baþarýlý bir þekilde tamamlandý.");
    //            $scope.User = response;
    //        })
    //        .error(function (error) {
    //            $log.info(ex);
    //        });

    //};

    //var app = angular.module("mainApp", []);
    //app.controller("MainController", ["$scope", "$http", "$log", MainController])


    function MainController($scope, $http, $log) {
        

    };

    var mainApp = angular.module('mainApp',
    [
        'mainApp.controllers.tasitKredisi.tasitKredisiController',
        'mainApp.controllers.konutKredisi.konutKredisiController',
        'mainApp.controllers.bireyselKredi.bireyselKrediController',

        'mainApp.services.tasitKredisi.tasitKredisiService',
        'mainApp.services.konutKredisi.konutKredisiService',
        'mainApp.services.bireyselKredi.bireyselKrediService',
    ]
    );
    mainApp.controller("MainController", ["$scope", "$http", "$log", MainController])

})(angular);
 