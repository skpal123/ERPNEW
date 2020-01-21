using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel.Model.Validation.HrPayroll
{
    public class SalaryItemValidation
    {
        public bool Id { get; set; }
        public bool ItemId { get; set; }
        public bool ItemName { get; set; }
        public bool ItemType { get; set; }
        public bool ItemTypeName { get; set; }
        public bool IsPension { get; set; }
        public bool IsTax { get; set; }
        public bool IsDefault { get; set; }
        public bool IsBasic { get; set; }
        public bool IsDaily { get; set; }
        public bool Percentage { get; set; }
        public bool InheritedItem { get; set; }
        public bool OperatorString { get; set; }
        public bool DefaultAmount { get; set; }
        public bool IsLoan { get; set; }
        public bool IsLeave { get; set; }
    }
}
