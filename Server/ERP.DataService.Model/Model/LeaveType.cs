using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.DataService.Model.Model
{
    [Table("LeaveType")]
    public class LeaveType
    {
        [Key]
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public string Id { get; set; }
        [StringLength(20)]
        public string LeaveTypeId { set; get; }
        [StringLength(150)]
        public string LeaveTypeName { set; get; }
        public bool IsPaid { set; get; }
    }
}
