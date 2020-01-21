using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.DataService.Model.Model
{
    [Table("ProductOfferMaster")]
    public class ProductOfferMaster
    {
        [Key]
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public string Id { set; get; }
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public string Product_Id { set; get; }
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public string Offer_Id { set; get; }
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public string FreeProduct_Id { set; get; }
        public int? BundleSize { set; get; }
    }
}
