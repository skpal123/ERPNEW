using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Threading;
using System.Web;
using System.Data.Entity.Migrations;
using ERP.DataService.Model;
using ERP.DataService.Model.Model;
using ERPWebApiService.Exceptions;
namespace ERPWebApiService.Authentication
{
    public static class SecurityServices
    {
        public static SumonERPContext ErpContext = new SumonERPContext();
        private static readonly TimeSpan? DefaultSessionTimeout = null;

        private static readonly ISessionManager<UserSession> UserSessionManager;
        private static readonly Timer CleanUpTimer;
        static SecurityServices()
        {
            var timeoutSetting = ConfigurationManager.AppSettings["SessionTimeoutMinutes"];
            var timeout = timeoutSetting == null ? DefaultSessionTimeout : TimeSpan.FromMinutes(Convert.ToDouble(timeoutSetting));
            // TODO construct via properties in the *.config file
            UserSessionManager = new InMemorySessionManager<UserSession>(timeout);
            if (timeout.HasValue)
            {
                CleanUpTimer = UserSessionManager.CreateCleanUpTimer(timeout.Value);
            }
        }

        #region Password Helper Members

        /// <summary>
        /// A wrapper method for salted password hashing with PBKDF2-SHA1.
        /// </summary>
        /// <param name="password">User password</param>
        /// <returns>Encrypted password string</returns>
        public static string CreatePasswordHash(string password)
        {
            return PasswordHash.Create(password).ToString();
        }

        /// <summary>
        /// During this transition period, we will also support plain text password.
        /// </summary>
        /// <param name="user">User object</param>
        /// <param name="password">Password text passed in</param>
        /// <returns></returns>
        public static bool CheckPassword(UserInfo user, string password)
        {
            try
            {
                return PasswordHash.Parse(user.Password).CheckPassword(password);
            }
            catch (FormatException)
            {
                // HACK: Allow plain text during transition period.
                return password == user.Password;
            }
        }

