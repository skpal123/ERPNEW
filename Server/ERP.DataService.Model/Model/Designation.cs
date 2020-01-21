using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.DataService.Model.Model
{
    [Table("Designation")]
    public class Designation
    {
        [Key]
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public string Id { get; set; }
        [StringLength(20)]
        public string DesignationId { set; get; }
         [StringLength(150)]
        public string DesignationName { set; get; }
         [StringLength(1000)]
        public string Description { set; get; }
    }
}
