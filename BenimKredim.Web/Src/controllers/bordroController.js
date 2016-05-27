var bordroControllers = angular.module('mainApp.controllers.bordro.bordroController', []);

bordroControllers.controller('yillikKazancSimulasyonuController', ['$scope', '$http', 'bordroService', 'personelService', function ($scope, $http, bordroService, personelService) {
    $scope.FillData = function (req) {
        bordroService
        .getPersonelUcretSimulasyonu()
        .success(function (data, status, headers, config) {
            $scope.personelUcretSimulasyonu = data.Data.IKPersonelUcretSimulasyon;
        });

        personelService
         .getPersonelBilgileri()
         .success(function (data, status, headers, config) {
             $scope.PersonelBilgileri = data.Data.Personel;
         });

    };

    $scope.FillData();

}]);

bordroControllers.controller('bordroController', ['$scope', '$http', 'bordroService', function ($scope, $http, bordroService) {
    $scope.personelBordro = {
        Isim: '',
        IsyeriUnvani: '',
        PersonelNo: '',
        SGPrimGunu: '',
        BrutMaas: '',
        AileZammi: '',
        CocukZammi6Alti: '',
        YakacakYardimi: '',
        KasaTazminati: '',
        FazlaCalismaTutar: '',
        Prim: '',
        YasalKesinti: '',
        TaksitliAvans: '',
        HacizNafaka: '',
        Avans: '',
        AGITutari: '',
        NeteDahilOlmayanBrut: '',
        FaturaliKesinti: '',
        Ikramiye: '',
        FerdiKazaKesinti: '',
        Kumanya: '',
        AyniYardim: '',
        BrutOdemelerToplam: '',
        OzelKesintilerToplam: '',
        EleGecenNetUcret: ''
    };

    $scope.FillData = function (req) {
        var request =
        {
            IKBordroDonemiObjId: req
        };

        bordroService
        .getPersonelBordro(request)
        .success(function (data, status, headers, config) {
            $scope.personelBordro = data.Data.IKPersonelBordro;
        });
    };

    $scope.FillBordroDonemler = function () {
        bordroService.getBordroDonem()
        .success(function (data, status, headers, config) {
            $scope.BordroDonemler = data.Data.IKBordroDonemList;
            if (data.Data.IKBordroDonemList.length > 0) {
                var firstData = $scope.BordroDonemler[0].ObjId;
                $scope.selectedBordro = firstData;
                $scope.FillData(firstData);
            }
        });
    };

    $scope.Update = function () {
        var kod = $scope.selectedBordro;
        $scope.FillData(kod);
    };

    $scope.FillBordroDonemler();

} ]);
