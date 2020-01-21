using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel.Model.HrPayroll
{
    public class SalaryItemInfo
    {

        public string Id { get; set; }
        public string ItemId { get; set; }
        public string ItemName { get; set; }
        public string ItemType { get; set; }
        public string ItemTypeName { get; set; }
        public bool? IsPension { get; set; }
        public bool? IsTax { get; set; }
        public bool? IsDefault { get; set; }
        public bool? IsBasic { get; set; }
        public bool? IsDaily { get; set; }
        public double? Percentage { get; set; }
        public string OperatorString { get; set; }
        public string InheritedItem { get; set; }
        public string InheritedItemName { get; set; }
        public double? DefaultAmount { get; set; }
        public bool? IsLoan { get; set; }
        public bool? IsLeave { get; set; }
    }
}
