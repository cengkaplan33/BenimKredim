using BenimKredim.Web.Base;
using BenimKredim.Web.Services;
using System.Web.Mvc;

namespace BenimKredim.Web.Controllers
{
    public class TasitKredisiController : BaseController
    {
        public ActionResult Index()
        {
            return View();
        }

        public JsonNetResult Search(TasitKredisiSearchRequest request)
        {
           return     this.Respond(() => new TasitKredisiService().List(new TasitKredisiSearchRequest() { Tutar = request.Tutar, Vade = request.Vade }));

           //try
           //{
           // //var response = new TasitKredisiService().List(new TasitKredisiSearchRequest() { Tutar = request.Tutar, Vade = request.Vade });
           //     //return Json(new { total = response.Entities.Count, data = response.Entities }, JsonRequestBehavior.AllowGet);
           //     ////}   var data = Pages.OrderBy(m => m.Id).Skip(skip).Take(pageSize).ToList();
           //     //    return Json(new { total = total, data = data }, JsonRequestBehavior.AllowGet);
           // }
           // catch (Exception exception)
           // {
           //     Response.StatusCode = 500;
           //     return Json(new { result = "işlem yaparken hata oluştu" }, JsonRequestBehavior.AllowGet);
           // }
        }

        public JsonNetResult VadeListesi()
        {
            return this.Respond(() => new TasitKredisiService().VadeListesi());
        }
    }
}