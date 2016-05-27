using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BenimKredim.Web.Controllers
{
    public class SiteController : Controller
    {
        public ActionResult AnaSayfa()
        {
            return View();
        }
    }
}