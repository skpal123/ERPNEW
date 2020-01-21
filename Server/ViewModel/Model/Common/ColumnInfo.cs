using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel.Model
{
    public class ColumnInfo
    {
        public string Name { set; get; }
        public string LabelName { set; get; }
        public bool? IsEnable { set; get; }
        public bool? IsEditable { set; get; }
        public string FormName { set; get; }
    }
}
