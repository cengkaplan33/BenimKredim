using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BenimKredim.Common.Entity
{
    public interface  IAuditableEntity
    {
        int InsertByUser { get; set; }
        DateTime InsertDate { get; set; }
        int? UpdateByUser { get; set; }
        DateTime? UpdateDate { get; set; }
        bool IsActive { get; set; }
    }
}
