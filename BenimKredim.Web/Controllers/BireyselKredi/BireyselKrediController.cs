using BenimKredim.Web.Base;
using BenimKredim.Web.Services;
using System.Web.Mvc;

namespace BenimKredim.Web.Controllers
{
    public class BireyselKrediController : BaseController
    {
        public ActionResult Index()
        {
            return View();
        }

        public JsonNetResult Search(BireyselKrediSearchRequest request)
        {
           return     this.Respond(() => new BireyselKrediService().List(new BireyselKrediSearchRequest() { Tutar = request.Tutar, Vade = request.Vade }));
        }

        public JsonNetResult VadeListesi()
        {
            return this.Respond(() => new BireyselKrediService().VadeListesi());
        }
    }
}