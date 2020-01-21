using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.DataService.Model.Model
{
    [Table("GradeStepSalaryItem")]
    public class GradeStepSalaryItem
    {
        [Key]
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public string Id { set; get; }
        public string SalaryItemId { get; set; }
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public string SalaryItem_Id { get; set; }
        public double? SalaryAmount { get; set; }
        public bool? HasComparator { get; set; }
         [StringLength(100)]
        public string ComparatorString { get; set; }
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public string InheritedItem_Id { get; set; }
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public string Grade_id { get; set; }
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public string GradeStep_id { get; set; }
        public double? Percentage { get; set; }
        public double? SingleItemAmount { get; set; }
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public string Salary_id { get; set; }
    }
}
