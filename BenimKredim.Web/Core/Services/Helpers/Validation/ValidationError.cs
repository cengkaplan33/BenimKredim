//using System;

//namespace Surat
//{
//    public class ValidationError : Exception, INotLoggedException
//    {
//        public ValidationError() : base() { }
//        public ValidationError(string message) : base(message) { }
//        public ValidationError(string message, Exception innerException) { }

//        public ValidationError(string errorCode, string arguments, string errorMessage) : base(errorMessage)
//        {
//            ErrorCode = errorCode;
//            Arguments = arguments;
//        }

//        public ValidationError(string errorCode, string arguments, string errorMessage, Exception innerException)
//            : base(errorMessage, innerException)
//        {
//            ErrorCode = errorCode;
//            Arguments = arguments;
//        }

//        public ValidationError(string errorCode, string arguments, string errorMessageFormat, params object[] formatArgs)
//            : base(String.Format(errorMessageFormat, formatArgs))
//        {
//            ErrorCode = errorCode;
//            Arguments = arguments;
//        }

//        public string ErrorCode { get; set; }
//        public string Arguments { get; set; }
//        public string Detail { get; set; }
//        public bool NotLoggedException { get; set; }
//    }
//}