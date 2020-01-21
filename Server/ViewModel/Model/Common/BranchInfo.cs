using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel.Model
{
    public class BranchInfo
    {
        public Guid Id { get; set; }
        public string BranchName { set; get; }
        public string BranchId { set; get; }
        public string BranchCode { set; get; }
        public DateTime OpeningDate { set; get; }
        public DateTime CurrentDate { set; get; }
        public string Location { set; get; }
    }
}
