using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.DataService.Model.Model
{
    [Table("tblAccount")]
    public class Account
    {
        [Key]
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public string Id { set; get; }
        public int? GroupId { set; get; }
        public int? LevelId { set; get; }
        public int? AccId { set; get; }
        [StringLength(1000)]
        public string AccountDescription { set; get; }  
        public bool? CloseingStatus { set; get; }
        public int AccountType { set; get; }
         [StringLength(20)]
        public string ManualAccountCode { set; get; }
         [StringLength(20)]
        public string AutoAccountCode { set; get; }
        public bool? IsProfitLoss { set; get; }
        public bool? IsLeaf { set; get; }
        public bool? IsReciptsPayment { set; get; }
        public bool? HasSubLedger { set; get; }
        [StringLength(20)]
        public string Currency { set; get; }
        public int? PackageId { set; get; }
        public bool? IsSale { set; get; }
         [StringLength(100)]
        public string BranchId { set; get; }
         [StringLength(100)]
        public string Corporate_Id { set; get; }
        public int? ControlLevelId { set; get; }
         [StringLength(100)]
        public string ControlLevel_Id { set; get; }

    }
}
