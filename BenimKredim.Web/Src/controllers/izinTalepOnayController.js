var izinTalepOnayControllers = angular.module('mainApp.controllers.izinTalep.izinTalepOnayController', []);

izinTalepOnayControllers.controller('izinTalepOnayController', ['$rootScope', '$scope', '$http', 'izinTalepOnayService','$filter','$window', function ($rootScope, $scope, $http, izinTalepOnayService, $filter, $window) {
    $scope.SayfayiDoldur = function () {
        $scope.IzinGridDoldur('1', $scope.DefaultOnayDurumu);
        $scope.IzinGridDoldur('5', $scope.DefaultOnayDurumu);
        $scope.IzinGridDoldur('2', $scope.DefaultOnayDurumu);
        $scope.IzinGridDoldur('8', $scope.DefaultOnayDurumu);
        $scope.IzinGridDoldur('9', $scope.DefaultOnayDurumu);
    };

    $scope.GetOnayDurumlari = function () {
        $scope.OnayDurumlari = [
                                    { text: 'Hepsi', value: 'null' },
                                    { text: 'Onay Bekleyen Talepler', value: '0' },
                                    { text: 'İptal Edilen Talepler', value: '1' },
                                    { text: 'Onaylanan Talepler', value: '2' }
        ];

        $scope.DefaultOnayDurumu = '0';
    };

    $scope.changeOnayDurumu = function () {
        $scope.SayfayiDoldur();
    };

    function BootboxContentForIptalEt() {
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

    $scope.IzinTalepReddet = function (req) {

        bootbox.dialog({
            title: "İzin Talep Onay Reddet",
            message: BootboxContentForIptalEt(),
            class: '',
            buttons: {
                success: {
                    label: "Reddet",
                    className: "btn-success",
                    callback: function () {
                        var aciklama = $("#form-field-11");
                        if (aciklama.val() == '') {
                            var formgroup = aciklama.parents('.form-group');
                            formgroup.addClass('has-error');
                            return false;
                        }
                        else {
                            var request = {
                                TalepObjId: req,
                                Aciklama: aciklama.val()
                            };

                            izinTalepOnayService.izinTalepReddet(request)
                             .success(
                             function (data, status, headers, config) {
                                 $scope.SayfayiDoldur();
                                 $rootScope.ShowInfo("İzin talebini reddettiniz.");
                             });
                        }
                    }
                }
            }
        });
    };

    $scope.IzinTalepOnayla = function (req) {
        BootstrapDialog.confirm('İzin talebini onaylamak istiyor musunuz?',
           function (result) {
               if (!result)
                   return;
               var request = { IzinTalep: { TalepObjId: req } };

               izinTalepOnayService.izinTalepOnay(request)
               .success(
                   function (data, status, headers, config) {
                       $scope.SayfayiDoldur();
                       $rootScope.ShowInfo("İzin talebini onayladınız.");
                   });
           });
    };

    $scope.IzinGridDoldur = function (izinTuru, onayDurumu) {
        var request = {
            IzinTuru: izinTuru,
            IzinOnayDurumu: onayDurumu
        };

        izinTalepOnayService.izinTalepOnayList(request)
            .success(function (data, status, headers, config) {
                if(izinTuru == '1')
                    $scope.YillikIzinList = data.Data.IzinTalepList;
                else if(izinTuru == '2')
                    $scope.MazeretIzinList = data.Data.IzinTalepList;
                else if(izinTuru == '5')
                    $scope.IdariIzinList = data.Data.IzinTalepList;
                else if (izinTuru == '8')
                    $scope.UcretsizIzinList = data.Data.IzinTalepList;
                else if (izinTuru == '9')
                    $scope.GorevlendirmeList = data.Data.IzinTalepList;
            });
    };

    $scope.NotOnay = function () {
        $rootScope.ShowWarning("Onaylama yapamazsınız");
    }

    $scope.NotReddet = function () {
        $rootScope.ShowWarning("Bu işlemi yapamazsınız");
    }

    $scope.GetOnayDurumlari();
    $scope.SayfayiDoldur();
  
} ]);

