﻿using BenimKredim.Web.Base;
using BenimKredim.Web.Services;
using System;
using System.Web.Mvc;

namespace BenimKredim.Web.Controllers
{
    public class TasitKredisiController : Controller
    {
        public JsonResult Search(TasitKredisiSearchRequest request)
        {
            return Json("adsa d");
        }

        public JsonResult Search(int Vade, int Tutar)
        {
            try
            {
                var response = new TasitKredisiService().List(new TasitKredisiSearchRequest() { Tutar = Tutar, Vade = Vade });
                return Json(new { total = response.Entities.Count, data = response.Entities }, JsonRequestBehavior.AllowGet);
                //}   var data = Pages.OrderBy(m => m.Id).Skip(skip).Take(pageSize).ToList();
                //    return Json(new { total = total, data = data }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception exception)
            {
                Response.StatusCode = 500;
                return Json(new { result = "işlem yaparken hata oluştu" }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}