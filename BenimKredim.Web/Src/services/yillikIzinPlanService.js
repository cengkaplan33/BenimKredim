angular
.module('mainApp.services.izinPlan.yillikIzinPlanService', [])
.factory('yillikIzinPlanService', ['$http', function ($http) {
    return {
        getPersonelIzinArsiv: function () {
            return $http
            ({
                method: 'POST',
                url: Q.ResolveUrl('api/IzinPlani/GetPersonelIzinPlani'),
                data: {}
            });
        },

        getLastIzinPlani: function () {
            return $http
            ({
                method: 'POST',
                url: Q.ResolveUrl('api/IzinPlani/GetLastIzinPlani'),
                data: {}
            });
        },
       
        izinPlanKaydet: function (req) {
            return $http({
                method: 'POST',
                url: Q.ResolveUrl('api/IzinPlani/IzinPlaniKaydet'),
                data: req
            });
        },

        izinPlanGuncelle: function (req) {
            return $http({
                method: 'POST',
                url: Q.ResolveUrl('api/IzinTalep/IzinPlanGuncelle'),
                data: req
            });
        },

        getSingleIzinPlan: function (req) {
            return $http({
                method: 'POST',
                url: Q.ResolveUrl('api/IzinPlani/GetSinglePersonelIzinPlani'),
                data: req
            });
        },

        izinPlanSil: function (req) {
            return $http({
                method: 'POST',
                url: Q.ResolveUrl('api/IzinPlani/IzinPlanSil'),
                data: req
            });
        },

        GetBaslangicBitisTarihi: function (req) {
            return $http({
                method: 'POST',
                url: Q.ResolveUrl('api/IzinTalep/GetBaslangicBitisTarihi'),
                data: req
            });

        },

        getIzinGun: function (req) {
            return $http({
                method: 'POST',
                url: Q.ResolveUrl('api/IzinTalep/GetIzinGun'),
                data: req
            });

        }
    };
}
]);