angular
.module('mainApp.services.demirbas.demirbasService', [])
.factory('demirbasService', ['$http', function ($http) {
    return {
        getDemirbasList: function () {
            return $http({
                method: 'POST',
                url: Q.ResolveUrl('api/Demirbas/List'),
                data: {}
            });
        },

        demirbasOnayla: function (demirbas) {
            return $http({
                method: 'POST',
                url: Q.ResolveUrl('api/Demirbas/GeriBildirim'),
                data: demirbas
            });

        },

        demirbasItirazEt: function (demirbas) {
            return $http({
                method: 'POST',
                url: Q.ResolveUrl('api/Demirbas/GeriBildirim'),
                data: demirbas
            });
        },

        zimmetSozlesmesiBilgisiGetir: function (request) {
        return $http({
            method: 'POST',
            url: Q.ResolveUrl('api/Demirbas/ZimmetSozlesmesiBilgisiGetir'),
            data: request
        });
        },

        zimmetSozlesmesiOnayla: function (request) {
        return $http({
            method: 'POST',
            url: Q.ResolveUrl('api/Demirbas/ZimmetSozlesmesiOnayla'),
            data: request
        });
    }
    };
}
]);