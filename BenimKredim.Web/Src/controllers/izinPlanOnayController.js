var izinPlanOnayController = angular.module('mainApp.controllers.izinOnay.izinPlanOnayController', []);

izinPlanOnayController.controller('izinPlanOnayController', ['$rootScope', '$scope', '$http', 'izinPlanOnayService', function ($rootScope, $scope, $http, izinPlanOnayService) {
    $scope.SayfayiDoldur = function () {
        $scope.GetYillar();
        $scope.GetOnayDurumlar();
    };

    $scope.GetOnayDurumlar = function () {
        $scope.OnayDurumlari = [
                                    { text: 'Hepsi', value: '0' },
                                    { text: 'Onay Bekliyor', value: '1' },
                                    { text: 'Yönetici Onayladı', value: '2' },
                                    { text: 'Yönetici İptal Etti', value: '3' },
                                    { text: 'Yönetici Farklı Planladı', value: '4' },
                                    { text: 'IK onayladı', value: '5' }
                               ];
        $scope.DefaultOnayDurum = '0';
    };

    $scope.GetYillar = function () {
        izinPlanOnayService.getYillar()
        .success(function (data, status, headers, config) {
            $scope.Selected = data.Data.Yillar[0];
            $scope.Yillar = data.Data.Yillar;

            $scope.GetAmirIzinPlanlari();
        });
    };

    $scope.changeYear = function () {
        var yil = $scope.Selected;
        $scope.DefaultOnayDurum = '0';
        $scope.GetAmirIzinPlanlari();
    };

    $scope.GetAmirIzinPlanlari = function () {
        var selectedOnay = $scope.DefaultOnayDurum;
        var selectedYil = $scope.Selected;
        if (selectedOnay != '' && selectedYil != '') {
            var req = {

                OnayDurumu: selectedOnay,
                Yil: selectedYil
            };

            izinPlanOnayService.getAmirIzinPlanlar(req)
            .success(function (data, status, headers, config) {
                $scope.IzinPlanlari = data.Data.IKPersonelIzinDonemleri;
            });
        }
    };

    $scope.changeOnayDurum = function () {
        var selectedOnay = $scope.DefaultOnayDurum;
        var selectedYil = $scope.Selected;
        if (selectedOnay != '' && selectedYil != '') {
            var req = {
                OnayDurumu: selectedOnay,
                Yil: selectedYil
            };

            izinPlanOnayService.getAmirIzinPlanlar(req)
            .success(
                function (data, status, headers, config) {
                    $scope.IzinPlanlari = data.Data.IKPersonelIzinDonemleri;
                });
        }
    };

    function BootboxContentForIptalEt(izin) {
        var frm_str = '<div class="row" id="SebepRowForm">  ' +
                    '<div class="col-xs-12 col-sm-12"> ' +
                    '<div class="form-group"> ' +
                    '<label class="col-md-4 control-label"> Açıklama </label> ' +
                    '<div class="col-md-4"> ' +
                    '<textarea id="form-field-11" class="autosize-transition form-control" style="overflow: hidden; word-wrap: break-word; resize: horizontal; height: 72px;"></textarea>' +
                    '</div>' +
                    '</div>' +
                    '</div></div>';

        var object = $('<div/>').html(frm_str).contents();
        return object;
    }

    function BootboxContent(izin) {
        var baslangicTarihi1 = izin.BirinciDonemBaslangic;
        var bitisTarihi1 = izin.BirinciDonemBitis;
        var baslangicTarihi2 = izin.IkinciDonemBaslangic;
        var bitisTarihi2 = izin.IkinciDonemBitis;
        var baslangicTarihi3 = izin.UcuncuDonemBaslangic;
        var bitisTarihi3 = izin.UcuncuDonemBitis;

        var formStr = '<div class="col-xs-12 col-sm-12">' +
        '<div id="requiredForm" class="widget-box widget-color-dark">' +
        '<div class="widget-header widget-header-small">' +
        '<h6 class="widget-title bigger lighter">' +
        'Yıllık İzin Planı' +
        '</h6>' +
        '</div>' +
        '<div class="widget-body">' +
        '<div class="widget-main">' +
        '<div class="form-group">' +
        '<div class="col-sm-2">' +
        '</div>' +
        '<h4 class="col-sm-8 control-label no-padding-right header blue">' +
        '1. İzin Tercihi</h4>' +
        '</div>' +
        '<div class="form-group tercih1">' +
        '<label class="col-sm-5 control-label no-padding-right " for="id-date-range-picker-1">' +
        'İzin Başlangıç Tarihi</label>' +
        '<div class="col-sm-5">' +
        '<div class="input-group" style="z-index: 99999">' +
        '<input class="form-control date-picker required" id="izinBaslangicTarihiTercih1"' +
        'type="text" data-date-format="dd-mm-yyyy" name="startdate"' +
        '/>' +
        '<span class="input-group-addon"><i class="ace-icon fa fa-calendar bigger-110"></i>' +
        '</span>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="form-group tercih1">' +
        '<label class="col-sm-5 control-label no-padding-right " for="id-date-range-picker-1">' +
        'İzin Bitiş Tarihi</label>' +
        '<div class="col-sm-5">' +
        '<div class="input-group" style="z-index: 99999">' +
        '<input class="form-control date-picker required" id="izinBitisTarihiTercih1" type="text"' +
        'data-date-format="dd-mm-yyyy"' +
        'data-date-format="dd-mm-yyyy" />' +
        '<span class="input-group-addon"><i class="ace-icon fa fa-calendar bigger-110"></i>' +
        '</span>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="form-group">' +
        '<div class="col-sm-2">' +
        '</div>' +
        '<h4 class="col-sm-8 control-label no-padding-right header blue">' +
        '2. İzin Tercihi</h4>' +
        '</div>' +
        '<div class="form-group">' +
        '<label class="col-sm-5 control-label no-padding-right " for="id-date-range-picker-1">' +
        'İzin Başlangıç Tarihi</label>' +
        '<div class="col-sm-5">' +
        '<div class="input-group" style="z-index: 99999">' +
        '<input class="form-control date-picker required" id="izinBaslangicTarihiTercih2"' +
        'type="text" name="startdate">' +
        '<span class="input-group-addon"><i class="ace-icon fa fa-calendar bigger-110"></i>' +
        '</span>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="form-group">' +
        '<label class="col-sm-5 control-label no-padding-right " for="id-date-range-picker-1">' +
        'İzin Bitiş Tarihi</label>' +
        '<div class="col-sm-5">' +
        '<div class="input-group" style="z-index: 99999">' +
        '<input class="form-control date-picker required" id="izinBitisTarihiTercih2" type="text"' +
        ' />' +
        '<span class="input-group-addon"><i class="ace-icon fa fa-calendar bigger-110"></i>' +
        '</span>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="form-group">' +
        '<div class="col-sm-2">' +
        '</div>' +
        '<h4 class="col-sm-8 control-label no-padding-right header blue">' +
        '3. İzin Tercihi</h4>' +
        '</div>' +
        '<div class="form-group">' +
        '<label class="col-sm-5 control-label no-padding-right " for="id-date-range-picker-1">' +
        'İzin Başlangıç Tarihi</label>' +
        '<div class="col-sm-5">' +
        '<div class="input-group" style="z-index: 99999">' +
        '<input class="form-control date-picker required" id="izinBaslangicTarihiTercih3"' +
        'type="text" name="startdate">' +
        '<span class="input-group-addon"><i class="ace-icon fa fa-calendar bigger-110"></i>' +
        '</span>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="form-group">' +
        '<label class="col-sm-5 control-label no-padding-right " for="id-date-range-picker-1">' +
        'İzin Bitiş Tarihi</label>' +
        '<div class="col-sm-5">' +
        '<div class="input-group" style="z-index: 99999">' +
        '<input class="form-control date-picker required" id="izinBitisTarihiTercih3" type="text"' +
        '/>' +
        '<span class="input-group-addon"><i class="ace-icon fa fa-calendar bigger-110"></i>' +
        '</span>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<br />' +
        '<div class="clearfix">' +
        '</div>' +
        '<br />' +
        '</div>' +
        '</div>' +
        '</div>';

        var object = $('<div/>').html(formStr).contents();

        object.find('#izinBaslangicTarihiTercih1').datepicker({ format: 'dd/mm/yyyy', autoclose: true, language: 'tr' }).next().on("changeDate", function () {
            $(this).prev().focus();
        });

        object.find('#izinBitisTarihiTercih1').datepicker({ format: 'dd/mm/yyyy', autoclose: true, language: 'tr' }).next().on("changeDate", function () {
            $(this).prev().focus();
        });

        object.find('#izinBaslangicTarihiTercih2').datepicker({ format: 'dd/mm/yyyy', autoclose: true, language: 'tr' }).next().on("changeDate", function () {
            $(this).prev().focus();
        });

        object.find('#izinBitisTarihiTercih2').datepicker({ format: 'dd/mm/yyyy', autoclose: true, language: 'tr' }).next().on("changeDate", function () {
            $(this).prev().focus();
        });
        object.find('#izinBaslangicTarihiTercih3').datepicker({ format: 'dd/mm/yyyy', autoclose: true, language: 'tr' }).next().on("changeDate", function () {
            $(this).prev().focus();
        });
        object.find('#izinBitisTarihiTercih3').datepicker({ format: 'dd/mm/yyyy', autoclose: true, language: 'tr' }).next().on("changeDate", function () {
            $(this).prev().focus();
        });

        return object;
    }

    $scope.set_color = function (hazirlayan) {
        if (hazirlayan == 1) {
            return { 'background-color': "pink" }
        }
    }

    //    $scope.OpenDialogForFarkliPlanla = function (size) {

    //        var modalInstance = $modal.open({
    //            templateUrl: "myModalContent.html",
    //            controller: 'izinplanonayController',
    //            size: 150,
    //            resolve: {
    //                items: function () {
    //                    //return $scope.items;
    //                }
    //            }
    //        });

    //        modalInstance.result.then(function (selectedItem) {
    //          //  $scope.selected = selectedItem;
    //        }, function () {
    //            $log.info('Modal dismissed at: ' + new Date());
    //        });
    //    };

    $scope.OpenDialogForFarkliPlanla = function (req) {
        BootstrapDialog.show({
            title: 'İzin Plan Değiştirme',
            message: BootboxContent(req),
            type: BootstrapDialog.TYPE_INFO,
            draggable: true,
            buttons: {
                success: {
                    label: "Değiştir ve Onayla",
                    className: "btn-success btn-round",
                    action: function (dialogItself) {
                        var status = false;
                        var baslangicTarihi1 = $("#izinBaslangicTarihiTercih1").val();
                        var bitisTarihi1 = $("#izinBitisTarihiTercih1").val();
                        var baslangicTarihi2 = $("#izinBitisTarihiTercih2").val();
                        var bitisTarihi2 = $("#izinBaslangicTarihiTercih2").val();
                        var baslangicTarihi3 = $("#izinBaslangicTarihiTercih3").val();
                        var bitisTarihi3 = $("#izinBitisTarihiTercih3").val();

                        if (baslangicTarihi1 == "" || bitisTarihi1 == "") {
                            if (baslangicTarihi1 == "") {
                                var $formGroup = $("#izinBaslangicTarihiTercih1").parents('.form-group');
                                $formGroup.addClass('has-error');
                            }
                            if (bitisTarihi1 == "") {
                                var $formGroup = $("#izinBitisTarihiTercih1").parents('.form-group');
                                $formGroup.addClass('has-error');
                            }
                        }
                        var request = {

                            Plan: {
                                BirinciDonemBaslangic: baslangicTarihi1,
                                BirinciDonemBitis: bitisTarihi1,
                                IkinciDonemBaslangic: baslangicTarihi2,
                                IkinciDonemBitis: bitisTarihi2,
                                UcuncuDonemBaslangic: baslangicTarihi3,
                                UcuncuDonemBitis: bitisTarihi3,
                                ObjId: req.ObjId
                            }
                        };

                        izinPlanOnayService.izinPlanFarkliDuzenle(request)
                        .success(
                            function (data, status, headers, config) {
                                $rootScope.ShowInfo("İzin planı başarıyla değiştirdiniz.");
                                $scope.SayfayiDoldur();
                                dialogItself.close();
                            });
                    }
                }
            }
        });
    };

    $scope.IzinPlanOnayla = function (req) {
        var request = {
            IKIzinPlanObjId: req
        };

        izinPlanOnayService.izinPlanOnayla(request)
        .success(
            function (data, status, headers, config) {
                $scope.SayfayiDoldur();
                $rootScope.ShowInfo("İzin planı başarıyla onaylandı.");
            });
    };

    $scope.IzinPlanIptalEt = function (req) {
        bootbox.dialog({
            title: "İzin Plan Değiştirme",
            message: BootboxContentForIptalEt(req),
            class: '',
            buttons: {
                success: {
                    label: "İptal Et",
                    className: "btn-success",
                    callback: function () {
                        var aciklama = $("#form-field-11").val();
                        if (aciklama == '') {

                            var formgroup = $("#form-field-11").parents('.form-group');
                            formgroup.addClass('has-error');
                            return false;
                        }

                        var request = {
                            IkIzinPlanObjId: req,
                            Aciklama: aciklama
                        };

                        izinPlanOnayService.izinPlanIptalEt(request)
                         .success(
                             function (data, status, headers, config) {
                                 $scope.SayfayiDoldur();
                                 $rootScope.ShowInfo("İzin planı iptal edildi.");
                             });
                    }
                }
            }
        });
    };

    $scope.IzinPlanFarkliDuzenle = function (req) {
        izinPlanOnayService.izinPlanFarkliDuzenle(req)
        .success(
         function (data, status, headers, config) {
             $rootScope.ShowInfo("İzin planı farklı düzenlendi.");
             $scope.GetAmirIzinPlanlari();
         });
    };

    $scope.NotFarkliPlanlama = function () {
        $rootScope.ShowWarning("Farklı planlama yapamazsınız!");
    };

    $scope.NotOnayla = function () {
        $rootScope.ShowWarning("Onaylama yapamazsınız!");
    };

    $scope.NotIptal = function () {
        $rootScope.ShowWarning("İptal edemezsiniz!");
    };

    $scope.SayfayiDoldur();
} ]);

