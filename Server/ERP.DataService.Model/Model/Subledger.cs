using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.DataService.Model.Model
{
    [Table("tblSubledger")]
    public class Subledger
    {
        [Key]
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public string Id { set; get; }
        [StringLength(6)]
        public string SubledgerCode { set; get; }
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public string Account_Id { set; get; }
        [StringLength(500)]
        public string Description { set; get; }
    }
}
