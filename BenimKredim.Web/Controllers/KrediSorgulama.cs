using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BenimKredim.Web.Controllers
{
    public class KrediSorgulamaController : Controller
    {
        //
        // GET: /tr/

        public ActionResult TasitKredisi()
        {
            return View();
        }
        public JsonResult TasitKredisiSorgulama()
        {
            return Json("deneme");
        }
    }

}
