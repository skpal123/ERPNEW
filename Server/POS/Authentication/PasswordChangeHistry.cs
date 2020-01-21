using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ERPWebApiService.Authentication
{
    public class PasswordChangeHistry
    {
        public virtual Guid Id { get; set; }
        public virtual Guid? User_id { get; set; }
        public virtual Guid? Branch_id { get; set; }
        public virtual string Password { get; set; }
        public virtual DateTime? PassChangeDate { get; set; }
        public virtual string PrevPassword { get; set; }
    }
}