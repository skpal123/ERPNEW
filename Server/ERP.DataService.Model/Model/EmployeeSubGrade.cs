using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.DataService.Model.Model
{
     [Table("EmployeeSubGrade")]
    public class EmployeeSubGrade
    {
         [Key]
         [Column(TypeName = "VARCHAR")]
         [StringLength(100)]
        public string Id { set; get; }
           [StringLength(20)]
        public string SubGradeId { get; set; }
           [StringLength(150)]
        public string SubGradeName { get; set; }
           [Column(TypeName = "VARCHAR")]
           [StringLength(100)]
        public string Grade_Id { get; set; }
        public DateTime? EeectiveDate { get; set; }
    }
}
