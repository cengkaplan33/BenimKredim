using BenimKredim.Common.Entity;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BenimKredim.Model.Entities
{
    public class SearchLogs : AuditableEntityBase
    {
        [Index, MaxLength(40)]
        public String IP { get; set; }
         [ MaxLength(2000)]
        public String Parameters { get; set; }
    }
}
