using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.DataService.Model.Model
{
    public class Permission
    {
        public Guid Id { set; get; }
        [StringLength(100)]
        public string Name { set; get; }
        public Guid? SubMenu_id { set; get; }
    }
}
