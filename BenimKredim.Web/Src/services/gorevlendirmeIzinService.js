angular
.module('mainApp.services.izinTalep.gorevlendirmeIzinService', [])
.factory('gorevlendirmeIzinService', ['$http', function ($http) {
    return {      
        getPersonelIzinArsiv: function () {
            return $http
            ({
                method: 'POST',
                url: Q.ResolveUrl('api/Izin/IzinArsive'),
                data: {
                    IzinTipi : 9 //IKIzinTipleri enumda gorevlendirme
                }
            })
        },

        gorevlendirmeIzinKaydet: function (formData) {
            return $http
            ({
                method: 'POST',
                url: Q.ResolveUrl('api/GorevlendirmeIzin/gorevlendirmeIzinKaydet'),
                data: formData

            });
        },             

        izinGunleriniHesapla: function (request) {
            return $http
            ({
                method: 'POST',
                url: Q.ResolveUrl('api/GorevlendirmeIzin/IzinGunleriniHesapla'),
                data: request
            });
        },

        izinSaatiHesapla: function (request) {
            return $http
            ({
                method: 'POST',
                url: Q.ResolveUrl('api/GorevlendirmeIzin/IzinSaatiHesapla'),
                data: request

            });
        },

        print: function (formData) {
            return $http
            ({
                method: 'POST',
                url: Q.ResolveUrl('gorevlendirmeIzin/PdfExport'),
                data: "{'izinObjId':'" + formData + "'}"
            });
        },
    };
}
]);
