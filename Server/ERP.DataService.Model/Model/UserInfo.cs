using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace ERP.DataService.Model.Model
{
    [Table("tblUserInfo")]
    public class UserInfo
    {
        [Key]
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public string Id { set; get; }
        [StringLength(20)]
        public string User_Id { set; get; }
        [StringLength(20)]
        public string Password { set; get; }
        [StringLength(100)]
        public string User_Name { set; get; }
        public string Employee_Id { set; get; }
        public string Branch_Id { set; get; }
        public Boolean Status { set; get; }
        public int? User_Level { set; get; }
        public string User_Level_Id { set; get; }
        public Guid? Role_Id { set; get; }
        public DateTime? passWordCreateDate { set; get; }
        public Boolean? IsReset { set; get; }
        [StringLength(50)]
        public string AllowedIP { set; get; }
        [StringLength(50)]
        public string WorkStart { set; get; }
        [StringLength(50)]
        public string WorkEnd { set; get; }
        public Boolean? IsAccessInHoliday { set; get; }
        public Boolean? HasUserFlexibility { set; get; }
        public int? TriedLogin { set; get; }
        [StringLength(50)]
        public string LastIPRange { set; get; }
        public string LastIPRange2 { set; get; }
        public Boolean? IsAllowedBackDatedEntry { set; get; }
    }
}
