using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using System.Web;

namespace ERPWebApiService.Authentication
{
    public class ActionLogger
    {
        public void Log(Guid userId, string userCode, string userName, string sessionId, Enum item, ActionItem action, string message, string elementRef)
        {
            var connectionString = ConfigurationManager.ConnectionStrings["iMFASDataServices"].ConnectionString;
            var deletionReasion = HttpContext.Current.Request.Headers["deletionReason"];
            using (var Conn = new SqlConnection(connectionString))
            {
                var itemId = GetEnumDescription(item);
                var itemName = item.ToString().Replace('_', ' ');
                Conn.Open();
                var comText = " INSERT INTO user_activity_log (id, user_id, userId, userName, session_id, item_id, itemName, action, comment, working_time, element_ref,deletionReason) VALUES('" + Guid.NewGuid() + "','" + userId + "','" + userCode + "','" + userName + "','" + sessionId + "','" + itemId + "','" + itemName + "','" + action + "','" + message + "','" + DateTime.Now + "','" + elementRef + "','" + deletionReasion + "')";
                using (SqlCommand Com = new SqlCommand(comText, Conn))
                {
                    Com.ExecuteNonQuery();
                }
                Conn.Close();
            }
        }

        /// <summary>
        /// This will log the information according to the action of the user under specific session on an item
        /// </summary>
        /// <param name="message">message object</param>
        public void Log(Guid userId, string userCode, string userName, string sessionId, Enum item, ActionItem action, string message)
        {
            Log(userId, userCode, userName, sessionId, item, action, message, null);
        }

        public static string GetEnumDescription(Enum value)
        {
            FieldInfo fi = value.GetType().GetField(value.ToString());

            DescriptionAttribute[] attributes =
                (DescriptionAttribute[])fi.GetCustomAttributes(typeof(DescriptionAttribute), false);

            if (attributes != null && attributes.Length > 0)
                return attributes[0].Description;
            else
                return value.ToString();
        }
    }

    public enum ActionItem
    {
        Read,
        Create,
        Update,
        Delete,
        Approve,
        Export,
        Import,
        UploadFile,
        DeleteDocument,
        DownloadDocument,
        CreateGroup,
        UpdateGroup,
        DeleteGroup,
        DeleteVoucher,
        CreateVoucher,
        UpdateVoucher
    }
    
}