angular
.module('mainApp.services.tasitKredisi.tasitKredisiService', [])
.factory('tasitKredisiService', ['$http', function ($http) {
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