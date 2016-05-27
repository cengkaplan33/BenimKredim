angular
.module('mainApp.services.izinTalep.ucretsizIzinService', [])
.factory('ucretsizIzinService', ['$http', function ($http) {
    return {
        getIzinTurleri: function () {
            return $http
            ({
                method: 'POST',
                url: Q.ResolveUrl('api/UcretsizIzin/GetIzinTurleri'),
                data: {}
            })
        },
       
        getPersonelIzinArsiv: function () {
            return $http
            ({
                method: 'POST',
                url: Q.ResolveUrl('api/Izin/IzinArsive'),
                data: {
                    IzinTipi : 8 //IKIzinTipleri enumda Mazeret
                }
            })
        },

        ucretsizIzinKaydet: function (formData) {
            return $http
            ({
                method: 'POST',
                url: Q.ResolveUrl('api/UcretsizIzin/UcretsizIzinKaydet'),
                data: formData

            });
        },

        izinGunleriniHesapla: function (request) {
            return $http
            ({
                method: 'POST',
                url: Q.ResolveUrl('api/UcretsizIzin/IzinGunleriniHesapla'),
                data: request

            });
        },

        print: function (formData) {
            return $http
            ({
                method: 'POST',
                url: Q.ResolveUrl('UcretsizIzin/PdfExport'),
                data: "{'izinObjId':'" + formData + "'}"
            });
        },
    };
}
]);
