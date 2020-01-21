using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.DataService.Model.Model
{
    public class PasswordChangeHistory
    {
        [Key]
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public string Id { set; get; }
        public string User_Id { set; get; }
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public string Branch_Id { set; get; }
         [StringLength(200)]
        public string Password { set; get; }
         [StringLength(200)]
         public string PrevPassword { set; get; }
        public DateTime? PasswordChangeDate { set; get; }
    }
}
