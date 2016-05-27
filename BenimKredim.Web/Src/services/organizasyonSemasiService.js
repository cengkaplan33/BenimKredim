angular
.module('mainApp.services.organizasyon.organizasyonSemasiService', [])
.factory('organizasyonSemasiService', ['$http', function ($http) {
    return {
        izinTakvimiList: function (request) {
            return $http
            ({
                method: 'POST',
                url: Q.ResolveUrl('api/Izin/IKIzinTakvimiList'),
                data: request

            });
        },
    };
}
]);

