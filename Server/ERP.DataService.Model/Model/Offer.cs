using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.DataService.Model.Model
{
    [Table("Offer")]
    public class Offer
    {
        [Key]
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public string Id { set; get; }
        [StringLength(30)]
        public string OfferId { set; get; }
        [StringLength(100)]
        public string OfferName { set; get; }
         [StringLength(100)]
        public string OfferType { set; get; }
        public DateTime? CreatedDate { set; get; }
        public DateTime? EffectiveDate { set; get; }
        public DateTime? ExpiredDate { set; get; }
        public bool? IsDiscountRate { set; get; }
        public double DiscountRate { set; get; }
        public bool? IsSingle { set; get; }
        public bool IsOneToMany { set; get; }
        public bool IsManyToOne { set; get; }
        public bool IsManyToMany { set; get; }
    }
}
