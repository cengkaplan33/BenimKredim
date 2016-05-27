angular
.module('mainApp.services.izinTalep.izinTalepOnayService', [])
.factory('izinTalepOnayService', ['$http', function ($http) {
    return {
        getIzinTipleri: function () {
            return $http
            ({
                method: 'POST',
                url: Q.ResolveUrl('api/IzinTalep/GetIzinTurleri'),
                data: {}
            });
        },
        izinTalepOnayList: function (req) {
            return $http
            ({
                method: 'POST',
                url: Q.ResolveUrl('api/IzinTalep/IzinTalepOnayList'), //bu kısım değişecek.
                data: req
            });
        },

        izinTalepOnay: function (req) {
            return $http
            ({
                method: 'POST',
                url: Q.ResolveUrl('api/IzinTalep/IzinTalepOnay'), //bu kısım değişecek.
                data: req
            });
        },

        izinTalepReddet: function (req) {
            return $http
            ({
                method: 'POST',
                url: Q.ResolveUrl('api/IzinTalep/IzinTalepReddet'), //bu kısım değişecek.
                data: req
            });
        }
    };
} ]);