using BenimKredim.Web.ActionFilters;
using System;
using System.Globalization;
using System.Threading;
using System.Web;
using System.Web.Mvc;

//TODO :: OK::NOT:: 
/* 
 * controller'ı tek bir yerden kontrol etmek için yazıldı.  
 * LogActionFilter örneği gibi mesela Yetkilendirmede yapılabilir ama bu uygulamamızda login olmadığı için eklemedim.
 */
namespace BenimKredim.Web.Base
{
    [LogActionFilter]
    public class BaseController : Controller, IDisposable
    {
        public BaseController()
        {
            //OK::NOT:: culture vb  gibi tanımların veya önceden tanımlı sistem için gerekli veriler burada SET edilebilir.
        }

        #region Private Members

        //yukarıda bahsettiğim gibi varsa ön tanımlı değişkenler private olarak tanımlanır doldurulur ve ilgili yerlerde kullanılabilir.

        #endregion


        protected override void HandleUnknownAction(string actionName)
        {
            ViewBag.ErrorMessage = "İşlem bulunamadı";

            this.View("Error").ExecuteResult(this.ControllerContext);
        }
    }
}