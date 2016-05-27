angular
.module('mainApp.services.inka.inkaService', [])
.factory('inkaService', ['$http', function ($http) {
    return {
          ikSirketList: function () {
            return $http
            ({
                method: 'POST',
                url: Q.ResolveUrl('api/Inka/IKSirketList'),
                data: {}
            });
          },
          ikIsyeriList: function (request) {
              return $http
              ({
                  method: 'POST',
                  url: Q.ResolveUrl('api/Inka/IKIsyeriList'),
                  data: request
              });
          },
          ikDepartmanList: function (request) {
              return $http
              ({
                  method: 'POST',
                  url: Q.ResolveUrl('api/Inka/IKDepartmanList'),
                  data: request
              });
          }
    };
}
]);
