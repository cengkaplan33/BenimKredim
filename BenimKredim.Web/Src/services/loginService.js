angular
.module('mainApp.services.login.loginService', [])
.factory('loginService', ['$http', function ($http) {
    return {
        validateUser : function(req){
            return $http
            ({
                method: 'POST',
                url: Q.ResolveUrl('Login/ValidateUser'),
                data: req
            });
        },

        logOut : function(req){
            return $http
            ({
                method: 'POST',
                url: Q.ResolveUrl('Login/Signout'),
                data: {}
            });
        },

        onayKoduOlustur: function () {
            return $http
            ({
                method: 'POST',
                url: Q.ResolveUrl('Login/OnayKoduOlusturveGonder'),
                data: {}
            });
        },

        onayKoduKontrol: function (req) {
            return $http
            ({
                method: 'POST',
                url: Q.ResolveUrl('Login/OnayKoduDogrumu'),
                data: "{'kod':'" + req + "'}"
            });
        },
        //loginSmsOnayKodGonder: function (req) {
        //    return $http({
        //        method: 'POST',
        //        url: Q.ResolveUrl('Login/SmsOnayKoduGonder'),
        //        data: req
        //    });
        //},

        onayKoduGosterilsinMi : function(){
            return $http({
                method:'POST',
                url: Q.ResolveUrl('Login/OnayKoduAcilsinMi'),
                data:{}
            });
        },
    };
}
]);