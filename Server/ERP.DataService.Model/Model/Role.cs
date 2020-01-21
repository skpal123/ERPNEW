using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.DataService.Model.Model
{
    public class Role
    {
        public Guid Id { set; get; }
        [StringLength(100)]
        public string RoleName { set; get; }
        [StringLength(500)]
        public string Description { set; get; }
        public bool Status { set; get; }
    }
}
