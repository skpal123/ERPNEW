using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel.Model
{
    public class CodeFormaterInfo
    {
        public int Id { set; get; }
        public string Name { set; get; }
        public string ItemName { set; get; }
        public int ItemLength { set; get; }
        public bool? IsSymbol { set; get; }
        public bool? IsSerial { set; get; }
        public bool? IsTodaysDate { set; get; }
        public string SymbolName { set; get; }
        public string StartPossition { set; get; }
        public int? LastNumber { set; get; }
        public string Prefix { set; get; }
        public int? StringLength { set; get; }
        public string MiddleSymbol { set; get; }
    }
}
