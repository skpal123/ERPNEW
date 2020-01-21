using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.DataService.Model.Model
{
   [Table("tblBranchConfiguration")]
    public class BranchConfiguration
    {
        [Key]
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public string Id { set; get; }
        [StringLength(200)]
        public string OrgBrachCode { set; get; }
        public Guid Branch_Id { set; get; }
        [StringLength(200)]
        public string OrgBrachId { set; get; }
        public DateTime CurrentDate { set; get; }
    }
}
