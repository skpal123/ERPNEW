using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.DataService.Model.Model
{
     [Table("tblItemLocation")]
    public class Location
    {
         [Key]
         [Column(TypeName = "VARCHAR")]
         [StringLength(100)]
         public string Id { set; get; }
         [StringLength(20)]
        public string LocationId { set; get; }
        [StringLength(150)]
        public string LocationName { set; get; }
        [StringLength(1000)]
        public string Description { set; get; }
    }
}
