using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel.Model.HrPayroll
{
    public class LeaveTypeInfo
    {
        public string Id { get; set; }
        public string LeaveTypeId { set; get; }
        public string LeaveTypeName { set; get; }
        public bool IsPaid { set; get; }
    }
}
