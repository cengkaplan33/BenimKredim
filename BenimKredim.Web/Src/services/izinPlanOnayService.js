angular
.module('mainApp.services.izinOnay.izinPlanOnayService', [])
.factory('izinPlanOnayService', ['$http', function ($http) {
    return {
        getYillar: function () {
            return $http
            ({
                method: 'POST',
                url: Q.ResolveUrl('api/IzinPlani/GetIzinPlanOnayYillar'),
                data: {}
            });
        },

        getAmirIzinPlanlar: function (req) {
            return $http({
                method: 'POST',
                url: Q.ResolveUrl('api/IzinPlani/GetAmirIzinPlanlari'),
                data: req
            });
        },

        izinPlanOnayla: function (req) {
            return $http({
                method: 'POST',
                url: Q.ResolveUrl('api/IzinPlani/IzinPlanOnayla'),
                data: req
            });

        },

        izinPlanIptalEt: function (req) {
            return $http({
                method: 'POST',
                url: Q.ResolveUrl('api/IzinPlani/IzinPlanIptalEt'),
                data: req
            });
        },

        izinPlanFarkliDuzenle: function (req) {
            return $http({
                method: 'POST',
                url: Q.ResolveUrl('api/IzinPlani/IzinPlanAmirFarkliPlanla'),
                data: req
            });
        },
    };
}
]);