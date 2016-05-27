using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace BenimKredim.Web.Services
{
    public class ListRequest : ServiceRequest
    {
        public int Skip { get; set; }
        public int Take { get; set; }
    }
}