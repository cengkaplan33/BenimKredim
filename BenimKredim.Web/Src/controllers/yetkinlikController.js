var yetkinlikControllers = angular.module('mainApp.controllers.yetkinlik.yetkinlikController', []);

yetkinlikControllers.controller('yetkinlikController', ['$scope', '$rootScope', '$http', 'yetkinlikService', function ($scope, $rootScope, $http, yetkinlikService) {


    $scope.PersonelYetkinlikAilesiGetir = function () {
        var request = {};
        yetkinlikService
        .personelYetkinlikAilesiGetir(request)
        .success(function (data, status, headers, config) {
            $scope.YetkinlikAilesi = data.Data.YetkinlikAilesi;
        });
    };    

    $scope.PersonelYetkinlikGetir = function () {
        var request = {};
        yetkinlikService
        .personelYetkinlikGetir(request)
        .success(function (data, status, headers, config) {
            $scope.YetkinlikDavranisListe = data.Data.YetkinlikDavranisListe;
        });
    };
    
    $scope.PersonelYetkinlikAilesiGetir();
    $scope.PersonelYetkinlikGetir();
}]);