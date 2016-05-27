angular
.module('mainApp.services.tasitKredisi.tasitKredisiService', [])
.factory('tasitKredisiService', ['$http', function ($http) {
    return {
        searchh: function () {
            return $http
            ({
                method: 'POST',
                url: Q.ResolveUrl('TasitKredisi/Search'),
                data: request
            });
        },
    };
}
]);