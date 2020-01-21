using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel.Model.HrPayroll
{
    public class EmployeeSubGradeInfo
    {
        public string Id { get; set; }
        public string SubGradeId { get; set; }
        public string SubGradeName { get; set; }
        public string GradeName { get; set; }
        public string Grade_Id { get; set; }
        public DateTime? EeectiveDate { get; set; }
    }
}
