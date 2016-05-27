using System.Collections.Generic;

namespace BenimKredim.Web.Services
{
    public class RetrieveResponse<T> : ServiceResponse
    {
        public T Entity { get; set; }
    }
}