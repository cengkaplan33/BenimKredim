var tasitKredisiController = angular.module('mainApp.controllers.tasitKredisi.tasitKredisiController', []);

tasitKredisiController.controller('tasitKredisiController', ['$scope', '$http', 'tasitKredisiService', function ($scope, $http, tasitKredisiService) {
    $scope.tasitKredisi = {
        BankaAdi: '',
        VadeOrani: '',
        VadeliTutar: '',
    };
    $scope.Tutar;
    $scope.Vade;
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

        var request =
       {
           Vade:    $scope.Vade,
           Tutar: $scope.Tutar
       };
        $scope.krediSorgula(request);
    };

    $scope.krediSorgula = function (request) {

        tasitKredisiService
        .searchh(request)
        .success(function (data, status, headers, config) {
            $scope.tasitKredileri = data.Entities;
        })
        .error(function (error){
            console.log(error);
    });
    };

    //$scope.krediSorgula();
}]);
