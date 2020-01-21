using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel.Model.Inventory
{
    public class OfferInfo
    {
        public string Id { set; get; }
        public string OfferId { set; get; }
        public string OfferName { set; get; }
        public string OfferType { set; get; }     
        public bool? IsSingle { set; get; }
        public bool IsOneToMany { set; get; }
        public bool IsManyToOne { set; get; }
        public bool IsManyToMany { set; get; }
        public DateTime? CreatedDate { set; get; }
        public DateTime? EffectiveDate { set; get; }
        public DateTime? ExpiredDate { set; get; }
        public bool? IsDiscountRate { set; get; }
        public double DiscountRate { set; get; }
        public ProductOfferMapInfo ProductMaster { set; get; }
    }
}
