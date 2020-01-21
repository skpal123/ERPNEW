using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.DataService.Model.Model
{
    public class ApplicatonAccessLog
    {
        [Key]
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public string Id { set; get; }
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public string User_Id { set; get; }
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public string Session_Id { set; get; }
        public DateTime? LoginDate { set; get; }
        public DateTime? Logout { set; get; }
        [StringLength(20)]
        public string UserId { set; get; }
        [StringLength(20)]
        public string UserName { set; get; }
        [StringLength(200)]
        public string Password { set; get; }
        [StringLength(20)]
        public string LoginIp { set; get; }
    }
}
