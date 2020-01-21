using ERP.DataService.Model;
using ERPWebApiService.Authentication;
using ERPWebApiService.DataConnection;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using ViewModel.Model;
using ERPWebApiService.Exceptions;
namespace ERPWebApiService.Autentication
{
    public abstract class AuthorizationHelper
    {
        public static UserSession GetSession()
        {
            SumonERPContext ERPContext = new SumonERPContext();
            var requestObj = HttpContext.Current.Request.Headers.GetValues("sessionId");
            var sessionId = HttpContext.Current.Request.Headers != null ? HttpContext.Current.Request.Headers.Get("sessionid") : null;
            if (sessionId == null)
            {
                sessionId = HttpContext.Current.Request.Headers.Get("sessionId");
            }
            try
            {
                var userSession = SecurityServices.LookupSession(sessionId);
                if (!IsSessionExist(sessionId)) throw new InvalidSessionFailure();

                var UserId = Convert.ToString(HttpContext.Current.Request.Headers["UserId"]);
                var Action = Convert.ToString(HttpContext.Current.Request.Headers["ActionName"]);
                var ItemName = Convert.ToString(HttpContext.Current.Request.Headers["itemName"]);
                if (!string.IsNullOrEmpty(ItemName))
                {
                    List<PermissionView> permissions = GetActionPermissions(UserId, ItemName, Action);
                    if (permissions.Count() > 0)
                        return userSession;
                    else
                        throw new UnauthorizedAccessException("You are not authorized to do this Action.");
                }
                else
                return userSession;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public static List<PermissionView> GetActionPermissions(string userId, string itemName, string actionName)
        {
            SumonERPContext ERPContext = new SumonERPContext();
            List<PermissionView> permissions = new List<PermissionView>();
            //var logMessage = new LogMessage(EnumLogLevel.Info);
            //serviceLogger.Log(EnumLogLevel.Debug, "Call Get Action Permission list .");

            try
            {
                //var userid = Guid.Parse(userId);
                //var userPermissions = ERPContext.UserPermissions.Count(x => x.User_Id == userid);
                //if (userPermissions > 0)
                //{
                //    permissions = (from userPermission in ERPContext.UserPermissions
                //                   join permission in ERPContext.Permissions on userPermission.Permission_Id equals permission.Id
                //                   join userinfo in ERPContext.UserInfos
                //                   on new { uId = userPermission.User_Id, roleId = userPermission.Role_Id } equals new { uId = userinfo.Id, roleId = userinfo.Role_Id }
                //                   join subMenu in ERPContext.SubMenus on permission.SubMenu_id equals subMenu.Id
                //                   where userinfo.Id == Guid.Parse(userId)
                //                       && subMenu.ItemName == itemName
                //                       && permission.Name == actionName
                //                   select new PermissionView()
                //                   {
                //                       Id = permission.Id,
                //                       PermissionName = permission.Name,
                //                       ItemName = subMenu.ItemName,
                //                       SubMenuId = subMenu.Id,
                //                       SubMenuName = subMenu.Name
                //                   }).ToList();


                //}
                //else
                //{
                //    permissions = (from mod in ERPContext.Modules
                //                   join menu in ERPContext.Menus on mod.Id equals menu.Module_Id
                //                   join subMenu in ERPContext.SubMenus on menu.Id equals subMenu.Menu_Id
                //                   join permission in ERPContext.Permissions on subMenu.Id equals permission.SubMenu_id
                //                   join rolepermission in ERPContext.RolePermissions on permission.Id equals rolepermission.Permission_Id
                //                   join userinfo in ERPContext.UserInfos on rolepermission.Role_Id equals userinfo.Role_Id
                //                   where userinfo.Id == Guid.Parse(userId)
                //                   && subMenu.ItemName == itemName
                //                   && permission.Name == actionName
                //                   select new PermissionView()
                //                   {
                //                       Id = permission.Id,
                //                       PermissionName = permission.Name,
                //                       ItemName = subMenu.ItemName,
                //                       SubMenuId = subMenu.Id,
                //                       SubMenuName = subMenu.Name,
                //                       MenuId = menu.Id,
                //                       MenuName = menu.Name,
                //                       ModuleId = mod.Id,
                //                       ModuleName = mod.Name
                //                   }).ToList();
                //}
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

            return permissions;
        }
        protected static bool IsSessionExist(string sessionId)
        {
            var sessionExist = false;
            Guid? loggedsession_id = null;

            using (SqlConnection con = new SqlConnection(ConnectionString.getConnectionString()))
            {
                var sql = "select session_id from SessionManagements where session_Id='" + sessionId + "'";
                con.Open();
                IDataReader oReader = new SqlCommand(sql, con).ExecuteReader();
                if (((System.Data.SqlClient.SqlDataReader)(oReader)).HasRows)
                {
                    while (oReader.Read())
                    {
                        loggedsession_id = Guid.Parse(Convert.ToString(oReader["session_id"]));
                        if (loggedsession_id != null)
                        {
                            sessionExist = true;
                        }
                    }
                }
                oReader.Close();
                return sessionExist;
            }

        }
    }
}