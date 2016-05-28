using BenimKredim.Web.Base;
using BenimKredim.Web.Services;
using System.Web.Mvc;

namespace BenimKredim.Web.Controllers
{
    public class KonutKredisiController : BaseController
    {
        public ActionResult Index()
        {
            return View();
        }

        public JsonNetResult Search(KonutKredisiSearchRequest request)
        {
           return     this.Respond(() => new KonutKredisiService().List(new KonutKredisiSearchRequest() { Tutar = request.Tutar, Vade = request.Vade }));
        }

        public JsonNetResult VadeListesi()
        {
            return this.Respond(() => new KonutKredisiService().VadeListesi());
        }
    }
}