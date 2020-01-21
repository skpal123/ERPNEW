using ERPWebApiService.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ERP.DataService.Model;
using System.Data.SqlClient;
using ERP.DataService.Model.Model;
using ERPWebApiService.Autentication;
using ERPWebApiService.Exceptions;
using System.Configuration;
using ViewModel.Model;
using System.Text;
using ERPWebApiService.DataConnection;
namespace ERPWebApiService.Controllers
{
    [RoutePrefix("api/SecurityService")]
    public class SecurityController : ApiController
    {
        public ActionLogger actionLogger = new ActionLogger();
        SumonERPContext ErpContext = new SumonERPContext();

        [Route("login/{UserName}/{Password}")]
        [HttpGet]
        public HttpResponseMessage Login(string UserName, string Password, string NewPassword = "", string IpAddress = "")
        {
            //string clientIp = GetIPAddress();
            var sessionDto = new SessionInfo();
            UserName = System.Uri.UnescapeDataString(UserName);
            Password = System.Uri.UnescapeDataString(Password);
            NewPassword = System.Uri.UnescapeDataString(NewPassword);
            var userInfo = ErpContext.UserInfos.FirstOrDefault(u => u.User_Name == UserName);
            if (userInfo != null)
            {
                //{ if (userInfo.HasUserFlexibility != null && userInfo.HasUserFlexibility == 0) { LoginSecurity(userName, clientIp); } }
                LogoutByNewUser(userInfo.Id, userInfo.Password);
                if (NewPassword != "" && NewPassword != "undefined")
                {
                    if (GetDuplicateByHistryOfChangePassword(Password, NewPassword))
                    {
                        return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, "You can't use any of your last 5 passwords.Please try another to continue...");
                    }
                }
                var userPassIsreset = ErpContext.UserInfos.FirstOrDefault(u => u.User_Id == UserName);
                //if (userPassIsreset.IsReset == 1 && newpassword == "") { SendPasswordPolicy(); }
                //checking empty username and password
                if (string.IsNullOrWhiteSpace(UserName))
                {
                    //securityLogger.Log(EnumLogLevel.Debug, string.Format(ApplicationErrorMessages.EmptyCredentials, userName, pass));
                    return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, "Password worng");
                }
            }
            else return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, "User Id is not correct.");
            try
            {
                // if (newpassword == "" || newpassword == "undefined") CheckPasswordValidy(userInfo);
                var userSession = SecurityServices.CreateSession(UserName, Password);
                sessionDto = CreateSessionInfo(userSession);
                if (sessionDto != null)
                {
                    if (NewPassword != "" && NewPassword != "undefined") { updateExpirepassword(UserName, Password, NewPassword); }
                    storeSessionManagement(userInfo, IpAddress, sessionDto.SessionId);
                    //securityLogger.Log(EnumLogLevel.Info, "Login successful for user:" + userSession.User.UserId);
                }
                return Request.CreateResponse(HttpStatusCode.OK, sessionDto);
            }
            catch (SessionCreationFailure)
            {
                Request.CreateErrorResponse(HttpStatusCode.Unauthorized, "Session creation faild");
            }
            catch (InactiveUser)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, "Inactive user");
            }
            catch (wrongPasswordFailure)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, "Password worng");

            }
            return Request.CreateResponse(HttpStatusCode.OK, sessionDto);

        }

        /// <summary>
        /// Log out from application
        /// </summary>
        protected bool LogoutByNewUser(Guid user_id, string pass)
        {

            try
            {
                Guid? loggedsession_id = null;
                using (SqlConnection con = new SqlConnection(ConnectionString.getConnectionString()))
                {
                    var sql = "select session_id from sessionManagements where user_id='" + user_id + "' and Password ='" + pass + "'";
                    SqlCommand cmd = new SqlCommand(sql, con);
                    con.Open();
                    SqlDataReader oReader = cmd.ExecuteReader();
                    if (((System.Data.SqlClient.SqlDataReader)(oReader)).HasRows)
                    {
                        while (oReader.Read())
                        {
                            loggedsession_id = Guid.Parse(Convert.ToString(oReader["session_id"]));
                            if (loggedsession_id != null)
                            {
                                SecurityServices.CloseSession(loggedsession_id.ToString());
                            }
                        }
                    }
                    oReader.Close();

                    return true;
                }

            }
            catch (Exception)
            {

                throw;
            }

        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="userName"></param>
        /// <param name="pass"></param>
        /// <param name="newpassword"></param>
        /// <returns></returns>

        public bool updateExpirepassword(string userName, string pass, string newpassword)
        {
            Int64 addedDays = 0;
            Guid? user_level_Id = null;
            Guid? user_id = null;

            var connectionString = System.Configuration.ConfigurationManager.ConnectionStrings["iMFASDataServices"].ConnectionString;
            var conn = new SqlConnection(connectionString);
            conn.Open();

            var command1 = new SqlCommand("select password,isnull(user_level_Id,newId()) user_level_Id,id from user_info where user_id =  '" + userName + "'", conn) { CommandTimeout = 600 };
            SqlDataReader oReader1 = command1.ExecuteReader();
            while (oReader1.Read())
            {
                pass = oReader1["password"].ToString();
                user_level_Id = Guid.Parse(oReader1["user_level_Id"].ToString());
                user_id = Guid.Parse(oReader1["id"].ToString());
            }
            oReader1.Close();

            var enCrypNewpassword = PasswordHash.Create(newpassword).ToString();
            var sqlString = "update user_info set password ='" + enCrypNewpassword + "',passWordCreateDate = '" + DateTime.Now + "',isReset = 0   where password =  '" + pass + "' and user_id ='" + userName + "'";
            var command = new SqlCommand(sqlString, conn) { CommandTimeout = 600 };
            SqlDataReader oReader = command.ExecuteReader();
            oReader.Close();
            conn.Close();
            var PasswordChanges = new PasswordChangeHistory
            {
                Id = Guid.NewGuid(),
                User_Id = user_id,
                Branch_Id = user_level_Id,
                Password = enCrypNewpassword,
                PasswordChangeDate = DateTime.Now,
                PrevPassword = pass
            };
            ErpContext.PasswordChangeHistorys.Add(PasswordChanges);
            ErpContext.SaveChanges();
            return true;
        }

        private bool GetDuplicateByHistryOfChangePassword(string userName, string newpassword)
        {
            bool isTrue = false;
            var user = ErpContext.UserInfos.FirstOrDefault(u => u.User_Id == userName);
            var usersPassChangeHistry = (from userInfos in ErpContext.PasswordChangeHistorys where userInfos.User_Id == user.Id orderby userInfos.PasswordChangeDate descending select new { userInfos }).ToList().Take(5);
            if (usersPassChangeHistry != null)
            {
                var IsExistPassword = usersPassChangeHistry.Where(x => CheckDuplicatePassword(x.userInfos, newpassword)).ToList();
                if (IsExistPassword.Count > 0)
                {
                    isTrue = true;
                };
            }
            return isTrue;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="passwordChangeHistry"></param>
        /// <param name="newpassword"></param>
        /// <returns></returns>



        private bool CheckDuplicatePassword(PasswordChangeHistory passwordChangeHistry, string newpassword)
        {
            try
            {
                return PasswordHash.Parse(passwordChangeHistry.Password).CheckPassword(newpassword);
            }
            catch (FormatException)
            {
                // HACK: Allow plain text during transition period.
                return newpassword == passwordChangeHistry.Password;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="userInfo"></param>
        /// <param name="ipAddress"></param>
        /// <param name="SessionId"></param>
        private void storeSessionManagement(UserInfo userInfo, string ipAddress, string SessionId)
        {
            var insertQuery = "Insert into ApplicatonAccessLogs (id, user_id, session_id, loginDate, userId, userName, loginip) VALUES ('" + Guid.NewGuid() + "','" + userInfo.Id + "','" + SessionId + "','" + DateTime.Now + "','" + userInfo.User_Id + "','" + userInfo.User_Name + "','" + System.Uri.UnescapeDataString(ipAddress) + "')";
            ErpContext.Database.ExecuteSqlCommand(insertQuery);
            insertQuery = "delete from SessionManagements where user_id='" + userInfo.Id + "' and Password ='" + userInfo.Password + "'";
            ErpContext.Database.ExecuteSqlCommand(insertQuery);
            insertQuery = "Insert into SessionManagements (id, user_id, session_id, login_Date, userId, userName, Password,loginip) VALUES ('" + Guid.NewGuid() + "','" + userInfo.Id + "','" + SessionId + "','" + DateTime.Now + "','" + userInfo.User_Id + "','" + userInfo.User_Name + "','" + userInfo.Password + "','" + System.Uri.UnescapeDataString(ipAddress) + "')";
            ErpContext.Database.ExecuteSqlCommand(insertQuery);

        }

        ///// <summary>
        ///// 
        ///// </summary>
        ///// <returns></returns>
        //private bool SendPasswordPolicy()
        //{
        //    var msg = "Policy- ";
        //    var logMessage = new LogMessage(EnumLogLevel.Info) { { "username", msg } };
        //    var userPasswordValidityDays = iMFASDataServices.PasswordPolicys.SingleOrDefault();
        //    if (userPasswordValidityDays != null)
        //    {
        //        if (userPasswordValidityDays.HasNumericCase != null && userPasswordValidityDays.HasNumericCase > 0) { msg += "Must have numeber(0-9),"; }
        //        if (userPasswordValidityDays.HasLowerCase != null && userPasswordValidityDays.HasLowerCase > 0) { msg += "Must have small letter(a-z),"; }
        //        if (userPasswordValidityDays.HasUpperCase != null && userPasswordValidityDays.HasUpperCase > 0) { msg += "Must have capital Letter(A-Z),"; }
        //        if (userPasswordValidityDays.HasSpecialCase != null && userPasswordValidityDays.HasSpecialCase > 0) { msg += "Must have special character."; }
        //        if (userPasswordValidityDays.MinLen != null && userPasswordValidityDays.MinLen > 0) { msg += "Min Length:" + userPasswordValidityDays.MinLen; }
        //    }
        //    throw AuthorizationHelper.GenerateServiceError("Caution : Password has been reset.Please change it now to proceed." + msg, HttpStatusCode.Unauthorized, logMessage.Clone(EnumLogLevel.Warn));
        //}

        ///// <summary>
        ///// 
        ///// </summary>
        ///// <returns></returns>
        //private bool CheckPasswordValidy(user_info User)
        //{
        //    Int64 addedDays = 0;
        //    var policyMsg = "";
        //    var logMessage = new LogMessage(EnumLogLevel.Info) { { "username", policyMsg } };
        //    var userPasswordValidityDays = iMFASDataServices.PasswordPolicys.SingleOrDefault();
        //    if (userPasswordValidityDays != null)
        //    {
        //        if (User.UserLevelId != null && User.PassWordCreateDate != null && userPasswordValidityDays.NoOfExpireDays > 0 && userPasswordValidityDays.IsExpired > 0)
        //        {
        //            addedDays = Convert.ToInt64(userPasswordValidityDays.NoOfExpireDays);
        //            DateTime? expireDateRange = User.PassWordCreateDate.Value.AddDays(addedDays);
        //            if (userPasswordValidityDays.IsExpired > 0 && DateTime.Now > expireDateRange)
        //            {
        //                if (userPasswordValidityDays.HasNumericCase != null && userPasswordValidityDays.HasNumericCase > 0) { policyMsg += "Must have numeber(0-9),"; }
        //                if (userPasswordValidityDays.HasLowerCase != null && userPasswordValidityDays.HasLowerCase > 0) { policyMsg += "Must have small letter(a-z),"; }
        //                if (userPasswordValidityDays.HasUpperCase != null && userPasswordValidityDays.HasUpperCase > 0) { policyMsg += "Must have capital Letter(A-Z),"; }
        //                if (userPasswordValidityDays.HasSpecialCase != null && userPasswordValidityDays.HasSpecialCase > 0) { policyMsg += "Must have special character."; }
        //                if (userPasswordValidityDays.MinLen != null && userPasswordValidityDays.MinLen > 0) { policyMsg += "Min Length:" + userPasswordValidityDays.MinLen; }
        //                throw AuthorizationHelper.GenerateServiceError(ApplicationErrorMessages.PasswordValidity + " for " + addedDays + " days.Policy- " + policyMsg, HttpStatusCode.Unauthorized, logMessage.Clone(EnumLogLevel.Warn));

        //            }
        //        }
        //    }
        //    return true;
        //}

        ///// <summary>
        ///// 
        ///// </summary>
        ///// <returns></returns>
        //protected string GetIPAddress()
        //{
        //    OperationContext context = OperationContext.Current;
        //    MessageProperties prop = context.IncomingMessageProperties;
        //    RemoteEndpointMessageProperty endpoint = prop[RemoteEndpointMessageProperty.Name] as RemoteEndpointMessageProperty;
        //    string ip = endpoint.Address;

        //    return ip;
        //}

        ///// <summary>
        ///// Creating required info of user which are required just after login
        ///// </summary>
        ///// <param name="userSession">user's session information</param>
        ///// <returns></returns>
        public SessionInfo CreateSessionInfo(UserSession userSession)
        {
            var sessionInfo = new SessionInfo();
            sessionInfo.SessionId = userSession.SessionToken.ToString();
            sessionInfo.UserInfo = new UserInfoView()
            {
                Id = userSession.User.Id,
                UserId = userSession.User.User_Id,
                UserName = userSession.User.User_Name,
                EmployeeId = userSession.User.Employee_Id,
                //is = userSession.User.IsAllowedBackDatedEntry
            };
            var role = ErpContext.Roles.FirstOrDefault(x => x.Id == userSession.User.Role_Id);
            if (role != null)
            {
                sessionInfo.UserInfo.UserRole = new RoleInfo()
                {
                    Id = role.Id,
                    RoleName = role.RoleName,
                    //Status = y.Status
                };
            }
            sessionInfo.UserLevel = userSession.User.User_Level;
            sessionInfo.LevelId = userSession.User.User_Level_Id;
            sessionInfo.BranchInfos = (from branch in ErpContext.Branchs
                                       join branchConfig in ErpContext.BranchConfigurations
                                       on branch.Id equals branchConfig.Branch_Id
                                       select new BranchInfo
                                       {
                                           Id = branch.Id,
                                           BranchName = branch.BranchName,
                                           BranchCode = branch.BranchCode,
                                           BranchId = branch.BranchId,
                                           CurrentDate = branchConfig.CurrentDate
                                       }).ToList();
            sessionInfo.Modules = getModules();
            sessionInfo.Menus = getMenus(null);
            sessionInfo.SubMenus = getSubMenus(null);
            // actionLogger.Log(userSession.User.Id, userSession.User.UserId, userSession.User.UserName, sessionInfo.SessionId, ActionLogItem.Branch, ActionItem.Read, "Data read successfully");
            return sessionInfo;
        }

        ///// <summary>
        ///// Log out from application
        ///// </summary>
        //public bool Logout()
        //{
        //    // Validate current session.
        //    var userSession = AuthorizationHelper.GetSession();

        //    if (!string.IsNullOrEmpty(userSession.User.UserId))
        //    {
        //        var insertQuery = "Update application_access_log set log_out='" + DateTime.Now + "' WHERE id= (select id from dbo.application_access_log where [user_id] = '" + userSession.User.Id + "' and log_in =(select MAX(log_in) from application_access_log where [user_id] = '" + userSession.User.Id + "'))";
        //        userSession.User.ExecuteNonQuery(insertQuery);
        //        SecurityServices.CloseSession(userSession.SessionToken.ToString());
        //    }
        //    return true;
        //}



        ///// <summary>
        ///// Changing user's password
        ///// </summary>
        ///// <param name="newPasswordInfo"></param>
        //public void ChangePassword(ChangePassword newPasswordInfo)
        //{
        //    // Validate current session.
        //    var session = AuthorizationHelper.GetSession();
        //    var user = iMFASDataServices.Users.First(u => u.UserId == session.User.UserId);
        //    if (GetDuplicateByHistryOfChangePassword(user.UserId, newPasswordInfo.NewPassword))
        //    {
        //        throw AuthorizationHelper.GenerateServiceError(ApplicationErrorMessages.Duplicatepassword, HttpStatusCode.BadRequest, null, IMFASSerivceErrorCode.PreviouslyUsedPassword);
        //    }
        //    //checking for password format
        //    string regExpPattern = System.Configuration.ConfigurationManager.AppSettings["PasswordRegExp"];
        //    if (!string.IsNullOrWhiteSpace(regExpPattern) && !Regex.Match(newPasswordInfo.NewPassword, regExpPattern).Success)
        //    {
        //        throw AuthorizationHelper.GenerateServiceError(ApplicationErrorMessages.InvalidPasswordFormat, HttpStatusCode.BadRequest, null, IMFASSerivceErrorCode.PasswordFormatIsInvalid);
        //    }
        //    if (!SecurityServices.CheckPassword(user, newPasswordInfo.CurrentPassword))
        //    {
        //        throw AuthorizationHelper.GenerateServiceError(ApplicationErrorMessages.WrongPassword, HttpStatusCode.BadRequest, null, IMFASSerivceErrorCode.WrongPassword);
        //    }

        //    if (SecurityServices.ChangePassword(user, newPasswordInfo.NewPassword))
        //    {
        //        return;
        //    }
        //    else
        //    {
        //        // Unknown exception
        //        throw AuthorizationHelper.GenerateServiceError(ApplicationErrorMessages.UnknownException, HttpStatusCode.BadRequest, null, IMFASSerivceErrorCode.UnknowError);
        //    }
        //}
        public List<ModuleView> getModules()
        {
            List<ModuleView> modules = new List<ModuleView>();
            using (SqlConnection con = new SqlConnection(ConnectionString.getConnectionString()))
            {
                SqlCommand cmd = new SqlCommand(@"select distinct mo.Id,mo.Name,mo.RouterPath,mo.SequencesId from RolePermissions rp
                    inner join Permissions p on rp.Permission_Id=p.Id
                    inner join SubMenus sm on p.SubMenu_id=sm.Id
                    inner join Menus m on sm.Menu_Id=m.Id
                    inner join Modules mo on m.Module_Id=mo.Id", con);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    ModuleView module = new ModuleView();
                    module.Id = Guid.Parse(rdr["Id"].ToString());
                    module.Name = rdr["Name"].ToString();
                    module.RouterPath = rdr["RouterPath"].ToString();
                    module.SequenceId = Convert.ToInt32(rdr["SequencesId"]);
                    module.Menus = getMenus(module.SequenceId);
                    modules.Add(module);
                }
            }
            return modules;
        }
        public List<MenuView> getMenus(int? ModuleSeqId)
        {
            List<MenuView> menuViews = new List<MenuView>();
            StringBuilder sb = new StringBuilder();
            sb.Append(@"select distinct m.Id,m.Name,m.RouterPath,m.SideMenuRouterPath,m.MenuSqenceId,m.ModuleSeqId,m.ImagePath  from RolePermissions rp 
                inner join Permissions p on rp.Permission_Id=p.Id
                inner join SubMenus sm on p.SubMenu_id=sm.Id
                inner join Menus m on sm.Menu_Id=m.Id
                inner join Modules mo on m.Module_Id=mo.Id ");
            if(ModuleSeqId!=null){
                sb.Append("where m.ModuleSeqId=" + ModuleSeqId + "");
            }
            using (SqlConnection con = new SqlConnection(ConnectionString.getConnectionString()))
            {
                SqlCommand cmd = new SqlCommand(sb.ToString(), con);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    MenuView menu = new MenuView();
                    menu.Id = Guid.Parse(rdr["Id"].ToString());
                    menu.Name = rdr["Name"].ToString();
                    menu.RouterPath = rdr["RouterPath"].ToString();
                    menu.SideMenuRouterPath = rdr["SideMenuRouterPath"].ToString();
                    menu.MenuSqenceId = Convert.ToInt32(rdr["MenuSqenceId"]);
                    menu.ModuleSeqId = Convert.ToInt32(rdr["ModuleSeqId"]);
                    menu.SubMenus = getSubMenus(menu.MenuSqenceId);
                    menuViews.Add(menu);
                }
            }
            return menuViews;
        }
        public List<SubMenuView> getSubMenus(int? MenuSeqId)
        {
            List<SubMenuView> submenus = new List<SubMenuView>();
             StringBuilder sb = new StringBuilder();
            sb.Append(@"select distinct m.Id,sm.Name,sm.RouterPath,sm.SubMenuSqId,sm.MenuSqId,sm.ItemName  from RolePermissions rp 
                inner join Permissions p on rp.Permission_Id=p.Id
                inner join SubMenus sm on p.SubMenu_id=sm.Id
                inner join Menus m on sm.Menu_Id=m.Id
                inner join Modules mo on m.Module_Id=mo.Id ");
            if(MenuSeqId!=null){
                sb.Append(" where sm.MenuSqId=" + MenuSeqId + "");
            }
            using (SqlConnection con = new SqlConnection(ConnectionString.getConnectionString()))
            {
                SqlCommand cmd = new SqlCommand(sb.ToString(), con);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    SubMenuView submenu = new SubMenuView();
                    submenu.Id = Guid.Parse(rdr["Id"].ToString());
                    submenu.Name = rdr["Name"].ToString();
                    submenu.RouterPath = rdr["RouterPath"].ToString();
                    submenu.SubMenuSqId = Convert.ToInt32(rdr["SubMenuSqId"]);
                    submenu.MenuSqId = Convert.ToInt32(rdr["MenuSqId"]);
                    submenus.Add(submenu);
                }
            }
            return submenus;
        }
    }
}
