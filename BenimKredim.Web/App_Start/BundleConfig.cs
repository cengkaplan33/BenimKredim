using System.Web;
using System.Web.Optimization;

namespace BenimKredim.Web
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryui").Include(
                        "~/Scripts/jquery-ui-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.unobtrusive*",
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new StyleBundle("~/Content/css").Include("~/Content/site.css"));

            bundles.Add(new StyleBundle("~/Content/themes/base/css").Include(
                        "~/Content/themes/base/jquery.ui.core.css",
                        "~/Content/themes/base/jquery.ui.resizable.css",
                        "~/Content/themes/base/jquery.ui.selectable.css",
                        "~/Content/themes/base/jquery.ui.accordion.css",
                        "~/Content/themes/base/jquery.ui.autocomplete.css",
                        "~/Content/themes/base/jquery.ui.button.css",
                        "~/Content/themes/base/jquery.ui.dialog.css",
                        "~/Content/themes/base/jquery.ui.slider.css",
                        "~/Content/themes/base/jquery.ui.tabs.css",
                        "~/Content/themes/base/jquery.ui.datepicker.css",
                        "~/Content/themes/base/jquery.ui.progressbar.css",
                        "~/Content/themes/base/jquery.ui.theme.css"));


            bundles.Add(new ScriptBundle("~/Bundles/angular").Include(
                        "~/scripts/angular.js",
                        "~/scripts/angular-route.js",
                        "~/scripts/i18n/angular-locale_tr-tr.js",
                        "~/src/app.js",
                        "~/src/directives/position.js",
                        "~/src/directives/timepicker.js",
                        "~/src/directives/timepicker-tpl.js",
                        "~/src/directives/angular-ui-tree.js",
                        "~/src/directives/angular-moment.js",
                        "~/src/directives/draganddrop.js",
                        "~/src/angular-gantt/dist/angular-gantt.js",
                        "~/src/angular-gantt/dist/angular-gantt-plugins.js",
                        "~/src/directives/ng-table.min.js",
                        "~/src/controllers/tasitKredisiController.js",
                        "~/src/controllers/bordroController.js",
                        "~/src/controllers/demirbasController.js",
                        "~/src/controllers/izinTakvimiController.js",
                        "~/src/controllers/izinPlanOnayController.js",
                        "~/src/controllers/izinTalepOnayController.js",
                        "~/src/controllers/loginController.js",
                        "~/src/controllers/mazeretIzinController.js",
                        "~/src/controllers/ucretsizIzinController.js",
                        "~/src/controllers/ozlukBilgileriController.js",
                        "~/src/controllers/yillikIzinTalepController.js",
                        "~/src/controllers/yillikIzinPlanController.js",
                        "~/src/controllers/gorevlendirmeIzinController.js",
                        "~/src/controllers/yetkinlikController.js",
                     //   "~/src/controllers/organizasyonSemasiController.js",
                        "~/src/services/tasitKredisiService.js",
                        "~/src/services/bordroService.js",
                        "~/src/services/demirbasService.js",
                        "~/src/services/inkaService.js",
                        "~/src/services/idariIzinService.js",
                        "~/src/services/izinTakvimiService.js",
                        "~/src/services/izinPlanOnayService.js",
                        "~/src/services/izinTalepOnayService.js",
                        "~/src/services/loginService.js",
                        "~/src/services/mazeretIzinService.js",
                        "~/src/services/ucretsizIzinService.js",
                        "~/src/services/personelService.js",
                        "~/src/services/yillikIzinPlanService.js",
                        "~/src/services/yillikIzinTalepService.js",
                        "~/src/services/gorevlendirmeIzinService.js",
                        "~/src/services/yetkinlikService.js"
                       // "~/src/services/organizasyonSemasiService.js"
                        ));



            BundleTable.EnableOptimizations = false;

        }
    }
}