using BenimKredim.Common.Entity;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BenimKredim.Model.Entities
{
    public class BankCredits : AuditableEntityBase
    {
        public int BankId { get; set; }
        public int CreditTypeId { get; set; }
        public Decimal ProfitRate { get; set; }
        public int InstalmentCount { get; set; }

        [ForeignKey("BankId")]
        public virtual Banks Bank { get; set; }
    }
}
