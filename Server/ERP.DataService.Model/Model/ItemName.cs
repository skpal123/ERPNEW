using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.DataService.Model.Model
{
    [Table("ItemName")]
    public class ItemName
    {
        [Key]
        public Int32 Id { set; get; }
        [StringLength(50)]
        public string Name { set; get; }
    }
}
