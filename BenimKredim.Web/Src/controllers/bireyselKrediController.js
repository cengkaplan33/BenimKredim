var bireyselKrediController = angular.module('mainApp.controllers.bireyselKredi.bireyselKrediController', []);

bireyselKrediController.controller('bireyselKrediController', ['$scope', '$http', 'bireyselKrediService', function ($scope, $http, bireyselKrediService) {
    $scope.bireyselKredi = {
        BankaAdi: '',
        VadeOrani: '',
        VadeliTutar: '',
    };

    $scope.Tutar;
    $scope.Vade;

    $scope.VadeleriGetir = function () {
        bireyselKrediService.VadeListesi()
        .success(function (data, status, headers, config) {
            $scope.Vadeler = data.Entities;
        });
    };

    $scope.krediSorgula = function () {

        var request = {
            Vade: $scope.Vade,
            Tutar: $scope.Tutar
        };

        bireyselKrediService
        .searchh(request)
        .success(function (data, status, headers, config) {
            $scope.bireyselKrediler = data.Entities;
        })
        .error(function (error){
            console.log(error);
        });
    };

    $scope.VadeleriGetir();
   
}]);
