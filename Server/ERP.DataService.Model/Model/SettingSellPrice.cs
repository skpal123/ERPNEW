using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.DataService.Model.Model
{
     [Table("tblSettingSellPrice")]
    public class SettingSellPrice
    {
         [Key]
         [Column(TypeName = "VARCHAR")]
         [StringLength(100)]
         public string Id { set; get; }
        [StringLength(20)]
        public string ItemCode { set; get; }
        [StringLength(20)]
        public string ItemId { set; get; }
        public DateTime? PurchaseDate { set; get; }
        public DateTime? SettingDate { set; get; }
        public decimal PreviousAmount { set; get; }
        public decimal Amount { set; get; }
        public decimal WholeSaleAmount { set; get; }
        public int SellingMethod { set; get; }
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public string Item_Id { set; get; }

    }
}
