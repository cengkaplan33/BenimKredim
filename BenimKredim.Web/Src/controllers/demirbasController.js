var demirbasControllers = angular.module('mainApp.controllers.demirbas.demirbasController', []);

demirbasControllers.controller('demirbasController', ['$scope', '$rootScope', '$http', 'demirbasService', function ($scope, $rootScope, $http, demirbasService) {
    $scope.DemirbaslariDoldur = function () {
        demirbasService
        .getDemirbasList()
        .success(function (data, status, headers, config) {
            $scope.demirbaslar = data.Data.DemirbasListesi;
        });
    };

    $scope.ZimmetSozlesmesiBilgisiGetir = function () {
        var request = {};

        demirbasService
        .zimmetSozlesmesiBilgisiGetir(request)
        .success(function (data, status, headers, config) {
            $scope.ZimmetSozlesmesiOnayDurumu = data.Data.ZimmetSozlesmesiOnayDurumu;
        });
    };

    $scope.ZimmetSozlesmesiOnayla = function (onay) {
        var request =
            {
                Onay: onay
            };

        demirbasService
                    .zimmetSozlesmesiOnayla(request)
                    .success(function (data, status, headers, config) {
                        $scope.ZimmetSozlesmesiBilgisiGetir();
                    });
    };

    $scope.DemirbasiOnayla = function (demirbas) {
        demirbas.OnayMi = true;
        bootbox.confirm({
            message: 'Demirbaþý onaylamak istediðinize emin misiniz?',
            buttons: {
                'cancel': {
                    label: 'Hayýr',
                    className: 'btn-default pull-left'
                },
                'confirm': {
                    label: 'Evet',
                    className: 'btn-danger pull-right'
                }
            },
            callback: function (result) {
                if (result) {
                    demirbasService
                    .demirbasOnayla(demirbas)
                    .success(function (data, status, headers, config) {
                        $scope.DemirbaslariDoldur();
                        $rootScope.ShowInfo("Ýþlem baþarýlý bir þekilde tamamlandý.");
                    });
                }
            }
        });
    };


    $scope.DemirbasaItirazEt = function (demirbas) {
        bootbox.dialog({
            title: "Ýtirazýnýz için açýklama giriniz.",
            message: '<div class="row">  ' +
                    '<div class="col-md-12"> ' +
                    '<form class="form-horizontal" name="myForm"> ' +
                    '<div class="form-group"> ' +
                    '<label class="col-md-2 control-label" for="name" >Açýklama</label> ' +
                    '<div class="col-md-8"> ' +
                    '<input id="Description" name="Description" type="text" placeholder="Açýklamanýz" class="form-control input-md" ng-model="demirbas.Description" required> ' +
                    '<span class="help-block error" ng-show="myForm.demirbas.aciklama.$error.$invalid">Açýklama alaný boþ býrakýlamaz.</span> </div> ' +
                    '</div> ' +
                    '</div> ' +
                    '</form> </div>  </div>',
            buttons: {
                success: {
                    label: "Ýtiraz Et",
                    className: "btn-success",
                    callback: function () {
                        var Description = $('#Description').val();
                        demirbas.Aciklama = Description;
                        demirbas.OnayMi = false;
                        if (Description == "" || Description == null) {
                            var $formGroup = $('#Description').parents('.form-group');
                            $formGroup.addClass('has-error');
                            return false;
                        }
                        demirbasService
                        .demirbasItirazEt(demirbas)
                        .success(function (data, status, headers, config) {
                            $scope.DemirbaslariDoldur();
                            $rootScope.ShowInfo("Ýtirazýnýz alýnmýþtýr.");
                        });
                    }
                }
            }
        }
        );
    };

    $scope.DemirbaslariDoldur();
    $scope.ZimmetSozlesmesiBilgisiGetir();
}]);
