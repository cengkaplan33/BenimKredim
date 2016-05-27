angular
.module('mainApp.services.izinTalep.idariIzinService', [])
.factory('idariIzinService', ['$http', function ($http) {
    return {
        getPersonelIzinArsiv: function () {
            return $http
            ({
                method: 'POST',
                url: Q.ResolveUrl('api/Izin/IzinArsive'),
                data: {
                    IzinTipi : 5 //IKIzinTipleri enumda idari
                }
            })
        },

        idariIzinKaydet: function (formData) {
            return $http
            ({
                method: 'POST',
                url: Q.ResolveUrl('api/idariIzin/idariIzinKaydet'),
                data: formData

            });
        },

        izinSaatiHesapla: function (request) {
            return $http
            ({
                method: 'POST',
                url: Q.ResolveUrl('api/idariIzin/IzinSaatiHesapla'),
                data: request

            });
        },

        print: function (formData) {
            return $http
            ({
                method: 'POST',
                url: Q.ResolveUrl('idariIzin/PdfExport'),
                data: "{'izinObjId':'" + formData + "'}"
            });
        },
    };
}
]);
