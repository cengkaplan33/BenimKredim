var mazeretIzinControllers = angular.module('mainApp.controllers.izinTalep.mazeretIzinController', []);


mazeretIzinControllers
    .directive('repeatDone', function () {
        return function (scope, element, attrs) {
            if (scope.$last) { // all are rendered
                scope.$eval(attrs.repeatDone);
            }
        }
    });

mazeretIzinControllers.controller('mazeretIzinController', ['$rootScope', '$scope', '$http', '$timeout', '$filter', 'personelService', 'mazeretIzinService','yillikIzinTalepService',
    function ($rootScope, $scope, $http, $timeout,$filter, personelService, mazeretIzinService, yillikIzinTalepService) {
        $scope.newizintalep = {
            IKIzinParametreDetayObjId: '',
            IzinBaslangicTarihi: '',
            IzinBitisTarihi: '',
            YolIzniGun: '',
            CepTel: '',
            VekaletEdecekObjId: '',
            Aciklama: '',
            IsBasiTarihi: '',
            IzinGun: '',
            HaftaTatili : '',
            ObjId: ''
        };
        $scope.Days = $rootScope.Days;
        $scope.IsAddMode = true;
        $scope.WatchIzinBaslangicTarihi = false;
        $scope.SayfayiDoldur = function () {
            mazeretIzinService
            .getIzinTurleri()
            .success(function (data, status, headers, config) {
                $scope.IzinTurleri = data.Data.Entities;
            });

            personelService
            .getPersonelVekiller()
            .success(function (data, status, headers, config) {
                $scope.PersonelVekiller = data.Data.Vekiller;
            });

            personelService
            .getPersonelBilgileri()
            .success(function (data, status, headers, config) {
                $scope.PersonelBilgileri = data.Data.Personel;
                $scope.newizintalep.CepTel = $scope.PersonelBilgileri.CepTelefonu1;
            });

            $scope.FillGrid();
        }

        $scope.FillGrid = function () {
            mazeretIzinService
            .getPersonelIzinArsiv()
            .success(function (data, status, headers, config) {
                $scope.ArsivIzinler = data.Data.Entities;
            });
        };


        $scope.ConvertChosen = function (req) {
            $timeout(function () {
                var $chosenSelect = $('.form-horizontal').find('.chosen-select');
                $chosenSelect.chosen();
            }, 0); // wait.
        };

        $scope.$watch('newizintalep.VekaletEdecekObjId', function () {
            $timeout(function () {
                var $chosenSelect = $('.form-horizontal').find('.chosen-select');
                $chosenSelect.trigger("chosen:updated")
            }, 0); // wait.
        });

        $scope.$watchGroup(['newizintalep.IzinBaslangicTarihi', 'newizintalep.IKIzinParametreDetayObjId', 'newizintalep.HaftaTatili'], function () {
            $scope.GetIzinGun();
        });

        $scope.GetIzinGun = function () {
            //hesap yapılması gerekiyor
            $timeout(function () {
                if (!$scope.WatchIzinBaslangicTarihi) {
                    $scope.WatchIzinBaslangicTarihi = true;
                    return;
                }

                if ($scope.newizintalep.IKIzinParametreDetayObjId == null || $scope.newizintalep.IKIzinParametreDetayObjId.trim() == "" || $scope.newizintalep.IzinBaslangicTarihi == "")
                    return;
              
                var haftaTatili = ($scope.newizintalep.HaftaTatili == "") ? null : $scope.newizintalep.HaftaTatili;
                
                var request = {
                    IKIzinParametreDetayObjId: $scope.newizintalep.IKIzinParametreDetayObjId,
                    IzinBaslangicTarihi: $scope.newizintalep.IzinBaslangicTarihi,
                    HaftaTatili: haftaTatili
                    };
                mazeretIzinService
                .izinGunleriniHesapla(request)
                .success(function (data, status, headers, config) {
                    $scope.newizintalep.IzinBitisTarihi = data.Data.IzinBitisTarihi;
                    $scope.newizintalep.IzinGun = data.Data.IzinGun;
                    $scope.newizintalep.IsBasiTarihi = data.Data.IsbasiTarihi;
                });
            }, 0); // wait.
        };

        $scope.Print = function (request) {
            if (request.Yazdirabilir != true) {
                $rootScope.ShowWarning(request.YazdirabilirMesaj);
                return;
            }

            mazeretIzinService
                            .print(request.ObjId)
                            .success(function (data, status, headers, config) {
                                $rootScope.ShowInfo("Yazdırma işlemi başarılı.");
                            });
        };

        $scope.ShowMessage = function (mesaj) {
            $rootScope.ShowInfo(mesaj);
        };

        $scope.Add = function () {
            var status = true;
            var $requiredForm = $('#requiredForm');

            $requiredForm.find('.required').each(function () {
                var $input = $(this);
                var $formGroup = $input.parents('.form-group');

                if (!$input.val() || $input.val() == "-1"|| $input.val().trim() == "?") {
                    status = (status && false);
                    $formGroup.addClass('has-error');
                } else {
                    status = status && true;
                    $formGroup.removeClass('has-error');
                }
            });

            if (!status)
                return;

            var izinTalep = {
                izinTalep: $scope.newizintalep
            };

            mazeretIzinService.mazeretIzinKaydet(izinTalep)
                .success
                (
                    function (data, status, headers, config) {
                        $scope.FillGrid();
                        $scope.ClearField();
                        if ($scope.IsAddMode) {
                            $rootScope.ShowInfo("Mazeret izniniz başarı ile oluşturuldu.");
                        }
                        else {
                            $rootScope.ShowInfo("Mazeret izniniz başarı ile güncellendi.");
                        }
                    }
                );
        };

        $scope.ClearField = function () {
            $scope.newizintalep = {
                IzinBaslangicTarihi: '',
                IzinBitisTarihi: '',
                YolIzniGun: '',
                CepTel: '',
                VekaletEdecekObjId: '',
                Aciklama: '',
                IsBasiTarihi: '',
                IKIzinParametreDetayObjId: '',
                IzinGun: '',
                HaftaTatili: '',
                ObjId: ''
            };
        };


        $scope.Edit = function (request) {
            if (request.Guncelleyebilir != true)
            {
                $rootScope.ShowWarning(request.GuncelleyebilirMesaj);
                return;
            }

            var requestIzin = {
                EntityId: request.ObjId
            };
            $scope.IsAddMode = false;
            yillikIzinTalepService
                    .getSinglePersonelIzin(requestIzin)
                    .success(function (data, status, headers, config) {
                        $scope.newizintalep.IzinBaslangicTarihi = $filter('date')(data.Data.IzinTalep.IzinBaslangicTarihi, 'dd/MM/yyyy');
                        $scope.newizintalep.IzinBitisTarihi = data.Data.IzinTalep.IzinBitisTarihi;
                        $scope.newizintalep.CepTel = data.Data.IzinTalep.CepTel;
                        $scope.newizintalep.VekaletEdecekObjId = data.Data.IzinTalep.VekaletEdecekObjId;
                        $scope.newizintalep.Aciklama = data.Data.IzinTalep.Aciklama;
                        $scope.newizintalep.ObjId = data.Data.IzinTalep.ObjId;
                        $scope.newizintalep.IsBasiTarihi = data.Data.IzinTalep.IsbasiTarihi;
                        $scope.newizintalep.IzinGun = data.Data.IzinTalep.IzinGun;
                        $scope.newizintalep.HaftaTatili = data.Data.IzinTalep.HaftaTatili;
                        $scope.newizintalep.IKIzinParametreDetayObjId = data.Data.IzinTalep.IKIzinParametreDetayObjId;
                    });
        };

        $scope.Delete = function (request) {
            if (request.Silebilir != true) {
                $rootScope.ShowWarning(request.SilebilirMesaj);
                return;
            }

            BootstrapDialog.confirm('İzninizi silmek istediğinize emin misiniz?',
                    function (result) {
                        if (!result)
                            return;

                        var requestIzin = { EntityId: request.ObjId };
                        yillikIzinTalepService
                        .deleteIzinArsiv(requestIzin)
                        .success(function (data, status, headers, config) {
                            $scope.IsAddMode = true;
                            $scope.ClearField();
                            $scope.FillGrid();
                            $rootScope.ShowInfo("İşlem başarılı bir şekilde tamamlandı.");
                        });
                    });
        };

        if ($scope.IsAddMode) {
            $scope.SayfayiDoldur();
        }
    } ]);
