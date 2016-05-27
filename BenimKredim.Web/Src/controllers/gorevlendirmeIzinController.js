﻿var gorevlendirmeIzinControllers = angular.module('mainApp.controllers.izinTalep.gorevlendirmeIzinController', []);


gorevlendirmeIzinControllers
    .directive('repeatDone', function () {
        return function (scope, element, attrs) {
            if (scope.$last) { // all are rendered
                scope.$eval(attrs.repeatDone);
            }
        }
    });

gorevlendirmeIzinControllers.controller('gorevlendirmeIzinController', ['$rootScope', '$scope', '$http', '$timeout', '$filter', 'personelService', 'gorevlendirmeIzinService', 'yillikIzinTalepService',
    function ($rootScope, $scope, $http, $timeout, $filter, personelService, gorevlendirmeIzinService, yillikIzinTalepService) {
        $scope.newizintalep = {
            IKIzinParametreDetayObjId: ' ',
            IzinBaslangicTarihi: '',
            IzinBitisTarihi: '',
            IzinBaslangicSaati: '',
            IzinBitisSaati: '',
            CepTel: '',
            VekaletEdecekObjId: '',
            IKPersonelObjId: '',
            Aciklama: '',
            IzinSaat: '',
            IzinGun: '',
            ObjId: ''
        };
        $scope.opened1 = false;
        $scope.opened2 = false;
        $scope.IzinBaslangicSaatiTemp;
        $scope.IzinBitisSaatiTemp;
        $scope.IzinBaslangicTarihiTemp;
        $scope.IzinBitisTarihiTemp;
        $scope.IsAddMode = true;
        $scope.SayfayiDoldur = function () {
            personelService
           .getPersonelVekiller()
           .success(function (data, status, headers, config) {
               $scope.PersonelVekiller = data.Data.Vekiller;
           });

            personelService
           .getYoneticisiOlunanPersoneller()
           .success(function (data, status, headers, config) {
               $scope.SorumluPersoneller = data.Data.Personeller;

               if ($scope.SorumluPersoneller.length > 0) {
                   $scope.GorevlendirilenPersonelObjId = $scope.SorumluPersoneller[0].ObjId;
                   //$scope.SetChosen('personel-select', $scope.GorevlendirilenPersonelObjId);
               }
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
            gorevlendirmeIzinService
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

        $scope.$watch('newizintalep.IKPersonelObjId', function () {
            $timeout(function () {
                var $chosenSelect = $('.form-horizontal').find('.chosen-select');
                $chosenSelect.trigger("chosen:updated")
            }, 0); // wait.
        });

        $scope.$watch('newizintalep.VekaletEdecekObjId', function () {
            $timeout(function () {
                var $chosenSelect = $('.form-horizontal').find('.chosen-select');
                $chosenSelect.trigger("chosen:updated")
            }, 0); // wait.
        });

        $scope.$watch('newizintalep.IzinBaslangicSaati', function () {
            $scope.GetIzinSaat();
        });

        $scope.$watch('newizintalep.IzinBitisSaati', function () {
            $scope.GetIzinSaat();
        });

        $scope.$watch('newizintalep.IzinBaslangicTarihi', function (newBaslangicDate) {
            $scope.newizintalep.IzinBaslangicTarihi = $filter('date')(newBaslangicDate, 'dd/MM/yyyy');
            if ($scope.newizintalep.IzinBaslangicTarihi != '') {
                if (!Q.IsEmptyOrNull($scope.newizintalep.IzinBaslangicSaati) && !Q.IsEmptyOrNull($scope.newizintalep.IzinBitisSaati))
                    $scope.GetIzinSaat();
                else
                    $scope.GetIzinGun();
                return;
            }

            //if (new Date($scope.newizintalep.IzinBaslangicTarihi).toLocaleDateString() == new Date($scope.newizintalep.IzinBitisTarihi).toLocaleDateString()) {
            //    //$scope.showAyniGunSaat = true;
            //    $scope.GetIzinSaat();
            //}
            //else {
            //    //$scope.showAyniGunSaat = false;
            //    $scope.GetIzinGun();
            //}

        });

        $scope.$watch('newizintalep.IzinBitisTarihi', function (newBitisDate) {
            $scope.newizintalep.IzinBitisTarihi = $filter('date')(newBitisDate, 'dd/MM/yyyy');
            if ($scope.newizintalep.IzinBitisTarihi != '') {
                if (!Q.IsEmptyOrNull($scope.newizintalep.IzinBaslangicSaati) && !Q.IsEmptyOrNull($scope.newizintalep.IzinBitisSaati))
                    $scope.GetIzinSaat();
                else
                    $scope.GetIzinGun();
                return;
            }

            //if (new Date($scope.newizintalep.IzinBaslangicTarihi).toLocaleDateString() == new Date($scope.newizintalep.IzinBitisTarihi).toLocaleDateString()) {
            //    //$scope.showAyniGunSaat = true;
            //    $scope.GetIzinSaat();
            //}
            //else {
            //    //$scope.showAyniGunSaat = false;
            //    $scope.GetIzinGun();
            //}         
        });

        $scope.GetIzinGun = function () {
            //hesap yapılması gerekiyor
            $timeout(function () {
                if (!$scope.WatchIzinBaslangicTarihi) {
                    $scope.WatchIzinBaslangicTarihi = true;
                    return;
                }
                if (!Q.IsEmptyOrNull($scope.newizintalep.IzinBaslangicTarihi) && !Q.IsEmptyOrNull($scope.newizintalep.IzinBitisTarihi) && $scope.newizintalep.IzinBaslangicTarihi > $scope.newizintalep.IzinBitisTarihi) {
                    $scope.ShowMessage("Görev başlangıç tarihi, bitiş tarihinden büyük olamaz."); return;
                }
                if ($scope.Lock)
                    return;

                $scope.Lock = true;
                if ($scope.newizintalep.IzinBaslangicTarihi == "" || $scope.newizintalep.IzinBitisTarihi == "") {
                    $scope.Lock = false; return;
                }

                var request = {
                    IzinBaslangicTarihi: $scope.newizintalep.IzinBaslangicTarihi,
                    IzinBitisTarihi: $scope.newizintalep.IzinBitisTarihi
                };

                gorevlendirmeIzinService
                .izinGunleriniHesapla(request)
                .success(function (data, status, headers, config) {
                    $scope.newizintalep.IzinGun = data.Data.IzinGun;
                    $scope.newizintalep.IsBasiTarihi = data.Data.IsbasiTarihi;
                    $scope.newizintalep.IzinSaat = data.Data.IzinSaat;
                })
                .finally(function () {
                    $scope.Lock = false;
                });
            }, 0); // wait.
        };

        $scope.$watch('opened1', function () {
            if ($scope.newizintalep.IzinBitisTarihi != '') {
                if (!Q.IsEmptyOrNull($scope.newizintalep.IzinBaslangicSaati) && !Q.IsEmptyOrNull($scope.newizintalep.IzinBitisSaati))
                    $scope.GetIzinSaat();
                else
                    $scope.GetIzinGun();
                return;
            }
        });

        $scope.$watch('opened2', function () {
            $scope.GetIzinSaat();
        });

        $scope.GetIzinSaat = function () {
            $timeout(function () {
                if (Q.IsEmptyOrNull($scope.newizintalep.IzinBaslangicTarihi) || Q.IsEmptyOrNull($scope.newizintalep.IzinBitisTarihi) || Q.IsEmptyOrNull($scope.newizintalep.IzinBaslangicSaati)
                    || Q.IsEmptyOrNull($scope.newizintalep.IzinBitisSaati) || (($scope.IzinBaslangicSaatiTemp == $scope.newizintalep.IzinBaslangicSaati && $scope.IzinBitisSaatiTemp == $scope.newizintalep.IzinBitisSaati) && ($scope.IzinBaslangicTarihiTemp == $scope.newizintalep.IzinBaslangicTarihi && $scope.IzinBitisTarihiTemp == $scope.newizintalep.IzinBitisTarihi)))
                    return;

                if (Q.IsEmptyOrNull($scope.newizintalep.IzinBaslangicTarihi) && Q.IsEmptyOrNull($scope.newizintalep.IzinBitisTarihi) && $scope.newizintalep.IzinBaslangicTarihi > $scope.newizintalep.IzinBitisTarihi) {
                    $scope.ShowMessage("Görev başlangıç tarihi, bitiş tarihinden büyük olamaz."); return;
                }
                if (!$scope.WatchIzinBaslangicTarihi) {
                    $scope.WatchIzinBaslangicTarihi = true;
                    return;
                }
                if (!Q.IsEmptyOrNull($scope.newizintalep.IzinBaslangicTarihi) && !Q.IsEmptyOrNull($scope.newizintalep.IzinBitisTarihi) && $scope.newizintalep.IzinBaslangicTarihi > $scope.newizintalep.IzinBitisTarihi) {
                    $scope.ShowMessage("Görev başlangıç tarihi, bitiş tarihinden büyük olamaz."); return;
                }

                $scope.Lock = true;
                if ($scope.newizintalep.IzinBaslangicTarihi == "" || $scope.newizintalep.IzinBitisTarihi == "") {
                    $scope.Lock = false; return;
                }

                $scope.IzinBaslangicSaatiTemp = $scope.newizintalep.IzinBaslangicSaati;
                $scope.IzinBitisSaatiTemp = $scope.newizintalep.IzinBitisSaati;
                $scope.IzinBaslangicTarihiTemp = $scope.newizintalep.IzinBaslangicTarihi;
                $scope.IzinBitisTarihiTemp = $scope.newizintalep.IzinBitisTarihi;

                var request = {
                    IzinBaslangicTarihi: $scope.newizintalep.IzinBaslangicTarihi,
                    IzinBitisTarihi: $scope.newizintalep.IzinBitisTarihi,
                    IzinBaslangicSaati: $scope.newizintalep.IzinBaslangicSaati,
                    IzinBitisSaati: $scope.newizintalep.IzinBitisSaati
                };

                gorevlendirmeIzinService
                .izinSaatiHesapla(request)
                .success(function (data, status, headers, config) {
                    $scope.newizintalep.IzinSaat = $filter('date')(data.Data.IzinSaat, 'HH:mm');
                    $scope.newizintalep.IzinGun = data.Data.IzinGun;
                });
            }, 0); // wait.
        };

        $scope.Print = function (request) {
            if (request.Yazdirabilir != true) {
                $rootScope.ShowWarning(request.YazdirabilirMesaj);
                return;
            }

            gorevlendirmeIzinService
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

            var izinTalep = {
                izinTalep: $scope.newizintalep
            };

            gorevlendirmeIzinService.gorevlendirmeIzinKaydet(izinTalep)
                .success
                (
                    function (data, status, headers, config) {
                        $scope.FillGrid();
                        $scope.ClearField();
                        if ($scope.IsAddMode) {
                            $rootScope.ShowInfo("Görevlendirme işleminiz başarı ile oluşturuldu.");
                        }
                        else {
                            $rootScope.ShowInfo("Görevlendirme işleminiz başarı ile güncellendi.");
                        }
                    }
                );
        };

        $scope.ClearField = function () {
            $scope.newizintalep = {
                IzinBaslangicSaati: '',
                IzinBitisSaati: '',
                IzinBaslangicTarihi: '',
                IzinBitisTarihi: '',
                CepTel: '',
                VekaletEdecekObjId: '',
                Aciklama: '',
                IsBasiTarihi: '',
                IzinSaat: '',
                IzinGun: '',
                IKPersonelObjId: '',
                ObjId: ''
            };
        };


        $scope.Edit = function (request) {
            if (request.Guncelleyebilir != true) {
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
                        $scope.newizintalep.IzinBaslangicSaati = data.Data.IzinTalep.IzinBaslangicTarihi;
                        $scope.newizintalep.IzinBitisSaati = data.Data.IzinTalep.IzinBitisTarihi;
                        $scope.newizintalep.IzinBaslangicTarihi = data.Data.IzinTalep.IzinBaslangicTarihi;
                        $scope.newizintalep.IzinBitisTarihi = data.Data.IzinTalep.IzinBitisTarihi;
                        $scope.newizintalep.CepTel = data.Data.IzinTalep.CepTel;
                        $scope.newizintalep.VekaletEdecekObjId = data.Data.IzinTalep.VekaletEdecekObjId;
                        $scope.newizintalep.Aciklama = data.Data.IzinTalep.Aciklama;
                        $scope.newizintalep.ObjId = data.Data.IzinTalep.ObjId;
                        $scope.newizintalep.IzinGun = data.Data.IzinTalep.IzinGun;
                        $scope.newizintalep.IzinSaat = data.Data.IzinTalep.IzinSaat;
                        $scope.newizintalep.IKIzinParametreDetayObjId = data.Data.IzinTalep.IKIzinParametreDetayObjId;
                        $scope.newizintalep.IKPersonelObjId = data.Data.IzinTalep.IKPersonelObjId;
                        $scope.newizintalep.GorevlendirilenPersonelObjId = data.Data.IzinTalep.GorevlendirilenPersonelObjId;
                    });
        };

        $scope.$watch('newizintalep.VekaletEdecekObjId', function () {
            $timeout(function () {
                var $chosenSelect = $('.form-horizontal').find('.chosen-select');
                $chosenSelect.trigger("chosen:updated")
            }, 0); // wait.
        });

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

        $scope.open1 = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.opened1 = true;
        };

        $scope.open2 = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.opened2 = true;
        };

    }]);
