angular
.module('mainApp.services.izinTalep.yillikIzinTalepService', [])
.factory('yillikIzinTalepService', ['$http', function ($http) {
    return {
        getPersonelIzinArsiv: function () {
            return $http
            ({
                method: 'POST',
                url: Q.ResolveUrl('api/Izin/IzinArsive'),
                data: {
                    IzinTipi : 1
                }
            })
        },

        getSinglePersonelIzin: function (request) {
            return $http
            ({
                method: 'POST',
                url: Q.ResolveUrl("api/IzinTalep/GetSingleIzinArsive"),
                data: request
            });
        },

        deleteIzinArsiv: function (request) {
            return $http
            ({
                method: 'POST',
                url: Q.ResolveUrl("api/IzinTalep/IzinTalepSil"),
                data: request
            });
        },

        yillikIzinTalepEt: function (formData) {
            return $http
            ({
                method: 'POST',
                url: Q.ResolveUrl('api/IzinTalep/IzinTalepEt'),
                data: formData

            });
        },

        sebepliYillikIzinGuncelle: function (formData) {
            return $http
            ({
                method: 'POST',
                url: Q.ResolveUrl('api/IzinTalep/ErkenIsbasiIzinGuncelle'),
                data: formData
            });
        },

        yillikIzinGuncelle: function (formData) {
            return $http
            ({
                method: 'POST',
                url: Q.ResolveUrl('api/IzinTalep/IzinTalepGuncelle'),
                data: formData
            });
        },

        print: function (formData) {
            return $http
            ({
                method: 'POST',
                url: Q.ResolveUrl('YillikIzinTalep/PdfExport'),
                data: "{'izinObjId':'" + formData + "'}"
            });
        },

        getIzinGun: function (formData) {
            return $http
            ({
                method: 'POST',
                url: Q.ResolveUrl('api/IzinTalep/GetIzinGun'),
                data: formData
            });
        },

        getIsBasiTarihi: function (formData) {
            return $http
            ({
                method: 'POST',
                url: Q.ResolveUrl('api/IzinTalep/GetIsBasiTarihi'),
                data: formData
            });
        },

        getBaslangicBitisTarihi: function (formData) {

            return $http({

                method: 'POST',
                url: Q.ResolveUrl('api/IzinTalep/GetBaslangicBitisTarihi'),
                data: formData

            });

        }
    };
}
]);
