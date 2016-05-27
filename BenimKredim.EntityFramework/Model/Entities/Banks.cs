using BenimKredim.Common.Entity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BenimKredim.Model.Entities
{
    public class Banks : AuditableEntityBase
    {
        public Banks()
        {
            this.Credits = new HashSet<BankCredits>();
        }

        [Index, MaxLength(40)]
        public String Name { get; set; }


        public virtual ICollection<BankCredits> Credits { get; set; }
    }
}
