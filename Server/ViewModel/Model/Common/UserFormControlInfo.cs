using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel.Model
{
    public class UserFormControlInfo
    {
        public int Id { set; get; }
        public string Name { set; get; }
        public string LabelName { set; get; }
        public string Type { set; get; }
        public bool Autocomplete { set; get; }
        public bool Editable { set; get; }
        public bool IsEnable { set; get; }
        public bool IsCheckbox { set; get; }
        public string FormName { set; get; }
        public int? OrderNo { set; get; }
        public bool? IsReadOnly { set; get; }
    }
}
