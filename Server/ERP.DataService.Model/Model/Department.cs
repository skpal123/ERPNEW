using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.DataService.Model.Model
{
    [Table("Department")]
    public class Department
    {
        [Key]
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public string Id { get; set; }
        [StringLength(20)]
        public string DepartmentId { set; get; }
        [StringLength(150)]
        public string DepartmentName { set; get; }
        [StringLength(1000)]
        public string Description { set; get; }
    }
}
