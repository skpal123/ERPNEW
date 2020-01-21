using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.DataService.Model.Model
{
    public class SessionManagement
    {
        public string Id { get; set; }
        public string User_Id { set; get; }
        public string Session_Id { set; get; }
        public DateTime? Login_Date { set; get; }
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
