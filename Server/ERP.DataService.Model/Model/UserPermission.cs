using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.DataService.Model.Model
{
    [Table("UserPermession")]
    public class UserPermission
    {
        public Guid Id { set; get; }
        public Guid User_Id { set; get; }
        public Guid? Role_Id { set; get; }
        public Guid? Permission_Id { set; get; }
        public Guid? Branch_Id { set; get; }
    }
}
