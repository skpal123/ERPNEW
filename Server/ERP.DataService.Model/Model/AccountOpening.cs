using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.DataService.Model.Model
{
    [Table("tblAccountOpening")]
    public class AccountOpening
    {
        [Key]
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public string Id { set; get; }
        [StringLength(6)]
        public string BranchCode { set; get; }
         [StringLength(100)]
        public string Branch_Id { set; get; }
        public decimal? Amount { set; get; }
        public DateTime OpeningDate { set; get; }
        [StringLength(20)]
        public string AutoAccountCode { set; get; }
         [StringLength(100)]
        public string Account_Id { set; get; }
    }
}
