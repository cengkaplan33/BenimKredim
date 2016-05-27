var ozlukControllers = angular.module('mainApp.controllers.ozluk.ozlukBilgileriController', []);

ozlukControllers.controller('ozlukBilgileriController', ['$scope', '$http', '$location',  function ($scope, $http, $location) {
    $scope.Tab = 1;
    $scope.GeriIptal = true;

    var urlData = $location.search('id');
    var value = getParameterByName(urlData.url());
    if (value == "") {

        $scope.Tab = 1;
        $scope.GeriIptal = true;
        $scope.TabUrl = 'OzlukBilgileri/GetPartial?name=sirket';
    }
    else {

        $scope.Tab = GetNameforValue(value);
        IleriIptalControl($scope.Tab);
        GeriIptalControl($scope.Tab);
        $scope.TabUrl = 'OzlukBilgileri/GetPartial?name=' + value;
    }

    $scope.SetTab = function (tabId) {
        
        var tabNumber = tabId;

        if (tabNumber < 1 || tabNumber > 6) return;

        if (tabNumber > 1 && tabNumber <= 6) $scope.GeriIptal = false;
        if (tabNumber >= 1 && tabNumber < 6) $scope.IleriIptal = false;

        if (tabNumber === 6) { $scope.IleriIptal = true; }
        if (tabNumber === 1) { $scope.GeriIptal = true; }

        $scope.Tab = tabNumber;

        var name = GetValueforName(tabNumber);

        $scope.TabUrl = 'OzlukBilgileri/GetPartial?name=' + name;
    };

    $scope.isSet = function (tabId) {
        return $scope.Tab === tabId;
    };

    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    function GetValueforName(number) {
        if (number == 1) {
            return "sirket";
        }

        if (number == 2) {
            return "kisisel";
        }

        if (number == 3) {
            return "iletisim";
        }

        if (number == 4) {
            return "isTecrubeleri";
        }

        if (number == 5) {
            return "ogrenimBilgileri";
        }

        if (number == 6) {
            return "aile";
        }
    }

    function GetNameforValue(name) {
        if (name == "sirket") {
            return 1;
        }

        if (name == "kisisel") {
            return 2;
        }

        if (name == "iletisim") {
            return 3;
        }

        if (name == "isTecrubeleri") {
            return 4;
        }

        if (name == "ogrenimBilgileri") {
            return 5;
        }

        if (name == "aile") {
            return 6;
        }
    }

    function IleriIptalControl(number) {
        if (number === 6) { $scope.IleriIptal = true; }
    }

    function GeriIptalControl(number) {
        if (number === 1) { $scope.GeriIptal = true; }
    }

} ]);
