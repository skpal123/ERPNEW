using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.DataService.Model.Model
{
     [Table("tblSupplierTransaction")]
    public class SupplierTransaction
    {
         [Key]
         [Column(TypeName = "VARCHAR")]
         [StringLength(100)]
         public string Id { set; get; }
        [StringLength(20)]
        public string ChalanNo { set; get; }
        [StringLength(20)]
        public string InvoiceNo { set; get; }
        [StringLength(20)]
        public string OrderNo { set; get; }
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public string Group_Id { set; get; }
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public string Supplier_Id { set; get; }
        public int? PaymentMode { set; get; }
        public DateTime? PaymentDate { set; get; }
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public string Ledger_Id { set; get; }
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public string SubLedger_Id { set; get; }
        public decimal PaidAmount { set; get; }
        public bool? IsFirstTransaction { set; get; }
    }
}
