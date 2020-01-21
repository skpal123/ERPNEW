using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
namespace ERP.DataService.Model.Model
{
      [Table("tblRoleControl")]
    public class RoleControl
    {
        public int Id { set; get; }
        [StringLength(100)]
        public string Name { set; get; }
        [StringLength(100)]
        public string Label { set; get; }
        public bool Status { set; get; }
        public string FormName { set; get; }

    }
}
