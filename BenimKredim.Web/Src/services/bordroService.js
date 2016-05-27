angular
.module('mainApp.services.bordro.bordroService', [])
.factory('bordroService', ['$http', function ($http) {
    return {
        getBordroDonem : function(){
            return $http
            ({
                method: 'POST',
                url: Q.ResolveUrl('api/Bordro/GetBordroDonem'),
                data: {}
            });
        },

        getPersonelBordro: function (request) {
            return $http
            ({
                method: 'POST',
                url: Q.ResolveUrl('api/Bordro/GetPersonelBordro'),
                data: request
            });
        },

        getPersonelUcretSimulasyonu: function () {
            return $http
            ({
                method: 'POST',
                url: Q.ResolveUrl('api/Bordro/GetYillikKazancSimulasyonu'),
                data: {}
            });
        },

    };
}
]);