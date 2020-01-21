using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.DataService.Model.Model
{
     [Table("tblVoucherDetails")]
    public class VoucherDetails
    {
         [Key]
         [Column(TypeName = "VARCHAR")]
         [StringLength(100)]
        public string Id { get; set; }
         [StringLength(30)]
        public string VoucherNo { get; set; }
        public int? Lineno { get; set; }
        public double? Amount { get; set; }
        public int? GroupId { get; set; }
        public int? LevelId { get; set; }
        public int? AccId { get; set; }
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public string Branch_Id { get; set; }
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public string Voucher_Id { get; set; }
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public string Account_Id { get; set; }
        public double? Vat { get; set; }
        public double? Tax { get; set; }
    }
}
