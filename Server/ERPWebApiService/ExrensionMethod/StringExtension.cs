using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ERPWebApiService.Authentication
{
    public static class StringExtension
    {
        public static DateTime? GetDateTime(this String str)
        {
            string[] dates = str.Split('d');
            if (dates[0] != null && dates[1] != null && dates[2] != null)
            {
                int year, month, day;
                bool isYear = Int32.TryParse(dates[0], out year);
                bool isMonth = Int32.TryParse(dates[1], out month);
                bool isDay = Int32.TryParse(dates[2], out day);
                if (isYear && isMonth && isDay)
                {
                    return new DateTime(year, month, day);
                }
                else
                {
                    return null;
                }
            }
            else
            {
                return null;
            }
        }
    }
}