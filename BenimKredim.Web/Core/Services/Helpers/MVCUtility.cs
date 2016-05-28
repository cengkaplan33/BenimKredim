using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Routing;

namespace BenimKredim.Web.Helpers
{
    public class MVCUtility
    {
        public static string GetControllerName()
        {
            RouteData routedata = HttpContext.Current.Request.RequestContext.RouteData;

            return routedata.GetRequiredString("controller");
        }

        public static string GetControllerActionName()
        {
            RouteData routedata = HttpContext.Current.Request.RequestContext.RouteData;

            return routedata.GetRequiredString("action");
        }

        public static string GetRequestIp()
        {
            return System.Web.HttpContext.Current.Request.UserHostAddress;
        }

        public static string GetQueryStringParameters(NameValueCollection queryString)
        {
            StringBuilder parametersText = new StringBuilder();

            foreach (string key in queryString.Keys)
            {
                parametersText.AppendLine(" Key=" + queryString[key]);
            }

            return parametersText.ToString();
        }
    }
}
