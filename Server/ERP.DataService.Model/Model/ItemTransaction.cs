using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.DataService.Model.Model
{
    [Table("tblItemTransaction")]
    public class ItemTransaction
    {
        [Key]
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public string Id { set; get; }
        [StringLength(20)]
        public string TransactionId { set; get; }
         [StringLength(20)]
        public string Reason { set; get; }
         [StringLength(20)]
        public string TransactionType { set; get; }
        public int Quantity { set; get; }
        public decimal UnitCost { set; get; }
        public decimal UnitSale { set; get; }
        public decimal Vat { set; get; }
        public decimal Tax { set; get; }
        public decimal DiscountRate { set; get; }
        public decimal DiscountAmount { set; get; }
        public string SerialNo { set; get; }
        [StringLength(20)]
        public string LotNo { set; get; }
        public DateTime? TransactionDate { set; get; }
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public string Group_Id { set; get; }
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public string Item_Id { set; get; }
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public string Location_Id { set; get; }
    }
}
