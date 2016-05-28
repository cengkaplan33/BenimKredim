var konutKredisiController = angular.module('mainApp.controllers.konutKredisi.konutKredisiController', []);

konutKredisiController.controller('konutKredisiController', ['$scope', '$http', 'konutKredisiService', function ($scope, $http, konutKredisiService) {
    $scope.konutKredisi = {
        BankaAdi: '',
        VadeOrani: '',
        VadeliTutar: '',
    };

    $scope.Tutar;
    $scope.Vade;

    $scope.VadeleriGetir = function () {
        konutKredisiService.VadeListesi()
        .success(function (data, status, headers, config) {
            $scope.Vadeler = data.Entities;
        });
    };

    $scope.krediSorgula = function () {

        var request = {
            Vade: $scope.Vade,
            Tutar: $scope.Tutar
        };

        konutKredisiService
        .searchh(request)
        .success(function (data, status, headers, config) {
            $scope.konutKredileri = data.Entities;
        })
        .error(function (error){
            console.log(error);
        });
    };

    $scope.VadeleriGetir();
   
}]);
