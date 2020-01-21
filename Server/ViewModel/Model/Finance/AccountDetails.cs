using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel.Model
{
    public class AccountDetails
    {
        public List<AccountParentChildRelationInfo> AccountParentChildRelationInfoList { set; get; }
        public List<AccountParentChildRelationInfo> AccountList { set; get; }
    }
}
