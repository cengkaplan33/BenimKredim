angular
.module('mainApp.services.konutKredisi.konutKredisiService', [])
.factory('konutKredisiService', ['$http', function ($http) {
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