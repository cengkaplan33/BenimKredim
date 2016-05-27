var tasitKredisiController = angular.module('mainApp.controllers.tasitKredisi.tasitKredisiController', []);

tasitKredisiController.controller('tasitKredisiController', ['$scope', '$http', 'tasitKredisiService', function ($scope, $http, tasitKredisiService) {
    $scope.tasitKredisi = {
        BankaAdi: '',
        VadeOrani: '',
        VadeliTutar: '',
    };

    //$scope.FillBordroDonemler = function () {
    //    bordroService.getBordroDonem()
    //    .success(function (data, status, headers, config) {
    //        $scope.BordroDonemler = data.Data.IKBordroDonemList;
    //        if (data.Data.IKBordroDonemList.length > 0) {
    //            var firstData = $scope.BordroDonemler[0].ObjId;
    //            $scope.selectedBordro = firstData;
    //            $scope.FillData(firstData);
    //        }
    //    });
    //};

    $scope.ZimmetSozlesmesiOnayla = function (onay) {
        alert("sads");
        $scope.krediSorgula();
    };

    $scope.krediSorgula = function () {

        var request =
        {
            Vade: 24,
            Tutar: 10000
        };

        tasitKredisiService
        .searchh(request)
        .success(function (data, status, headers, config) {

            $scope.tasitKredileri = data.Data.Entities;
        });
    };

    $scope.krediSorgula();
}]);
