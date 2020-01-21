using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Configuration;
namespace ERPWebApiService.DataConnection
{
    public static class ConnectionString
    {
        public static string getConnectionString()
        {
            return ConfigurationManager.ConnectionStrings["SumonPOSContext"].ConnectionString.ToString();
        }
    }
}