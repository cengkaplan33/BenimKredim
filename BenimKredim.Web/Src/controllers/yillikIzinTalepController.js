var yillikIzinTalepControllers = angular.module('mainApp.controllers.izinTalep.yillikIzinTalepController', []);

yillikIzinTalepControllers
    .directive('repeatDone', function () {
        return function (scope, element, attrs) {
            if (scope.$last) { // all are rendered
                scope.$eval(attrs.repeatDone);
            }
        }
    });


yillikIzinTalepControllers.controller('yillikIzinTalepController', ['$rootScope', '$scope', '$http', '$timeout', '$filter', 'yillikIzinTalepService', 'personelService', 'ngTableParams',
            function ($rootScope, $scope, $http, $timeout, $filter, yillikIzinTalepService, personelService, ngTableParams) {
                $scope.newizintalep = {
                    IzinBaslangicTarihi: '',
                    IzinBitisTarihi: '',
                    YolIzniGun: '',
                    CepTel: '',
                    VekaletEdecekObjId: '',
                    Aciklama: '',
                    IsBasiTarihi: '',
                    IzinGun: '',
                    GecDoldurmaMazereti: '',
                    ObjId: '',
                    HaftaTatili: ''
                };

                $scope.tableParams = new ngTableParams({
                    page: 1,            // show first page
                    count: 5           // count per page
                },
                    {
                        getData: function ($defer, params) {
                            yillikIzinTalepService
                         .getPersonelIzinArsiv()
                         .success(function (data, status, headers, config) {
                             $timeout(function () {
                                 params.total(data.Data.Entities.length);
                                 $defer.resolve(data.Data.Entities.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                             }, 500);
                         });
                        }
                    });

                $scope.Days = $rootScope.Days;

                $scope.IsAddMode = true;
                $scope.FillPage = function () {
                    var $requiredForm = $("#requiredForm");
                    personelService
                    .getPersonelHakedisBilgileri()
                    .success(function (data, status, headers, config) {
                        $scope.HakedisBilgileri = data.Data.Hakedis;
                    });

                    personelService
                    .getPersonelBilgileri()
                    .success(function (data, status, headers, config) {
                        $scope.PersonelBilgileri = data.Data.Personel;
                        $scope.newizintalep.VekaletEdecekObjId = -1;
                        $scope.newizintalep.YolIzniGun = 0;
                    });

                    personelService
                    .getPersonelVekiller()
                    .success(function (data, status, headers, config) {
                        $scope.PersonelVekiller = data.Data.Vekiller;
                    });

                };

                $scope.ReloadGrid = function () {
                    $scope.tableParams.reload();
                }

                $scope.ConvertChosen = function (req) {
                    $timeout(function () {
                        var $chosenSelect = $('.form-horizontal').find('.chosen-select');
                        $chosenSelect.chosen();
                    }, 0); // wait.
                };

                $scope.NotDelete = function (req) {
                    $rootScope.ShowWarning(req);
                };

                $scope.NotPrint = function () {
                    $rootScope.ShowWarning("Bu aşamada çıktı alamazsınız.");
                };

                $scope.NotUpdate = function (req) {
                    $rootScope.ShowWarning(req);
                };

                $scope.add = function () {
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

                    if (status) {
                        if ($scope.IsAddMode) {
                            var YillikIzinTalep = {
                                izinTalep: {
                                    IzinBaslangicTarihi: $scope.newizintalep.IzinBaslangicTarihi,
                                    IzinBitisTarihi: $scope.newizintalep.IzinBitisTarihi,
                                    YolIzniGun: $scope.newizintalep.YolIzni,
                                    CepTel: $scope.PersonelBilgileri.CepTelefonu1,
                                    VekaletEdecekObjId: $scope.newizintalep.VekaletEdecekObjId,
                                    Aciklama: $scope.newizintalep.Aciklama,
                                    GecDoldurmaMazereti: $scope.newizintalep.GecDoldurmaMazereti,
                                    IsBasiTarihi: '',
                                    HaftaTatili : $scope.newizintalep.HaftaTatili,
                                    IzinGun: ''
                                }
                            };

                            yillikIzinTalepService.yillikIzinTalepEt(YillikIzinTalep)
                            .success
                            (
                                function (data, status, headers, config) {
                                    $scope.ReloadGrid();
                                    $scope.ClearField();
                                    $rootScope.ShowInfo("Yıllık izniniz başarı ile oluşturuldu.");
                                }
                            );
                        }
                        else {
                            var YillikIzinTalep = {
                                izintalep: {
                                    ObjId: $scope.newizintalep.ObjId,
                                    IzinBaslangicTarihi: $scope.newizintalep.IzinBaslangicTarihi,
                                    IzinBitisTarihi: $scope.newizintalep.IzinBitisTarihi,
                                    YolIzniGun: $scope.newizintalep.YolIzniGun,
                                    CepTel: $scope.PersonelBilgileri.CepTelefonu1,
                                    VekaletEdecekObjId: $scope.newizintalep.VekaletEdecekObjId,
                                    Aciklama: $scope.newizintalep.Aciklama,
                                    GecDoldurmaMazereti: $scope.newizintalep.GecDoldurmaMazereti,
                                    IsBasiTarihi: '',
                                    HaftaTatili: $scope.newizintalep.HaftaTatili,
                                    IzinGunu: ''
                                }
                            };

                            yillikIzinTalepService.yillikIzinGuncelle(YillikIzinTalep)
                            .success
                            (
                                function (data, status, headers, config) {
                                    $scope.ReloadGrid();
                                    $scope.ClearField();
                                    $rootScope.ShowInfo("Yıllık izniniz başarı ile güncellendi.");
                                }
                            );
                        }
                    }
                };

                $scope.Edit = function (req) {
                    var requestIzin = {
                        EntityId: req
                    };
                    $scope.IsAddMode = false;
                    yillikIzinTalepService
                            .getSinglePersonelIzin(requestIzin)
                            .success(function (data, status, headers, config) {
                                $scope.newizintalep.IzinBaslangicTarihi = data.Data.IzinTalep.IzinBaslangicTarihi;
                                $scope.newizintalep.IzinBitisTarihi = data.Data.IzinTalep.IzinBitisTarihi;
                                $scope.newizintalep.YolIzniGun = data.Data.IzinTalep.YolIzniGun;
                                $scope.PersonelBilgileri.CepTelefonu1 = data.Data.IzinTalep.CepTel;
                                $scope.newizintalep.VekaletEdecekObjId = data.Data.IzinTalep.VekaletEdecekObjId;
                                $scope.newizintalep.Aciklama = data.Data.IzinTalep.Aciklama;
                                $scope.newizintalep.ObjId = data.Data.IzinTalep.ObjId;
                                $scope.newizintalep.IsBasiTarihi = data.Data.IzinTalep.IsbasiTarihi;
                                $scope.newizintalep.IzinGun = data.Data.IzinTalep.IzinGun;
                                $scope.newizintalep.HaftaTatili = data.Data.IzinTalep.HaftaTatili;
                                $scope.newizintalep.GecDoldurmaMazereti = data.Data.IzinTalep.GecDoldurmaMazereti;
                            });
                };

                $scope.$watch('newizintalep.VekaletEdecekObjId', function () {
                    $timeout(function () {
                        var $chosenSelect = $('.form-horizontal').find('.chosen-select');
                        $chosenSelect.trigger("chosen:updated")
                    }, 0); // wait.
                });

                $scope.$watch('newizintalep.IzinBitisTarihi', function () {
                    if ($scope.newizintalep.IzinBitisTarihi == '') {
                        $scope.showGecDoldurmaMazereti = false;
                        return;
                    }

                    if (new Date($scope.newizintalep.IzinBitisTarihi) < new Date()) {
                        $scope.showGecDoldurmaMazereti = true;
                    }
                    else
                        $scope.showGecDoldurmaMazereti = false;
                });

                $scope.ClearField = function () {
                    $scope.newizintalep = {
                        IzinBaslangicTarihi: '',
                        IzinBitisTarihi: '',
                        YolIzniGun: '',
                        CepTel: '',
                        VekaletEdecekObjId: '',
                        GecDoldurmaMazereti: '',
                        Aciklama: '',
                        IsBasiTarihi: '',
                        HaftaTatili: '',
                        IzinGun: '',
                        ObjId: ''
                    };
                    $("#LabelIzinGun").text("");
                    $("#LabelIsBasiTarihi").text("");
                };

                function BootboxContent(izin) {
                    var baslangicTarihi = izin.BaslangicTarihi;
                    var bitisTarihi = izin.BitisTarihi;
                    var frm_str = '<div class="row" id="SebepRowForm">  ' +
                                '<div class="col-md-12"> ' +
                                '<form class="form-horizontal"> ' +
                                '<div class="form-group"> ' +
                                '<label class="col-md-4 control-label"> Bitiş Tarihi </label> ' +
                                '<div class="col-md-4"> ' +
                                '<div class="input-group" style="z-index: 99999">' +
                                                '<input class="form-control input-sm date-picker required" type="text" id="mazeretTarihi" mo-date-input="{{dd/MM/yyyy}}" />' +
                                                '<span class="input-group-addon"><i class="ace-icon fa fa-calendar bigger-110"></i></span>' +
                                            '</div>' +
                                '</div>' +
                                '</div>' +
                                '<div class="form-group"> ' +
                                '<label class="col-md-4 control-label" for="name">Gerekçe</label> ' +
                                '<div class="col-sm-8"> ' +
                                '<select class="col-sm-9 required" id="selectGerekce">' +
                                '<option value="1" selected> İş gerekleri nedeniyle erken işbaşı </option>' +
                                '</select>' +
                                '</div> ' +
                                '</div> ' +
                                '</form> </div></div>';

                    var object = $('<div/>').html(frm_str).contents();
                    object.find('#mazeretTarihi').datepicker({ format: 'dd/mm/yyyy', startDate: $filter('date')(baslangicTarihi, "dd/MM/yyyy"), endDate: $filter('date')(bitisTarihi, "dd/MM/yyyy"), autoclose: true, defaultDate: baslangicTarihi, language: 'tr' }).next()
                    .on("changeDate", function () {
                        $(this).prev().focus();
                    }).on(ace.click_event, function () {
                        $(this).prev().focus();
                    });;

                   return object;
                }

                $scope.EditMazeret = function (req) {
                    BootstrapDialog.show({
                        title: "Mazeret girişini yapınız",
                        message: BootboxContent(req),
                        type: BootstrapDialog.TYPE_WARNING,
                        draggable: true,
                        buttons: {
                            success: {
                                label: "Talep Güncelle",
                                cssClass: "btn-sm btn-success btn-round",
                                action: function () {
                                    var $mazeretTarihi = $.datepicker.formatDate("yy-mm-dd", $('#mazeretTarihi').datepicker("getDate"));
                                    var $Sebep = $("#selectGerekce").val();

                                    var status = true;
                                    var $requiredForm = $('#SebepRowForm');
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

                                    if (status) {
                                        var requestIzin = {
                                            IzinObjId: req.ObjId,
                                            ErkenIsbasiTarihi: $mazeretTarihi,
                                            ErkenIsbasiSebep: $Sebep
                                        };

                                        yillikIzinTalepService
                                                .sebepliYillikIzinGuncelle(requestIzin)//parametre konulacak daha sonra
                                                    .success(function (data, status, headers, config) {
                                                        $scope.ReloadGrid();
                                                        $scope.ClearField();
                                                        $rootScope.ShowInfo("Yeni izin talebiniz yöneticinizin onayına gönderilmiştir.");
                                                    });
                                    }
                                    else {
                                        return false;
                                    }
                                }
                            }
                        }
                    }
                    );
                };

                $scope.Print = function (req) {
                    yillikIzinTalepService
                                    .print(req)
                                    .success(function (data, status, headers, config) {
                                        $rootScope.ShowInfo("Talep yazdırma işlemi başarılı.");
                                    });
                };

                $scope.ShowMessage = function (mesaj) {
                    $rootScope.ShowInfo(mesaj);
                };

                $scope.Delete = function (req) {
                    BootstrapDialog.confirm('İzninizi silmek istediğinize emin misiniz?',
                            function (result) {
                                if (!result)
                                    return;

                                var requestIzin = { EntityId: req };
                                yillikIzinTalepService
                                .deleteIzinArsiv(requestIzin)
                                .success(function (data, status, headers, config) {
                                    $scope.IsAddMode = true;
                                    $scope.ClearField();
                                    $scope.ReloadGrid();
                                    $rootScope.ShowInfo("İşlem başarılı bir şekilde tamamlandı.");
                                });
                            });
                };

                if ($scope.IsAddMode) {
                    $scope.FillPage();
                }
            }]);
