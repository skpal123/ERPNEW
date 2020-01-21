using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel.Model.HrPayroll
{
    public class GradeStepSalaryItemInfo
    {
        public string Id { set; get; }
        public string SalaryItemId { get; set; }
        public string SalaryItem_Id { get; set; }
        public double? SalaryAmount { get; set; }
        public bool? HasComparator { get; set; }
        public string ComparatorString { get; set; }
        public string InheritedItem_Id { get; set; }
        public string Grade_id { get; set; }
        public string GradeStep_id { get; set; }
        public double? Percentage { get; set; }
        public double? SingleItemAmount { get; set; }
        public string Salary_id { get; set; }
        public bool? IsBasic { get; set; } 
    }
}
