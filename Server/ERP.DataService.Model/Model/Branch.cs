using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.DataService.Model.Model
{
    [Table("tblBranch")]
    public class Branch
    {
        public Guid Id { set; get; }
        [StringLength(200)]
        public string BranchName { set; get; }
        public string BranchId { set; get; }
        [StringLength(200)]
        public string BranchCode { set; get; }
        public DateTime OpeningDate { set; get; }
        [StringLength(200)]
        public string Location { set; get; }
    }
}
