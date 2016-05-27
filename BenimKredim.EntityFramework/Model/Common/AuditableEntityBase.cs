using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BenimKredim.Common.Entity
{
    public abstract class AuditableEntityBase : EntityBase,IAuditableEntity
    {
        public int InsertByUser { get; set; }
        public DateTime InsertDate { get; set; }
        public int? UpdateByUser { get; set; }
        public DateTime? UpdateDate { get; set; }
        public bool IsActive { get; set; }
    }
}
