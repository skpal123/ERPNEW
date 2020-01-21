using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.DataService.Model.Model
{
    [Table("tblFormInfo")]
    public class FormInfo
    {
        public int Id{set;get;}
        [StringLength(100)]
        public string Name{set;get;}
        public bool? IsEnable{set;get;}
        public bool? IsValidationActive { set; get; }
         [StringLength(100)]
        public string FormName{set;get;}
         public bool? IsMinLength { set; get; }
         public bool? IsMaxLength { set; get; }
         public bool? IsEmail { set; get; }
         public bool? IsAutoCode { set; get; }
         public bool? IsReadOnly { set; get; }
    }
}
