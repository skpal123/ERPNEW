using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel.Model
{
    public class RolePermissionDataInfo
    {
        public RoleInfo roleInfo { set; get; }
        public List<RolePermissionInfo> RolePermissionList { set; get; }
    }
}
