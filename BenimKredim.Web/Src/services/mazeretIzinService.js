angular
.module('mainApp.services.izinTalep.mazeretIzinService', [])
.factory('mazeretIzinService', ['$http', function ($http) {
    return {
        getIzinTurleri: function () {
            return $http
            ({
                method: 'POST',
                url: Q.ResolveUrl('api/MazeretIzin/GetIzinTurleri'),
                data: {}
            })
        },
       
        getPersonelIzinArsiv: function () {
            return $http
            ({
                method: 'POST',
                url: Q.ResolveUrl('api/Izin/IzinArsive'),
                data: {
                    IzinTipi : 2 //IKIzinTipleri enumda Mazeret
                }
            })
        },

        mazeretIzinKaydet: function (formData) {
            return $http
            ({
                method: 'POST',
                url: Q.ResolveUrl('api/MazeretIzin/MazeretIzinKaydet'),
                data: formData

            });
        },

        izinGunleriniHesapla: function (request) {
            return $http
            ({
                method: 'POST',
                url: Q.ResolveUrl('api/MazeretIzin/IzinGunleriniHesapla'),
                data: request

            });
        },

        print: function (formData) {
            return $http
            ({
                method: 'POST',
                url: Q.ResolveUrl('MazeretIzin/PdfExport'),
                data: "{'izinObjId':'" + formData + "'}"
            });
        },
    };
}
]);
