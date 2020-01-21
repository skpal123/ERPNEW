using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ERPWebApiService.Exceptions
{
    public class InvalidSessionFailure:Exception
    {
    }
    
    public class wrongPasswordFailure : Exception
    {
    }
    public class wrongTriedPasswordFailure : Exception
    {
    }
    public class InactiveUser : Exception
    {
    }
    public class UnAuthorizedException : Exception
    {
    }
 
}