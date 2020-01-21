using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.DataService.Model.Model
{
     [Table("tblCodeFormater")]
    public class CodeFormater
    {
        public int Id { set; get; }
        [StringLength(50)]
        public string Name { set; get; }
        [StringLength(30)]
        public string ItemName { set; get; }
        public int ItemLength { set; get; }
        public bool? IsSymbol { set; get; }
        public bool? IsSerial { set; get; }
        public bool? IsTodaysDate { set; get; }
        [StringLength(30)]
        public string SymbolName { set; get; }
        public string StartPossition { set; get; }
        public int? LastNumber { set; get; }
        [StringLength(30)]
        public string Prefix { set; get; }
        public int? StringLength { set; get; }
          [StringLength(10)]
        public string MiddleSymbol { set; get; }
    }
}
