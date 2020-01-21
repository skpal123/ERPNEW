using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.DataService.Model.Model
{
     [Table("tblCustomerSupplierTransactionDetail")]
    public class CustomerSupplierTransactionDetail
    {
        [Key]
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public string Id { set; get; }
         [StringLength(20)]
        public string InvoiceNo { set; get; }
         [StringLength(20)]
        public string TransactionId { set; get; }
         [Column(TypeName = "VARCHAR")]
         [StringLength(100)]
        public string Group_Id { set; get; }
         [Column(TypeName = "VARCHAR")]
         [StringLength(100)]
        public string CustomerTransaction_Id { set; get; }
         [Column(TypeName = "VARCHAR")]
         [StringLength(100)]
        public string SupplierTransaction_Id { set; get; }
        public DateTime? PaymentDate { set; get; }
        public decimal PaidAmount { set; get; }
    }
}
