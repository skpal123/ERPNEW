using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.DataService.Model.Model
{
    public class RolePermission
    {
        public Guid Id { set; get; }
        public Guid? Role_Id { set; get; }
        public Guid? Permission_Id { set; get; }
    }
}
