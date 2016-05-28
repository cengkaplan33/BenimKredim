

(function (angular) {

    //function MainController($scope, $http, $log) {
    //    $scope.orderKey = "Ad";
    //    $scope.User = "";
    //    $http.get("home/UserInfo")
    //        .success(function (response) {
    //            $log.info("servis çaðrýsý baþarýlý bir þekilde tamamlandý.");
    //            $scope.User = response;
    //        })
    //        .error(function (error) {
    //            $log.info(ex);
    //        });

    //};

    //var app = angular.module("mainApp", []);
    //app.controller("MainController", ["$scope", "$http", "$log", MainController])


    function MainController($scope, $http, $log) {
        

    };

    var mainApp = angular.module('mainApp',
    [
        'mainApp.controllers.tasitKredisi.tasitKredisiController',
        'mainApp.services.tasitKredisi.tasitKredisiService',
    ]
    );
    mainApp.controller("MainController", ["$scope", "$http", "$log", MainController])

})(angular);

//var mainApp = angular.module('mainApp',
//[
//    //'ngRoute',
//    //'mainApp.controllers.tasitKredisi.tasitKredisiController',
//    //'mainApp.controllers.bordro.bordroController',
//    //'mainApp.controllers.demirbas.demirbasController',
//    //'mainApp.controllers.izin.izinTakvimiController',
//    //'mainApp.controllers.izinPlan.yillikIzinPlanController',
//    //'mainApp.controllers.izinOnay.izinPlanOnayController',
//    //'mainApp.controllers.izinTalep.izinTalepOnayController',
//    //'mainApp.controllers.izinTalep.mazeretIzinController',
//    //'mainApp.controllers.izinTalep.ucretsizIzinController',
//    //'mainApp.controllers.izinTalep.yillikIzinTalepController',
//    //'mainApp.controllers.izinTalep.gorevlendirmeIzinController',
//    //'mainApp.controllers.login.loginController',
//    //'mainApp.controllers.ozluk.ozlukBilgileriController',
//    //'mainApp.controllers.yetkinlik.yetkinlikController',

//   // 'mainApp.controllers.organizasyon.organizasyonSemasiController',
//    //'mainApp.services.tasitKredisi.tasitKredisiService',
//   // 'mainApp.services.bordro.bordroService',
//   // 'mainApp.services.demirbas.demirbasService',
//   // 'mainApp.services.inka.inkaService',
//   // 'mainApp.services.izinPlan.yillikIzinPlanService',
//   // 'mainApp.services.izinOnay.izinPlanOnayService',
//   // 'mainApp.services.izinTalep.idariIzinService',
//   // 'mainApp.services.izinTalep.izinTalepOnayService',
//   // 'mainApp.services.izinTalep.yillikIzinTalepService',
//   // 'mainApp.services.izinTalep.mazeretIzinService',
//   // 'mainApp.services.izinTalep.ucretsizIzinService',
//   // 'mainApp.services.izinTalep.gorevlendirmeIzinService',
//   // 'mainApp.services.login.loginService',
//   // 'mainApp.services.ozluk.personelService',
//   //  'mainApp.services.yetkinlik.yetkinlikService',
//   //// 'mainApp.services.organizasyon.organizasyonSemasiService',
//   // 'mainApp.services.izin.izinTakvimiService',
//    //'sy.bootstrap.timepicker',
//    //'template/syTimepicker/timepicker.html',
//    //'template/syTimepicker/popup.html',
//    //'ngTable',
//    //'gantt',
//    //'gantt.sortable',
//    //'gantt.movable',
//    //'gantt.drawtask',
//    //'gantt.tooltips',
//    //'gantt.bounds',
//    //'gantt.progress',
//    //'gantt.table',
//    //'gantt.tree',
//    //'gantt.groups',
//    //'gantt.resizeSensor'
//    //'BasicPrimitives',
//]
//);

////var mainAppController = angular.module('mainApp.controllers.mainAppController', []);
//mainApp.controller('mainAppController', ['', function ( ) {
//    //moment.locale('tr', {
//    //    months: "Ocak_Þubat_Mart_Nisan_Mayýs_Haziran_Temmuz_Aðustos_Eylül_Ekim_Kasým_Aralýk".split("_"),
//    //    monthsShort: 'Oca_Þub_Mar_Nis_May_Haz_Tem_Aðu_Eyl_Eki_Kas_Ara'.split('_')
//    //});
//    //moment.locale('tr');

//    //$scope.ShowWarning = function (message) {
//    //    BootstrapDialog.show({
//    //        title: 'Uyar\u0131',
//    //        message: message,
//    //        type: BootstrapDialog.TYPE_WARNING,
//    //        draggable: true,
//    //        buttons: [{
//    //            label: 'Kapat',
//    //            cssClass: 'btn-round',
//    //            action: function (dialogItself) {
//    //                dialogItself.close();
//    //            }
//    //        }]
//    //    });
//    //};

