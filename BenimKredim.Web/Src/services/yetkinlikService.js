angular
.module('mainApp.services.yetkinlik.yetkinlikService', [])
.factory('yetkinlikService', ['$http', function ($http) {
    return {
        personelYetkinlikAilesiGetir: function (request) {
            return $http({
                method: 'POST',
                url: Q.ResolveUrl('api/Yetkinlik/PersonelYetkinlikAilesiGetir'),
                data: request
            });
        },
        personelYetkinlikDavranisGetir: function (request) {
            return $http({
                method: 'POST',
                url: Q.ResolveUrl('api/Yetkinlik/PersonelYetkinlikDavranisGetir'),
                data: request
            });
        },
        personelYetkinlikGetir: function (request) {
            return $http({
                method: 'POST',
                url: Q.ResolveUrl('api/Yetkinlik/PersonelYetkinlikGetir'),
                data: request
            });
        }
    };
}
]);