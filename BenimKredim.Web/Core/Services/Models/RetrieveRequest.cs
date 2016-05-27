using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace BenimKredim.Web.Services
{
    public class RetrieveRequest : ServiceRequest
    {
        public Int32? EntityId;
    }
}