//    //$scope.Months = [
//    //       { name: 'Ocak', value: 1 },
//    //       { name: 'Þubat', value: 2 },
//    //       { name: 'Mart', value: 3 },
//    //       { name: 'Nisan', value: 4 },
//    //       { name: 'Mayýs', value: 5 },
//    //       { name: 'Haziran', value: 6 },
//    //       { name: 'Temmuz', value: 7 },
//    //       { name: 'Aðustos', value: 8 },
//    //       { name: 'Eylül', value: 9 },
//    //       { name: 'Ekim', value: 10 },
//    //       { name: 'Kasým', value: 11 },
//    //       { name: 'Aralýk', value: 12 }
//    //];

//    //$scope.Days = [
//    //       { name: 'Pazar', value: 0 },
//    //       { name: 'Pazartesi', value: 1 },
//    //       { name: 'Salý', value: 2 },
//    //       { name: 'Çarþamba', value: 3 },
//    //       { name: 'Perþembe', value: 4 },
//    //       { name: 'Cuma', value: 5 },
//    //       { name: 'Cumartesi', value: 6 }
//    //];

//    ////$scope.ShowInfo = function (message) {
//    ////    BootstrapDialog.show({
//    ////        title: 'Bilgi',
//    ////        message: message,
//    ////        type: BootstrapDialog.TYPE_INFO,
//    ////        draggable: true,
//    ////        buttons: [{
//    ////            label: 'Kapat',
//    ////            cssClass: 'btn-round',
//    ////            action: function (dialogItself) {
//    ////                dialogItself.close();
//    ////            }
//    ////        }]
//    ////    });
//    ////};

//}]);

////mainApp.directive('ngEnter', function () {
////    return function (scope, element, attrs) {
////        element.bind("keydown keypress", function (event) {
////            if (event.which === 13) {
////                scope.$apply(function () {
////                    scope.$eval(attrs.ngEnter);
////                });

////                event.preventDefault();
////            }
////        });
////    };
////});

////mainApp.directive('ngModelOnblur', function () {
////    return {
////        restrict: 'A',
////        require: 'ngModel',
////        priority: 1,
////        link: function (scope, elm, attr, ngModelCtrl) {
////            if (attr.type === 'radio' || attr.type === 'checkbox') return;

////            elm.unbind('input').unbind('keydown').unbind('change');
////            elm.bind('blur', function () {
////                scope.$apply(function () {
////                    ngModelCtrl.$setViewValue(elm.val());
////                });
////            });
////        }
////    };
////});

////mainApp.directive("datepicker", function () {
////    return {
////        restrict: "A",
////        require: '?ngModel',
////        link: function (scope, el, attr, ngModel) {
////            if (!ngModel) return;
////            ngModel.$render = function () {
////                el.datepicker('update', ngModel.$viewValue || '');
////                el.trigger("valueChanged");
////            };
////            el.datepicker({ autoclose: true, language: 'tr', format: 'dd/mm/yyyy' }).on("changeDate", function (event) {
////                scope.$apply(function () {
////                    ngModel.$setViewValue(event.date);
////                });
////                el.trigger("valueChanged");
////            });
////        }
////    };
////});

////mainApp.directive('loadingContainer', function () {
////    return {
////        restrict: 'A',
////        scope: false,
////        link: function (scope, element, attrs) {
////            var loadingLayer = angular.element('<div class="loading"></div>');
////            element.append(loadingLayer);
////            element.addClass('loading-container');
////            scope.$watch(attrs.loadingContainer, function (value) {
////                loadingLayer.toggleClass('ng-hide', !value);
////            });
////        }
////    };
////});

////mainApp.directive('moChangeProxy', function ($parse) {
////    return {
////        require: '^ngModel',
////        restrict: 'A',
////        link: function (scope, elm, attrs, ctrl) {
////            var proxyExp = attrs.moChangeProxy;
////            var modelExp = attrs.ngModel;
////            scope.$watch(proxyExp, function (nVal) {
////                if (nVal != ctrl.$modelValue)
////                    $parse(modelExp).assign(scope, nVal);
////            });
////            elm.bind('blur', function () {
////                var proxyVal = scope.$eval(proxyExp);
////                if (ctrl.$modelValue != proxyVal) {
////                    scope.$apply(function () {
////                        $parse(proxyExp).assign(scope, ctrl.$modelValue);
////                    });
////                }
////            });
////        }
////    };
////});

