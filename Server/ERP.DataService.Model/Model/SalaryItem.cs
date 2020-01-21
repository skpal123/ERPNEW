using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.DataService.Model.Model
{
    [Table("SalaryItem")]
    public class SalaryItem
    {
        [Key]
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public string Id { set; get; }
          [StringLength(20)]
        public string ItemId { get; set; }
          [StringLength(150)]
        public string ItemName { get; set; }
          [StringLength(100)]
        public string ItemType { get; set; }
          [StringLength(100)]
        public string ItemTypeName { get; set; }
        public bool? IsPension { get; set; }
        public bool? IsTax { get; set; }
        public bool? IsDefault { get; set; }
        public bool? IsBasic { get; set; }
        public bool? IsDaily { get; set; }
        public double? Percentage { get; set; }
          [StringLength(20)]
        public string OperatorString { get; set; }
         [Column(TypeName = "VARCHAR")]
         [StringLength(100)]
         public string InheritedItem { get; set; }
        public double? DefaultAmount { get; set; }
        public bool? IsLoan { get; set; }
        public bool? IsLeave { get; set; }
    }
}
