angular
.module('mainApp.services.bireyselKredi.bireyselKrediService', [])
.factory('bireyselKrediService', ['$http', function ($http) {
    return {
        searchh: function (request) {
            return $http
            ({
                method: 'POST',
                url: 'Search',
                data: request
            });
        },
        VadeListesi: function () {
            return $http
            ({
                method: 'POST',
                url: 'VadeListesi',
            });
        },
    };
}
]);