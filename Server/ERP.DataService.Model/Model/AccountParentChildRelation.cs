using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.DataService.Model.Model
{
    [Table("tblAccountParentChildRelation")]
    public class AccountParentChildRelation
    {
        [Key]
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public string Id { set; get; }
        public int? ParentGroupId { set; get; }
        public int? ParentLevelId { set; get; }
        public int? ChildGroupId { set; get; }
        public int? ParentAccId { set; get; }
        public int? ChildAccId { set; get; }
        public int? ChildLevelId { set; get; }
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public string ParentAccount_Id { set; get; }
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public string ChildAccount_Id { set; get; }
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public string Branch_Id { set; get; }

    }
}
