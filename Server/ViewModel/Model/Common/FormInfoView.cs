using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel.Model
{
    public class FormInfoView
    {
        public int Id { set; get; }
        public string Name { set; get; }
        public bool? IsEnable { set; get; }
        public bool? IsValidationActive { set; get; }
        public bool? IsAutoCode { set; get; }
        public bool? IsReadOnly { set; get; }
        public string FormName { set; get; }
        public bool? IsMinLength { set; get; }
        public bool? IsMaxLength { set; get; }
        public bool? IsEmail { set; get; }
    }
}