////mainApp.directive('validNumber', function () {
////    return {
////        require: '?ngModel',
////        link: function (scope, element, attrs, ngModelCtrl) {
////            if (!ngModelCtrl) {
////                return;
////            }
////            element.attr('maxlength', '2');
////            ngModelCtrl.$parsers.push(function (val) {
////                var clean = val.replace(/[^0-9]+/g, '');
////                if (val !== clean) {
////                    ngModelCtrl.$setViewValue(clean);
////                    ngModelCtrl.$render();
////                }
////                return clean;
////            });

////            element.bind('keypress', function (event) {
////                if (event.keyCode === 32) {
////                    event.preventDefault();
////                }
////            });
////        }
////    };
////});

////mainApp.factory('RequestsErrorHandler', ['$q', '$scope', function ($q, $scope) {
////    return {
////        // --- The user's API for claiming responsiblity for requests ---
////        specificallyHandled: function (specificallyHandledBlock) {
////            specificallyHandleInProgress = true;
////            try {
////                return specificallyHandledBlock();
////            } finally {
////                specificallyHandleInProgress = false;
////            }
////        },

////        // --- Response interceptor for handling errors generically ---
////        responseError: function (rejection) {
////            var shouldHandle = (rejection && rejection.config && rejection.config.headers
////                && rejection.config.headers[HEADER_NAME]);

////            if (shouldHandle) {
////                //hatanýn yakalanma iþlemi yapýlabilir
////            }

////            return $q.reject(rejection);
////        },

////        response: function (response) {
////            if (response != null && response.data != null && response.data.Data != null && response.data.Data.Error != null) {
////                var msg = response.data.Data.Error.Message;
////                //BootstrapDialog.show({
////                //    title: 'Hata',
////                //    message: msg,
////                //    type: BootstrapDialog.TYPE_DANGER,
////                //    draggable: true,
////                //    buttons: [{
////                //        label: 'Kapat',
////                //        cssClass: 'btn-round',
////                //        action: function (dialogItself) {
////                //            dialogItself.close();
////                //        }
////                //    }]
////                //});

////                return;
////            }
////            return response;
////        }
////    };
////}]);

////mainApp.config(['$provide', '$httpProvider', function ($provide, $httpProvider) {
////    $httpProvider.interceptors.push('RequestsErrorHandler');

////    // --- Decorate $http to add a special header by default ---

////    function addHeaderToConfig(config) {
////        config = config || {};
////        config.headers = config.headers || {};

////        // Add the header unless user asked to handle errors himself
////        if (!specificallyHandleInProgress) {
////            config.headers[HEADER_NAME] = true;
////        }

////        return config;
////    }

////    // The rest here is mostly boilerplate needed to decorate $http safely
////    $provide.decorator('$http', ['$delegate', function ($delegate) {
////        function decorateRegularCall(method) {
////            return function (url, config) {
////                return $delegate[method](url, addHeaderToConfig(config));
////            };
////        }

////        function decorateDataCall(method) {
////            return function (url, data, config) {
////                return $delegate[method](url, data, addHeaderToConfig(config));
////            };
////        }

////        function copyNotOverriddenAttributes(newHttp) {
////            for (var attr in $delegate) {
////                if (!newHttp.hasOwnProperty(attr)) {
////                    if (typeof ($delegate[attr]) === 'function') {
////                        newHttp[attr] = function () {
////                            return $delegate.apply($delegate, arguments);
////                        };
////                    } else {
////                        newHttp[attr] = $delegate[attr];
////                    }
////                }
////            }
////        }

////        var newHttp = function (config) {
////            return $delegate(addHeaderToConfig(config));
////        };

////        newHttp.get = decorateRegularCall('get');
////        newHttp.delete = decorateRegularCall('delete');
////        newHttp.head = decorateRegularCall('head');
////        newHttp.jsonp = decorateRegularCall('jsonp');
////        newHttp.post = decorateDataCall('post');
////        newHttp.put = decorateDataCall('put');

////        copyNotOverriddenAttributes(newHttp);

////        return newHttp;
////    }]);
////}]);

////mainApp.filter('getEnumName', function ($scope) {
////    return function (key, enumType) {
////        return $scope[enumType].filter(function (enumP) {
////            return enumP.value === key;
////        })[0].name;
////    }
////});


////BootstrapDialog.confirm = function (message, callback) {
////    new BootstrapDialog({
////        title: 'Onay',
////        message: message,
////        draggable: true,
////        closable: false,
////        data: {
////            'callback': callback
////        },
////        buttons: [{
////            label: 'Hay\u0131r',
////            cssClass: 'btn-round',
////            action: function (dialog) {
////                typeof dialog.getData('callback') === 'function' && dialog.getData('callback')(false);
////                dialog.close();
////            }
////        }, {
////            label: 'Evet',
////            cssClass: 'btn-primary btn-round',
////            action: function (dialog) {
////                typeof dialog.getData('callback') === 'function' && dialog.getData('callback')(true);
////                dialog.close();
////            }
////        }]
////    }).open();
////};


