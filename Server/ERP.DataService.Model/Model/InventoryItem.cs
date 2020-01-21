using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.DataService.Model.Model
{
    [Table("tblInventoryItem")]
    public class InventoryItem
    {
        [Key]
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public string Id { set; get; }
        [StringLength(20)]
        public string ItemId { set; get; }
        [StringLength(20)]
        public string ItemCode { set; get; }
        [StringLength(150)]
        public string ItemName { set; get; }
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public string Category_Id { set; get; }
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public string SubCategory_Id { set; get; }
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public string UnitId { set; get; }
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public string Ledger_Id { set; get; }
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public string SubLedger_Id { set; get; }

    }
}
