using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel.Model
{
    public class RoleInfo
    {
        public Guid Id { get; set; }

        /** The name of the role. */
        public string RoleName { get; set; }

        public string Description { get; set; }

        public bool Status { get; set; }

        public List<PermissionView> Permissions { get; set; }
    }
}
