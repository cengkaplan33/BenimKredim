angular
.module('mainApp.services.izin.izinTakvimiService', [])
.factory('izinTakvimiService', ['$http', function ($http) {
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

