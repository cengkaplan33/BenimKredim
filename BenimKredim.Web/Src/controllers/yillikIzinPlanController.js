var yillikIzinPlanControllers = angular.module('mainApp.controllers.izinPlan.yillikIzinPlanController', []);

yillikIzinPlanControllers.controller('yillikIzinPlanController', ['$rootScope', '$scope', '$http', '$timeout', 'yillikIzinPlanService', 'personelService',
    function ($rootScope, $scope, $http, $timeout, yillikIzinPlanService, personelService) {
    //entity
    $scope.IsAddMode = true;
  
    //methods
    $scope.RefreshData = function () {
        $scope.yillikIzinPlan =
        {
            ObjId: '',
            AmirMesaj: '',
            BirinciDonemBaslangic: '',
            BirinciDonemBitis: '',
            IkinciDonemBaslangic: '',
            IkinciDonemBitis: '',
            IzinlerFarkli: '',
            PersonelPlani: '',
            UcuncuDonemBaslangic: '',
            UcuncuDonemBitis: '',
            Yazdirildi: '',
            Yil: '',
            IKPersonelObjId: '',
            OnayDurumu: '',
            IkinciDonemIzinGun: '',
            BirinciDonemIzinGun: '',
            UcuncuDonemIzinGun: ''
        };
    }
    $scope.RefreshData();
    $scope.SayfayiDoldur = function () {
        yillikIzinPlanService.getPersonelIzinArsiv()
        .success(function (data, status, headers, config) {
            $scope.IzinPlanlariList = data.Data.IKPersonelIzinDonemleri;
        });

        personelService.getPersonelHakedisBilgileri()
        .success(function (data, status, headers, config) {
            $scope.PersonelHakedis = data.Data.Hakedis;
        });

        personelService.getPersonelBilgileri()
        .success(function (data, status, headers, config) {
            $scope.PersonelBilgileri = data.Data.Personel;
        });

        yillikIzinPlanService.getLastIzinPlani()
        .success(function (data, status, headers, config) {
            $scope.EnsonPlanYili = data.Data.IKPersonelIzinDonemi;
        });
    };

    $scope.set_color = function (hazirlayan) {
        if (hazirlayan == 1) {
            return { 'background-color': "pink" }
        }
    }

    $scope.Save = function (reqData) {
        var status = true;
        $('.required').each(function () {
            var $input = $(this);
            var $formGroup = $input.parents('.form-group');

            if (!$input.val() || $input.val() == "-1") {
                status = (status && false);
                $formGroup.addClass('has-error');
            } else {
                status = status && true;
                $formGroup.removeClass('has-error');
            }
        });

        if (!status)
            return;

        $scope.yillikIzinPlan.Yil = $scope.PersonelHakedis.PlanYili;
        var req = {
            Plan: $scope.yillikIzinPlan
        };

        yillikIzinPlanService.izinPlanKaydet(req)
            .success(function (data, status, headers, config) {
                $rootScope.ShowInfo("Yıllık izin planınız onaya gönderildi, " + ($scope.IsAddMode ? " eklendi." : "güncellendi."));
                $scope.FormuTemizle();
                $scope.SayfayiDoldur();
            });
    };

    $scope.Edit = function (req) {
        var request = {
            IKIzinPlanObjId: req
        };
        yillikIzinPlanService.getSingleIzinPlan(request)
        .success(function (data, status, headers, config) {
            $scope.yillikIzinPlan = data.Data.IKPersonelIzinDonemi;
            $scope.IsAddMode = false;
        });
    };

    $scope.Delete = function (req) {
        BootstrapDialog.confirm('İzin planınızı silmek istediğinize emin misiniz?',
            function (result) {
                if (!result) 
                    return;

                var request = { EntityId: req };
                yillikIzinPlanService.izinPlanSil(request)
                .success(function (data, status, headers, config) {
                    $scope.SayfayiDoldur();
                    $rootScope.ShowInfo("Silme işlemi başarıyla gerçekleştirildi.");
                });
            });
    };

    $scope.$watchGroup(['yillikIzinPlan.BirinciDonemBaslangic', 'yillikIzinPlan.BirinciDonemBitis'], function (newValues, oldValues, scope) {
        $scope.IzinGunuGetir($scope.yillikIzinPlan.BirinciDonemBaslangic, $scope.yillikIzinPlan.BirinciDonemBitis,'BirinciDonemIzinGun');
        });

    $scope.$watchGroup(['yillikIzinPlan.IkinciDonemBaslangic', 'yillikIzinPlan.IkinciDonemBitis'], function (newValues, oldValues, scope) {
        $scope.IzinGunuGetir($scope.yillikIzinPlan.IkinciDonemBaslangic, $scope.yillikIzinPlan.IkinciDonemBitis, 'IkinciDonemIzinGun');
    });

    $scope.$watchGroup(['yillikIzinPlan.UcuncuDonemBaslangic', 'yillikIzinPlan.UcuncuDonemBitis'], function (newValues, oldValues, scope) {
        $scope.IzinGunuGetir($scope.yillikIzinPlan.UcuncuDonemBaslangic, $scope.yillikIzinPlan.UcuncuDonemBitis, 'UcuncuDonemIzinGun');
    });

    $scope.IzinGunuGetir = function (startDate, endDate, returnDate) {
        if (startDate == '' || endDate == '' || startDate == null || endDate == null)
            return;

        var request = {
                PersonelObjId: '',
                BaslangicTarihi: startDate,
                BitisTarihi: endDate
        };

        yillikIzinPlanService.getIzinGun(request)
        .success(function (data, status, headers, config) {
            $scope.yillikIzinPlan[returnDate] = data.Data.IzinGun;
        });
    }

    $scope.NotDelete = function () {
        $rootScope.ShowWarning("İzin planını silemezsiniz.");
    };

    $scope.NotPrint = function () {
        $rootScope.ShowWarning("Bu aşamada çıktı alamazsınız.");
    };

    $scope.NotUpdate = function () {
        $rootScope.ShowWarning("Bu aşamada güncelleme yapamazsınız.");
    };

    
    $scope.SayfayiDoldur();

} ]);
