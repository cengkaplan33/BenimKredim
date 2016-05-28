var tasitKredisiController = angular.module('mainApp.controllers.tasitKredisi.tasitKredisiController', []);

tasitKredisiController.controller('tasitKredisiController', ['$scope', '$http', 'tasitKredisiService', function ($scope, $http, tasitKredisiService) {
    $scope.tasitKredisi = {
        BankaAdi: '',
        VadeOrani: '',
        VadeliTutar: '',
    };

    $scope.Tutar;
    $scope.Vade;

    $scope.VadeleriGetir = function () {
        tasitKredisiService.VadeListesi()
        .success(function (data, status, headers, config) {
            if (data.Error == undefined)
            {
                $scope.Vadeler = data.Entities;
            }
            else
            {
                console.log(data.Error);
                alert(data.Error.Message);
            }
        })
        .error(function (error) {
            console.log(error);
        });
    };

    $scope.krediSorgula = function () {

        var request = {
            Vade: $scope.Vade,
            Tutar: $scope.Tutar
        };

        tasitKredisiService
        .searchh(request)
        .success(function (data, status, headers, config) {
            $scope.tasitKredileri = data.Entities;
        })
        .error(function (error){
            console.log(error);
        });
    };

    $scope.VadeleriGetir();
   
}]);
