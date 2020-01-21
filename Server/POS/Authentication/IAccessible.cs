using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ERPWebApiService.Authentication
{
    public interface IAccessible
    {
        bool Selected { get; set; }
    }
}