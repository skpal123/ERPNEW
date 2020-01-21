using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace ERPWebApiService.ExrensionMethod
{
    public static class SqlParameterExtension
    {
        public static void AddWithNullableValue(this SqlParameterCollection paramCollection, string paramName, object value)
        {

            SqlParameter param = new SqlParameter();
            param.ParameterName = paramName;
            param.Value = value == null ? DBNull.Value : value;
            if (value == null)
                param.Value = DBNull.Value;
            else
                param.Value = value;
            paramCollection.Add(param);

        }
    }
}