using System;
using System.Web.Mvc;
using System.Data;
using System.Web.Http;
using BenimKredim.Web.Services;

namespace BenimKredim.Web.Base
{
    public static class ServiceHandler
    {
        public static ServiceResponse ToServiceResponse(this Exception exception)
        {
            //TODO: OK::NOT: servis cevapları tekbir yerden loglanabilir 
            var response = new ServiceResponse();
            var error = new ServiceError();

            error.Code = "Exception";
            error.Message = exception.Message;
            error.Details = exception.ToString();


            response.Error = error;

            return response;
        }

        public static JsonNetResult Respond(this BaseController controller, Func<ServiceResponse> handler)
        {
            ServiceResponse response;
            try
            {
                response = handler();
            }
            catch (Exception exception)
            {
                response = exception.ToServiceResponse();
            }

            return response.ToJsonResult();
        }
    }
}