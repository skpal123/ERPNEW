using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.DataService.Model.Model
{
    [Table("tblGroupItem")]
    public class GroupItem
    {
        [Key]
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public string Id { set; get; }
        [StringLength(20)]
        public string TransactionId { set; get; }
        [StringLength(20)]
        public string TransactionType { set; get; }
        [StringLength(20)]
        public String Reason { set; get; }
        public int Quantity { set; get; }
        public decimal TotalAmount { set; get; }
        public decimal Vat { set; get; }
        public decimal Tax { set; get; }
        public decimal DiscountRate { set; get; }
        public decimal DiscountAmount { set; get; }
        public decimal NetPayableAmount { set; get; }
        public decimal PaidAmount { set; get; }
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public string Group_Id { set; get; }
        [StringLength(20)]
        public string ChalanNo { set; get; }
        [StringLength(20)]
        public string InvoiceNo { set; get; }
        [StringLength(1000)]
        public string Comments { set; get; }
        public DateTime? TransactionDate { set; get; }
        [StringLength(20)]
        public String GrvNo { set; get; }
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public string Supplier_Id { set; get; }
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public string Party_Id { set; get; }
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public string Customer_Id { set; get; }
        public DateTime GrvDate { set; get; }
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public string Approver_Id { set; get; }
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public string Ledger_Id { set; get; }
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public string SubLedger_Id { set; get; }
        public int? PaymentMode { set; get; }
         [StringLength(20)]
        public string LotNo { set; get; }
    }
}
