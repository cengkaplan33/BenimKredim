using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BenimKredim.Common.Entity
{
    public abstract class EntityBase : IEntity
    {
        [Key]
        public virtual int Id { get; set; }
    }
}
