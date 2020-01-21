using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.DataService.Model.Model
{
     [Table("tblUserFormControl")]
    public class UserFormControl
    {
        public int Id { set; get; }
          [StringLength(100)]
        public string Name { set; get; }
          [StringLength(200)]
        public string LabelName { set; get; }
          [StringLength(100)]
        public string Type { set; get; }
        public bool Autocomplete { set; get; }
        public bool Editable { set; get; }
        public bool IsEnable { set; get; }
        public bool IsCheckbox { set; get; }
          [StringLength(100)]
        public string FormName { set; get; }
        public int? OrderNo { set; get; }
        public bool? IsReadOnly { set; get; }
    }
}
