var loginControllers = angular.module('mainApp.controllers.login.loginController', []);

loginControllers.controller('loginController', ['$rootScope', '$scope', '$http', 'loginService', function ($rootScope, $scope, $http, loginService) {
    $scope.Data = {
        UserName: '',
        PassWord: '',
        SmsLoginDone: false,
        PersonelNoLogin: false,
        CepTel: '',
    };

    $scope.ClearField = function () {
        $scope.Data = {
            UserName: '',
            PassWord: '',
            SmsLoginDone: false,
            PersonelNoLogin: false,
            CepTel: '',
        };
    };

    $scope.ButtonDisable = false;

    function ContentDialog(ceptel) {
        var dialogText = '<div class="row">  ' +
                    '<div class="col-md-12"> ' +
                    '<div class="form-group">' +
                    '<label class="col-sm-9 bolder">' +
                    'Telefon numaranýz yanlýþ ise ÝK yetkilinizle görüþünüz.' +
                    '</label>' +
                    '</div>' +
                    '<div class="form-group">' +
                    '<label class="col-sm-9 bolder" id="KullaniciBilgileri">' +
                    'Kayýtlý Telefon Numaranýz: ' + ceptel +
                    '</label>' +
                    '</div>' +
                    '</div>' +
                    '</div>';

        return dialogText;
    }

    function ContentDialogSmsOnay() {
        var dialogText = '<div class="row">  ' +
                    '<div class="col-md-12"> ' +
                    '<div class="form-group">' +
                    '<label class="col-sm-9 bolder">' +
                    'Telefonunuza gelen Mobil Onay Kodunuzu lütfen verilen süre içerisinde giriniz.' +
                    '</label>' +
                    '</div>' +
                    '<div class="form-group"> ' +
                    '<label class="col-sm-5 bolder" for="name" >Onay Kodu</label> ' +
                    '<div class="col-md-12"> ' +
                    '<input id="InputOnayKodu" maxlength="6" name="InputOnayKodu" type="text" placeholder="Onay Kodu" class="form-control input-md"> ' +
                    '<span class="help-block error"></span></div> ' +
                    '</div> ' +
                    '<div class="form-group">' +
                    '<label class="col-sm-3 bolder">' +
                    'Kalan Süre' +
                    '</label>' +
                    '<label id="LabelKalanSure" class="col-md-6  align-left"' +
                    '-' +
                    '</label>' +
                    '</div>' +
                    '</div>';

        return dialogText;
    }

    var zaman = (5 * 60);
    var kalan_dakika = 5;
    var kalan_saniye = 00;

    function zamanSifirla() {
        zaman = (5 * 60);
        kalan_dakika = 5;
        kalan_saniye = 00;
    }

    function zamanYuzDakika() {
        kalan_dakika = 100;
    }

    function geri_say() {

        zaman = zaman - 1;
        kalan_dakika = Math.floor((zaman % 3600) / 60);
        kalan_saniye = zaman % 60;

        var yeni_zaman = "";
        if (kalan_dakika > 0 || kalan_saniye > 0) {

            if (kalan_saniye.toString().length > 1) {
                yeni_zaman = "0" + kalan_dakika + ":" + kalan_saniye;
            }
            else {
                yeni_zaman = "0" + kalan_dakika + ":0" + kalan_saniye;
            }

            if (kalan_dakika == 0 && kalan_saniye > 0) { yeni_zaman = "<font style='font-size:14px;color:red;'>" + yeni_zaman + "</font>"; }
        } else {
            location.reload();
        }

        $("#LabelKalanSure").html(yeni_zaman);

        if (zaman > 0) { setTimeout(geri_say, 1000); }
    }

    $scope.LogIn = function () {
        $scope.ButtonDisable = true;
        loginService.validateUser($scope.Data)
        .success(function (response, status, headers, config) {
            if (!response.IsValid) {
                $scope.ButtonDisable = false;
                $scope.Validate = false;
                $scope.ValidateMessage = response.ErrorMessage;
                return;
            }
            if (response.SmsLoginAuthentication) {
                $scope.Data.CepTel = response.CepTel;
                bootbox.confirm({
                    message: ContentDialog($scope.Data.CepTel),
                    buttons: {
                        'cancel': {
                            label: 'Ýptal Et',
                            className: 'btn-default pull-left'
                        },
                        'confirm': {
                            label: 'Onay Kodu Gönder',
                            className: 'btn-danger pull-right'
                        }
                    },
                    callback: function (result) {
                        if (result) {
                            $scope.Data.SmsLoginShow = true;
                            loginService.validateUser($scope.Data)
                                                    .success(function (response, status, headers, config) {
                                                        if (response.SmsLoginAuthentication) {
                                                            zamanSifirla();
                                                            geri_say();
                                                            var authenticationCode = response.DogrulamaKodu;
                                                            bootbox.dialog({
                                                                title: "Guvenli Giris",
                                                                message: ContentDialogSmsOnay(),
                                                                buttons: {
                                                                    success: {
                                                                        label: "Devam Et",
                                                                        className: "btn-success",
                                                                        callback: function () {
                                                                            var onayKodu = $('#InputOnayKodu').val();
                                                                            if (onayKodu == "" || onayKodu == null) {
                                                                                var $formGroup = $('#InputOnayKodu').parents('.form-group');
                                                                                $formGroup.addClass('has-error');
                                                                                return false;
                                                                            }

                                                                            if (onayKodu != authenticationCode) {
                                                                                $(".help-block").text("Onay kodunu hatali girdiniz!")
                                                                                return false;
                                                                            }

                                                                            $scope.Data.SmsLoginDone = true;
                                                                            loginService.validateUser($scope.Data)
                                                                                .success(function (response, status, headers, config) {
                                                                                    if (!response.IsValid) {
                                                                                        $scope.ButtonDisable = false;
                                                                                        $scope.Validate = false;
                                                                                        $scope.ValidateMessage = response.ErrorMessage;
                                                                                        return false;
                                                                                    }

                                                                                    window.location.href = Q.ResolveUrl(response.RedirectPage);
                                                                                    return true;
                                                                                });
                                                                            return false;
                                                                        }
                                                                    }
                                                                }
                                                            });
                                                            return;
                                                        }
                                                    })
                        }
                    }
                });
                return;
            }
            $scope.ButtonDisable = false;
            window.location.href = Q.ResolveUrl(response.RedirectPage);
            return true;
        })
        .error(function (response, status, headers, config) {
            $scope.ButtonDisable = false;
            $scope.Validate = false;
            $scope.ValidateMessage = response.ErrorMessage;
            return;
        });
    }

    $scope.LogOut = function () {

        loginService.logOut()
        .success(function (data, status, headers, config) {
            window.location.href = Q.ResolveUrl(data.RedirectPage);
        });
    };

    $scope.ShowHelp = function () {
        BootstrapDialog.show({
            title: 'Yardým',
            message: $('<div></div>').load('Login/HelpPage'),
            draggable: true,
            buttons: [{
                label: 'Kapat',
                cssClass: 'btn-round',
                action: function (dialogItself) {
                    dialogItself.close();
                }
            }]
        });
    }
}]);
