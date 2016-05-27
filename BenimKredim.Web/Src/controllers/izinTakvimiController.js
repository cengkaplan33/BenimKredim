var izinTakvimiControllers = angular.module('mainApp.controllers.izin.izinTakvimiController', []);

izinTakvimiControllers
    .directive('repeatDone', function () {
        return function (scope, element, attrs) {
            if (scope.$last) { // all are rendered
                scope.$eval(attrs.repeatDone);
            }
        }
    });

izinTakvimiControllers.controller('izinTakvimiController', ['$rootScope', '$scope', '$timeout','$filter', 'izinTakvimiService', 'inkaService', 'personelService',
function ($rootScope, $scope, $timeout, $filter, izinTakvimiService, inkaService, personelService) {
    $scope.options = {
        mode: 'custom',
        scale: 'day',
        sortMode: undefined,
        sideMode: 'Table',
        daily: true,
        maxHeight: false,
        width: false,
        zoom: 1,
        columns: ['model.PersonelNo', 'model.name', 'model.Birimi', 'model.Gorevi'],
        columnsHeaders: { 'model.PersonelNo': 'Sicil No', 'model.name': 'Ad Soyad', 'model.Birimi': 'Birimi', 'model.Gorevi': 'Görevi' },
        columnsClasses: { 'model.name': 'gantt-column-name' },
        taskOutOfRange: 'truncate',
        fromDate: moment(null),
        toDate: undefined,
        rowContent: '<i class="fa fa-align-justify"></i> {{row.model.name}}',
        taskContent: '<i class="fa fa-tasks"></i> {{task.model.name}}',
        labelsEnabled: true,
        currentDate: 'none',
        currentDateValue: $filter('date')(new Date(), 'dd-MM-yyyy'),
        draw: true,
        autoExpand: 'none',
        readOnly: false,
        groupDisplayMode: 'group',
        filterTask: '',
        filterRow: '',
        timeFrames: {
            'weekend': {
                working: false
            },
            'holiday': {
                working: false,
                color: 'red',
                classes: ['gantt-timeframe-holiday']
            },
            'today': {
                classes: ['gantt-foreground-col-current-date']
            }

        },
        dateFrames: {
            'weekend': {
                evaluator: function (date) {
                    return date.isoWeekday() === 6 || date.isoWeekday() === 7;
                },
                targets: ['weekend']
            },
            'holidays': {
                evaluator: function (date) {
                    return (date.month() === 3 && date.date() === 23) || (date.month() === 4 && date.date() === 19) || (date.month() === 4 && date.date() === 1) || (date.month() === 0 && date.date() === 1);
                },
                targets: ['holiday']
            },
            'currentDate': {
                evaluator: function (date) {
                    var today = new Date();
                    var dd = today.getDate();
                    var mm = today.getMonth();
                    var yyyy = today.getFullYear();
                    return date.month() === mm && date.date() === dd && date.year() === yyyy;
                },
                targets: ['today']
            },
    

        },
        timeFramesNonWorkingMode: 'visible',
        columnMagnet: '1 day',
        timeFramesMagnet: true,
    };

    $scope.Aylar = $rootScope.Months;

    $scope.canAutoWidth = function (scale) {
        if (scale.match(/.*?hour.*?/) || scale.match(/.*?minute.*?/)) {
            return false;
        }
        return true;
    };

    $scope.getColumnWidth = function (widthEnabled, scale, zoom) {
        if (!widthEnabled && $scope.canAutoWidth(scale)) {
            return undefined;
        }

        if (scale.match(/.*?week.*?/)) {
            return 50 * zoom;
        }

        if (scale.match(/.*?month.*?/)) {
            return 60 * zoom;
        }

        if (scale.match(/.*?quarter.*?/)) {
            return 150 * zoom;
        }

        if (scale.match(/.*?year.*?/)) {
            return 350 * zoom;
        }

        return 15 * zoom;
    };

   

    $scope.Yillar = [
            { name: (new Date().getFullYear() - 1).toString(), value: (new Date().getFullYear() - 1) },
            { name: new Date().getFullYear().toString(), value: new Date().getFullYear() },
            { name: (new Date().getFullYear() + 1).toString(), value: (new Date().getFullYear() + 1) }];

    $scope.ConvertChosen = function (id) {
        $timeout(function () {
            var $chosenSelect = $('.form-horizontal').find('.' + id);
            $chosenSelect.chosen();
        }, 0); // wait.
    };

    $scope.SetChosen = function (element, value) {
        $timeout(function () {
            var $chosenSelect = $('.form-horizontal').find('.' + element);
            $chosenSelect.val(value);
            $chosenSelect.trigger("chosen:updated");
        }, 0); // wait.
    };

    $scope.RefreshChosen = function (element) {
        $timeout(function () {
            var $chosenSelect = $('.form-horizontal').find('.' + element);
            $chosenSelect.trigger("chosen:updated");
        }, 0); // wait.
    };

    $scope.$watch('IKSirketObjId', function () {
        if ($scope.IKSirketObjId == null || $scope.IKSirketObjId == undefined)
            return;
        $scope.FillIKPersonelList();
        $scope.FillIKDepartmanList();
        $scope.FillIKIsyeriList();
    });

    $scope.LoadPage = function () {
        $scope.SetDefaults();

        if ($scope.ShowSerendipFilters) {
            inkaService
                .ikSirketList()
                .success(function (data, status, headers, config) {
                    $scope.Sirketler = data.Data.Entities;

                    if ($scope.Sirketler.length > 0) {
                        $scope.IKSirketObjId = $scope.Sirketler[0].ObjId;
                        $scope.SetChosen('sirket-select', $scope.IKSirketObjId);
                    }
                    $scope.FillGrid();
                });
        }
        else {
            personelService
               .getPersonelVekiller()
               .success(function (data, status, headers, config) {
                   $scope.Personeller = data.Data.Vekiller;
               });

            $scope.FillGrid();
        }
    };

    $scope.SetDefaults = function () {
        $scope.ShowSerendipFilters = $("#myInput").data("myvalue");
        $scope.SelectedYear = new Date().getFullYear();
        $scope.SelectedMonth = new Date().getMonth() + 1;
        $scope.SetChosen('month-select', $scope.SelectedMonth);
        $scope.UcretsizIzinler = true;
        $scope.MazeretIzinleri = true;
        $scope.YillikIzinler = true;
        $scope.OnayBekliyor = true;
        $scope.YoneticiOnayladi = true;
        $scope.IKOnayladi = true;
    }

    $scope.FillGrid = function () {
        $scope.options.width = ($scope.SelectedMonth == -1) ? true : false;
        if ($scope.SelectedMonth != -1) {
            $scope.options.fromDate = new Date($scope.SelectedYear, $scope.SelectedMonth - 1);
            $scope.options.toDate = new Date($scope.SelectedYear, $scope.SelectedMonth) -1;
        }
        else
        {
            $scope.options.fromDate = moment(null);
            $scope.options.toDate = undefined;
        }

        var request = {
            IKSirketObjId: $scope.IKSirketObjId,
            IKIsyeriObjId: $scope.IKIsyeriObjId,
            IKDepartmanObjId: $scope.IKDepartmanObjId,
            IKPersonelObjId: $scope.IKPersonelObjId,
            Ay: $scope.SelectedMonth,
            Yil: $scope.SelectedYear,
            UcretsizIzinler: $scope.UcretsizIzinler,
            MazeretIzinleri: $scope.MazeretIzinleri,
            YillikIzinler: $scope.YillikIzinler,
            IKIslemeAldi: $scope.IKOnayladi,
            YoneticiOnayladi: $scope.YoneticiOnayladi,
            OnayBekliyor: $scope.OnayBekliyor
        };
        izinTakvimiService
        .izinTakvimiList(request)
        .success(function (data, status, headers, config) {
            $scope.data = data.Data.Entities;
        });
    };

    $scope.FillIKDepartmanList = function () {
        var request = {
            IKSirketObjId: $scope.IKSirketObjId,
        };

        inkaService
            .ikDepartmanList(request)
            .success(function (data, status, headers, config) {
                $scope.Departmanlar = data.Data.Entities;
                $scope.RefreshChosen('departman-select');
            });
    };

    $scope.FillIKIsyeriList = function () {
        var request = {
            IKSirketObjId: $scope.IKSirketObjId,
        };

        inkaService
         .ikIsyeriList(request)
         .success(function (data, status, headers, config) {
             $scope.Isyerleri = data.Data.Entities;
             $scope.RefreshChosen('isyeri-select');
         });
    };

    $scope.FillIKPersonelList = function () {
        var request = {
            IKSirketObjId: $scope.IKSirketObjId,
        };

        personelService
            .getIKPersonelList(request)
            .success(function (data, status, headers, config) {
                $scope.Personeller = data.Data.Entities;
                $scope.RefreshChosen('personel-select');
            });
    };

    $scope.LoadPage();
}]);