        /// <summary>
        /// Update user password in the encrypted format.
        /// </summary>
        /// <param name="user">User object</param>
        /// <param name="newPassword">New password passed back</param>
        /// <returns></returns>
        public static bool ChangePassword(UserInfo user, string newPassword)
        {
            try
            {
                var prevPass = user.Password;
                user.Password = CreatePasswordHash(newPassword);
                // user.Save();
                var PasswordChanges = new PasswordChangeHistry
                {
                    Id = Guid.NewGuid(),
                    User_id = user.Id,
                    Password = user.Password,
                    PassChangeDate = DateTime.Now,
                    PrevPassword = prevPass
                };
                //PasswordChanges.Save();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
        #endregion

        /// <summary>
        /// This is the main interface method that would be used by other application.
        /// It creates a UserSession object by validating the login and password combination.
        /// </summary>
        /// <param name="login">Unique User ID</param>
        /// <param name="password">User password</param>
        /// <returns>UserSession object</returns>
        /// <exception cref="Exceptions.SessionCreationFailure"></exception>
        public static UserSession CreateSession(string Username, string password)
        {
            var users = (from user in ErpContext.UserInfos
                         where user.User_Name == Username && user.Status == true  //WITCHCRAFT!
                         select new { user }).ToList();
            
            // Do password comparison in memory to ensure exact match (not normally captured by SQL Server)
            var userInfo = ErpContext.UserInfos.FirstOrDefault(u => u.User_Id == Username);
            //var results = users.Where(x => CheckPassword(x.user, password)).ToList();
            var results = users.Where(x => x.user.User_Id==Username&&x.user.Password==password).ToList();
            if (results.Count != 1)
            {

                if (users.Count == 1) { SaveUserLoginRecord(users[0].user, "Incorrect user password.", 1); throw new Exceptions.wrongTriedPasswordFailure(); }
                if (users.Count == 0)
                {
                    SaveUserLoginRecord(userInfo, "User is not at Active status.", 0);
                    throw new Exceptions.InactiveUser();
                }
                else throw new Exceptions.wrongPasswordFailure();
            }
            else if (users.Count == 0) { SaveUserLoginRecord(userInfo, "User is not at Active status.", 0); throw new Exceptions.InactiveUser(); }
            var session = results.Select(x => new UserSession(x.user)).Single();
            UserSessionManager.SaveSession(session);
            ErpContext.UserInfos.AddOrUpdate(userInfo);
            ErpContext.SaveChanges();
            return session;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="role_id"></param>
        /// <returns></returns>

        public static void SaveUserLoginRecord(UserInfo user, string Reason, int isBlock)
        {
            var userIP = "";
            var isUserBlocked = "N";
            userIP = GetIpFromContext();
            var computerName = DetermineCompName(userIP);
            var userInfo = ErpContext.UserInfos.FirstOrDefault(u => u.User_Id == user.User_Id);
            bool? hasStatus = userInfo.Status;
            double? HowManyTry = 0;
            ErpContext.UserInfos.Add(userInfo);
            ErpContext.SaveChanges();
            //userInfo.Save();
            var connectionString = System.Configuration.ConfigurationManager.ConnectionStrings["SumonERPContext"].ConnectionString;
            var conn = new SqlConnection(connectionString);
            conn.Open();
            var onlyDate = DateTime.Now;
            var getDate = onlyDate.Date;
            var comText = " INSERT INTO TriedLoginByWrongPass_log  VALUES('" + Guid.NewGuid() + "','" + user.Id + "','" + user.User_Name + "','" + onlyDate + "','" + userInfo.TriedLogin + "','" + Reason + "','" + userIP + "','" + isUserBlocked + "','" + computerName + "')";
            using (SqlCommand Com = new SqlCommand(comText, conn)) { Com.ExecuteNonQuery(); }
            conn.Close();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="IP"></param>
        /// <returns></returns>
        public static string DetermineCompName(string IP)
        {
            IPAddress myIP = IPAddress.Parse(IP);
            IPHostEntry GetIPHost = Dns.GetHostEntry(myIP);
            List<string> compName = GetIPHost.HostName.ToString().Split('.').ToList();
            return compName.First();
        }


        /// <summary>
        /// This method is only valid when this service is integrated in WCF services.
        /// It will retrieve the client IP address.
        /// </summary>
        /// <returns></returns>
        public static string GetIpFromContext()
        {
            var context = HttpContext.Current;
            if (context != null)
            {
                return null;
                //var prop = context.;
                //var endpoint = prop[RemoteEndpointMessageProperty.Name] as RemoteEndpointMessageProperty;
                //return endpoint.Address;
            }
            else
            {
                return null;
            }
        }

        /// <exception cref="Exceptions.SessionCreationFailure"></exception>
        public static UserSession CreateSession(string login, string password, Func<ICollection<IAccessible>> GetAccessibles)
        {
            var session = CreateSession(login, password);
            session.GetAccessibles = GetAccessibles;
            return session;
        }

        /// <summary>
        /// Retrieves the session associated with the specified session token, or
        /// null if one could not be found.
        /// </summary>
        /// <param name="sessionToken">A token identifying the session to retrieve.</param>
        /// <returns>The session matching the given token, or null.</returns>
        private static UserSession GetSession(string sessionToken)
        {
            Guid token;
            var goodToken = Guid.TryParse(sessionToken, out token);

            if (!goodToken)
            {
                return null;
            }

            return UserSessionManager.GetSession(token);
        }

        /// <summary>
        /// Retrieves the active session associated with the specified session token.
        /// </summary>
        /// <param name="sessionToken">A token identifying the session to retrieve.</param>
        /// <returns>The valid, open session matching the given token.</returns>
        /// <exception cref="Exceptions.InvalidSessionFailure">If there is no active session associated with the specified token.</exception>
        public static UserSession LookupSession(string sessionToken)
        {
            var session = GetSession(sessionToken);
            if (session == null || !session.IsOpen)
                throw new Exceptions.InvalidSessionFailure();

            return session;
        }


        //public static void CloseAllForUser(UserInfo target)
        //{
        //    IEnumerable<UserSession> todestroy = UserSessionManager.GetSessions(aa => aa.User.User_Id == target.User_Id);
        //    foreach (InitVent.Metadata.Session.ISession ses in todestroy)
        //    {
        //        CloseSession(ses.SessionToken.ToString());
        //    }
        //}

        /// <summary>
        /// Closes the session associated with the specified session token.
        /// </summary>
        /// <param name="sessionToken">A token identifying the session to close.</param>
        /// <remarks>
        /// Note: This method always returns cleanly, whether or not the given session was in fact closed.
        /// </remarks>
        public static void CloseSession(string sessionToken)
        {
            Guid token;
            var goodToken = Guid.TryParse(sessionToken, out token);
            if (!goodToken)
                return;

            UserSessionManager.CloseSession(token);
        }
    }
}