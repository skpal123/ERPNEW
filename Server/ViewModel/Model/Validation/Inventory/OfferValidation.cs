using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel.Model.Validation.Inventory
{
    public class OfferValidation
    {
        public bool OfferId { set; get; }
        public bool OfferName { set; get; }
        public bool OfferType { set; get; }
        public bool IsSingle { set; get; }
        public bool IsOneToMany { set; get; }
        public bool IsManyToOne { set; get; }
        public bool IsManyToMany { set; get; }
        public bool CreatedDate { set; get; }
        public bool EffectiveDate { set; get; }
        public bool ExpiredDate { set; get; }
        public bool IsDiscountRate { set; get; }
        public bool DiscountRate { set; get; }
        public bool ProductMaster { set; get; }
    }
}
