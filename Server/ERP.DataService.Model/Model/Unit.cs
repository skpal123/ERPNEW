using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.DataService.Model.Model
{
      [Table("tblUnit")]
    public class Unit
    {
          [Key]
          [Column(TypeName = "VARCHAR")]
          [StringLength(100)]
          public string Id { set; get; }
         [StringLength(20)]
        public string UnitName { set; get; }
        [StringLength(1000)]
        public string Description { set; get; }
    }
}
