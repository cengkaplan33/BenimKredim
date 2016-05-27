angular
.module('mainApp.services.ozluk.personelService', [])
.factory('personelService', ['$http', function ($http) {
    return {
          getPersonelBilgileri: function () {
            return $http
            ({
                method: 'POST',
                url: Q.ResolveUrl('api/IKPersonelService/IKPersonelBilgileriGetir'),
                data: {}
            });
        },

        getPersonelVekiller: function () {
            return $http
            ({
                method: 'POST',
                url: Q.ResolveUrl('api/IKPersonelService/PersonelBirimKullanicilariGetir'),
                data: {}
            });
        },
        
        getPersonelHakedisBilgileri: function () {
            return $http
            ({
                method: 'POST',
                url: Q.ResolveUrl('api/IzinTalep/PersonelIzinHakedisiGetir'),
                data: {}
            });
        },

        getIKPersonelList: function (request) {
            return $http
            ({
                method: 'POST',
                url: Q.ResolveUrl('api/IKPersonelService/IKPersonelList'),
                data: request
            });
        },

        getYoneticisiOlunanPersoneller: function () {
            return $http
            ({
                method: 'POST',
                url: Q.ResolveUrl('api/IKPersonelService/SorumluPersonelleriGetir'),
                data: {}
            });
        },
    };
}
]);
