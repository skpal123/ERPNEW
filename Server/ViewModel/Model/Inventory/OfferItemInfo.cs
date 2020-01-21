using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel.Model.Inventory
{
    public class OfferItemInfo
    {
        public string Id { get; set; }
        public string CategoryId { get; set; }
        public string CategoryName { get; set; }
        public string SubCategoryId { get; set; }
        public string SubCategoryName { get; set; }
        public string ItemId { get; set; }
        public string ItemName { get; set; }
        public bool IsItemCheck { get; set; }
    }
}
