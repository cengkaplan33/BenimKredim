//using System;
//using Surat;
//using System.Web.Mvc;
//using Surat.Data;
//using System.Data;

//namespace BenimKredim.Web.Services
//{
//    public static class ServiceErrors
//    {
//        public static ServiceResponse ToServiceResponse(this Exception exception)
//        {
//            exception.Log();

//            var response = new ServiceResponse();
//            var error = new ServiceError();
//            var ve = exception as ValidationError;
//            if (ve != null)
//            {
//                error.Code = ve.ErrorCode;
//                error.Arguments = ve.Arguments;
//                error.Message = ve.Message;
//                if (!WebSettings.HideExceptionDetails)
//                    error.Details = ve.ToString();
//            }
//            else
//            {
//                error.Code = "Exception";

//                if (!WebSettings.HideExceptionDetails)
//                {
//                    error.Message = exception.Message;
//                    error.Details = exception.ToString();
//                }
//                else
//                    error.Message = "İsteğin işlenmesi esnasında bir hata oluştu!";
//            }

//            response.Error = error;
//            return response;
//        }

//        public static ActionResult Respond(this Controller controller, Func<ServiceResponse> handler)
//        {
//            ServiceResponse response;
//            try
//            {
//                response = handler();
//            }
//            catch (Exception exception)
//            {
//                response = exception.ToServiceResponse();
//            }

//            return response.ToJsonResult();
//        }


//        public static ActionResult RespondIn(this Controller controller, Func<IUnitOfWork, ServiceResponse> handler)
//        {
//            ServiceResponse response;
//            try
//            {
//                using (var connection = DataHelper.NewConnection())
//                using (var uow = new UnitOfWork(connection))
//                {
//                    response = handler(uow);
//                    uow.Commit();
//                }
//            }
//            catch (Exception exception)
//            {
//                response = exception.ToServiceResponse();
//            }

//            return response.ToJsonResult();
//        }

//        public static ActionResult Respond(this Controller controller, Func<IDbConnection, ServiceResponse> handler)
//        {
//            ServiceResponse response;
//            try
//            {
//                using (var connection = DataHelper.NewConnection())
//                    response = handler(connection);
//            }
//            catch (Exception exception)
//            {
//                response = exception.ToServiceResponse();
//            }

//            return response.ToJsonResult();
//        }
//    }
//}