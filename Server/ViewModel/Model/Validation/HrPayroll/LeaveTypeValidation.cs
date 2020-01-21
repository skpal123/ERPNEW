using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel.Model.Validation.HrPayroll
{
    public class LeaveTypeValidation
    {
        public bool LeaveTypeId { set; get; }
        public bool LeaveTypeName { set; get; }
        public bool IsPaid { set; get; }
    }
}
