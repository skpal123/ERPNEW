using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Ajax.Utilities;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ERP.DataService.Model;
using ViewModel.Model;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using ERPWebApiService.Authentication;
using System.Data.SqlClient;
using ERPWebApiService.DataConnection;
using ERPWebApiService.Autentication;
using ERP.DataService.Model.Model;
using System.Data;
namespace ERPWebApiService.Controllers
{
     [RoutePrefix("api/AdministrationService")]
    public class AdministrationController : ApiController
    {
        SumonERPContext ERPContext = new SumonERPContext();
        [Route("getModules")]
        [HttpGet]
        public HttpResponseMessage getModules()
        {
            try
            {
                var modules = ERPContext.Modules.Select(x => new ModuleView
                {
                    Id = x.Id,
                    Name = x.Name,
                    //RouterPath = x.RouterPath,
                    SequenceId = x.SequencesId
                }).OrderBy(x => x.Name).ToList();
                return Request.CreateResponse(HttpStatusCode.OK, modules);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }

        }
        [Route("hash")]
        [HttpGet]
        public HttpResponseMessage createHash()
        {
            var h = PasswordHash.Create("001");
            return Request.CreateResponse(HttpStatusCode.OK, h);

        }
        [Route("getMenusByModule/{moduleId}")]
        [HttpGet]
        public HttpResponseMessage getMenusByModuleId(string moduleId)
        {
            try
            {
                var ModuleId = Convert.ToInt32(moduleId);
                var menus = ERPContext.Menus.Where(m => m.ModuleSeqId == ModuleId).Select(x => new MenuView
                {
                    Id = x.Id,
                    Name = x.Name,
                    RouterPath = x.RouterPath,
                    MenuSqenceId = x.MenuSqenceId,
                    ModuleSeqId = x.ModuleSeqId,
                    ImagePath = x.ImagePath
                }).ToList();
                return Request.CreateResponse(HttpStatusCode.OK, menus);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }

        }
        [Route("getSubMenusByMenuId/{MenuSeqId}")]
        [HttpGet]
        public HttpResponseMessage getSubMenusByMenuSeqId(string MenuSeqId)
        {
            try
            {
                var menuid = Convert.ToInt32(MenuSeqId);
                var submenus = ERPContext.SubMenus.Where(m => m.MenuSqId == menuid).Select(x => new SubMenuView
                {
                    Id = x.Id,
                    Name = x.Name,
                    RouterPath = x.RouterPath,
                    SubMenuSqId = x.SubMenuSqId,
                    MenuSqId = x.MenuSqId,
                }).ToList();
                return Request.CreateResponse(HttpStatusCode.OK, submenus);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }

        }
        [Route("getUsers")]
        [HttpGet]
        public HttpResponseMessage getUsers()
        {
            try
            {
                var menusControl = ERPContext.Modules.Select(x => new ModuleView
                {
                    Id=x.Id,
                    Name=x.Name,
                    //RouterPath=x.RouterPath,
                    SequenceId=x.SequencesId,
                    Menus = ERPContext.Menus.Where(y => y.Module_Id == x.Id).Select(y=>new MenuView
                    {
                        Id=y.Id,
                        Name=y.Name,
                        RouterPath=y.RouterPath,
                        MenuSqenceId=y.MenuSqenceId,
                        ModuleSeqId=y.ModuleSeqId,
                        ImagePath=y.ImagePath,
                        Module_Id=y.Module_Id,
                        SubMenus=ERPContext.SubMenus.Where(z=>z.Menu_Id==y.Id).Select(s=>new SubMenuView
                        {
                            Id=s.Id,
                            Name=s.Name,
                            Menu_Id=s.Menu_Id,
                            MenuSqId=s.MenuSqId,
                            RouterPath=s.RouterPath,
                            SubMenuSqId=s.SubMenuSqId,
                            ItemName=s.ItemName,
                        }).ToList(),
                    }).ToList(),
                }).ToList();
                return Request.CreateResponse(HttpStatusCode.OK, menusControl);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }

        }
        [Route("getRolePermissions")]
        [HttpGet]
        public HttpResponseMessage GetRolePermissions()
        {
            try
            {
                List<PermissionView> permissions = new List<PermissionView>();
                using (SqlConnection con = new SqlConnection(ConnectionString.getConnectionString()))
                {
                    SqlCommand cmd = new SqlCommand("select * from func_getPermissionTree() order by SequencesId,MenuSqenceId,SubMenuSqId", con);
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        PermissionView permission = new PermissionView();
                        permission.PermissionId = Guid.Parse(rdr["PermissionId"].ToString());
                        permission.ModuleId = Guid.Parse(rdr["ModuleId"].ToString());
                        permission.MenuId = Guid.Parse(rdr["MenuId"].ToString());
                        permission.SubmenuId = Guid.Parse(rdr["SubmenuId"].ToString());
                        permission.ModuleName = rdr["ModuleName"].ToString();
                        permission.MenuName = rdr["MenuName"].ToString();
                        permission.SubMenuName = rdr["SubmenuName"].ToString();
                        permission.ModuleSeqId = Convert.ToInt32(rdr["SequencesId"]);
                        permission.MenuSeqId = Convert.ToInt32(rdr["MenuSqenceId"]);
                        permission.SubmenuSeqId = Convert.ToInt32(rdr["SubMenuSqId"]);
                        permission.PermissionName = rdr["PermissionName"].ToString();
                        permission.IsPermission = Convert.ToBoolean(rdr["IsCheck"]);
                        permissions.Add(permission);
                    }
                }

                var newPermissions = getNewPermissionTree(permissions);
                return Request.CreateResponse(HttpStatusCode.OK, newPermissions);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }

        }
        [Route("getRolePermissionsByRoleId/{roleId}")]
        [HttpGet]
        public HttpResponseMessage GetRolePermissionsByRoleId(Guid roleId)
        {
            try
            {
                List<PermissionView> permissions = new List<PermissionView>();
                using(SqlConnection con=new SqlConnection(ConnectionString.getConnectionString()))
                {
                    SqlCommand cmd = new SqlCommand("select * from func_getPermissionTreeByRoleId('"+roleId+"') order by SequencesId,MenuSqenceId,SubMenuSqId", con);
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        PermissionView permission = new PermissionView();
                        permission.PermissionId = Guid.Parse(rdr["PermissionId"].ToString());
                        permission.ModuleId = Guid.Parse(rdr["ModuleId"].ToString());
                        permission.MenuId = Guid.Parse(rdr["MenuId"].ToString());
                        permission.SubmenuId = Guid.Parse(rdr["SubmenuId"].ToString());
                        permission.ModuleName = rdr["ModuleName"].ToString();
                        permission.MenuName = rdr["MenuName"].ToString();
                        permission.SubMenuName = rdr["SubmenuName"].ToString();
                        permission.ModuleSeqId = Convert.ToInt32(rdr["SequencesId"]);
                        permission.MenuSeqId = Convert.ToInt32(rdr["MenuSqenceId"]);
                        permission.SubmenuSeqId = Convert.ToInt32(rdr["SubMenuSqId"]);
                        permission.PermissionName = rdr["PermissionName"].ToString();
                        permission.IsPermission =Convert.ToBoolean( rdr["IsCheck"].ToString());
                        permissions.Add(permission);
                    }
                }

                var newPermissions = getNewPermissionTree(permissions);
                return Request.CreateResponse(HttpStatusCode.OK, newPermissions);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }

        }
        private List<PermissionTree> getNewPermissionTree(List<PermissionView> newPermission)
        {
            return newPermission.DistinctBy(x => x.ModuleName).Select(x => new PermissionTree
            {
                Id = x.ModuleId,
                Name = x.ModuleName,
                IsClicked = false,
                Status = true,
                Checked = x.IsPermission,
                IsLeaf=false,
                Level=1,
                Children = buildMenuPermissionTree(newPermission, x.ModuleSeqId)
            }).ToList();
        }
        private List<PermissionTree> buildMenuPermissionTree(List<PermissionView> permissions, int moduleSeqId)
        {
            var newPermissions = permissions.DistinctBy(x=>x.MenuName).Where(x=>x.ModuleSeqId==moduleSeqId)
                .Select(x => new PermissionTree
            {
                Id = x.MenuId,
                Name = x.MenuName,
                IsClicked = false,
                Status = true,
                Checked = x.IsPermission,
                IsLeaf=false,
                Level=2,
                Children = buildSubMenuPermissionTree(permissions, x.MenuSeqId)
            }).ToList();
            return newPermissions;
        }
        private List<PermissionTree> buildSubMenuPermissionTree(List<PermissionView> permissions, int menuSeqId)
        {
            var newPermissions = permissions.DistinctBy(x=>x.SubMenuName).Where(x=>x.MenuSeqId==menuSeqId)
                .Select(x => new PermissionTree
            {
                Id = x.SubmenuId,
                Name = x.SubMenuName,
                IsClicked = false,
                Status = true,
                Checked = x.IsPermission,
                IsLeaf=false,
                Level=3,
                Children = buildPermissionTree(permissions, x.SubmenuSeqId)
            }).ToList();
            return newPermissions;
        }
        private List<PermissionTree> buildPermissionTree(List<PermissionView> permissions, int SubmenuSeqId)
        {
            var newPermissions = permissions.Where(x=>x.SubmenuSeqId==SubmenuSeqId).Select(x => new PermissionTree
            {
                Id = x.PermissionId,
                Name = x.PermissionName,
                IsClicked = false,
                IsLeaf=true,
                Status = true,
                Level=4,
                Checked = x.IsPermission
            }).ToList();
            return newPermissions;
        }
        public List<SubMenuView> getSubMenus(int? MenuSeqId)
        {
            List<SubMenuView> submenus = new List<SubMenuView>();
            using (SqlConnection con = new SqlConnection(ConnectionString.getConnectionString()))
            {
                SqlCommand cmd = new SqlCommand(@"select distinct m.Id,sm.Name,sm.RouterPath,sm.SubMenuSqId,sm.MenuSqId,sm.ItemName  from RolePermissions rp 
                inner join Permissions p on rp.Permission_Id=p.Id
                inner join SubMenus sm on p.SubMenu_id=sm.Id
                inner join Menus m on sm.Menu_Id=m.Id
                inner join Modules mo on m.Module_Id=mo.Id where sm.MenuSqId=" + MenuSeqId + "", con);
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
        public List<MenuView> getMenus(int ModuleSeqId)
        {
            List<MenuView> menuViews = new List<MenuView>();
            using (SqlConnection con = new SqlConnection(ConnectionString.getConnectionString()))
            {
                SqlCommand cmd = new SqlCommand(@"select distinct m.Id,m.Name,m.RouterPath,m.MenuSqenceId,m.ModuleSeqId,m.ImagePath  from RolePermissions rp 
                inner join Permissions p on rp.Permission_Id=p.Id
                inner join SubMenus sm on p.SubMenu_id=sm.Id
                inner join Menus m on sm.Menu_Id=m.Id
                inner join Modules mo on m.Module_Id=mo.Id where m.ModuleSeqId=" + ModuleSeqId + "", con);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    MenuView menu = new MenuView();
                    menu.Id = Guid.Parse(rdr["Id"].ToString());
                    menu.Name = rdr["Name"].ToString();
                    menu.RouterPath = rdr["RouterPath"].ToString();
                    menu.MenuSqenceId = Convert.ToInt32(rdr["MenuSqenceId"]);
                    menu.ModuleSeqId = Convert.ToInt32(rdr["ModuleSeqId"]);
                    menu.SubMenus = getSubMenus(menu.MenuSqenceId);
                    menuViews.Add(menu);
                }
            }
            return menuViews;
        }
        [Route("getRules")]
        [HttpGet]
        public HttpResponseMessage GetRoleList()
        {
            List<RoleInfo> roleList = new List<RoleInfo>();
            try
            {
                using (SqlConnection con = new SqlConnection(ConnectionString.getConnectionString()))
                {
                    SqlCommand cmd = new SqlCommand(@"select * from Roles", con);
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        RoleInfo role = new RoleInfo();
                        role.Id = Guid.Parse(rdr["Id"].ToString());
                        role.RoleName = rdr["RoleName"].ToString();
                        role.Description = rdr["Description"].ToString();
                        role.Status =Convert.ToBoolean( rdr["Status"].ToString());
                        roleList.Add(role);
                    }
                }
                return Request.CreateResponse(HttpStatusCode.OK, roleList);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
           
        }
        [Route("getRuleControl/{formName}")]
        [HttpGet]
        public HttpResponseMessage GetRoleControlList(string formName)
        {
            try
            {
                var roleControlList = ERPContext.RoleControls.Where(x=>x.FormName==formName).Select(x => new RoleControlView()
                {
                    Id=x.Id,
                    Name=x.Name,
                    Label=x.Label,
                    Status=x.Status,
                    FormName=x.FormName
                }).ToList();
                return Request.CreateResponse(HttpStatusCode.OK, roleControlList);
            }
            catch(Exception ex){
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            } 
        }
        [Route("saveRolePermission")]
        [HttpPost]
        public HttpResponseMessage SaveRolePermission(RolePermissionDataInfo rolePermissionDataInfo)
        {
            try
            {
                DataTable rolePermissionTable = new DataTable();
                rolePermissionTable.Columns.Add("Id", typeof(Guid));
                rolePermissionTable.Columns.Add("Role_Id", typeof(Guid));
                rolePermissionTable.Columns.Add("Permission_Id", typeof(Guid));
                var role = ERPContext.Roles.FirstOrDefault(x => x.Id == rolePermissionDataInfo.roleInfo.Id);
                if (role == null)
                {
                    var newRole = new Role()
                    {
                        Id = Guid.NewGuid(),
                        RoleName = rolePermissionDataInfo.roleInfo.RoleName,
                        Description = rolePermissionDataInfo.roleInfo.Description,
                        Status = true
                    };
                    ERPContext.Roles.AddOrUpdate(newRole);
                    ERPContext.SaveChanges();                  
                    if (rolePermissionDataInfo.RolePermissionList.Any())
                    {
                       
                        foreach (RolePermissionInfo rolePermissionInfo in rolePermissionDataInfo.RolePermissionList)
                        {
                            rolePermissionTable.Rows.Add(Guid.NewGuid().ToString(), newRole.Id, rolePermissionInfo.PermissionId);                         
                        }
                    }
                }
                else
                {                 
                    if (rolePermissionDataInfo.RolePermissionList.Any())
                    {
                        if (role != null)
                        {
                            ERPContext.Database.ExecuteSqlCommand("delete from RolePermissions where role_id='" + role.Id + "'");
                        }
                        foreach (RolePermissionInfo rolePermissionInfo in rolePermissionDataInfo.RolePermissionList)
                        {
                            rolePermissionTable.Rows.Add(Guid.NewGuid().ToString(), role.Id, rolePermissionInfo.PermissionId);
                        }
                    }
                }
                Dictionary<string, object> paramlist = new Dictionary<string, object>();
                paramlist.Add("@typeRolePermission", rolePermissionTable);
                DatabaseCommand.ExcuteObjectNonQuery("proc_saveRolePermission", paramlist, "procedure");
               return Request.CreateResponse(HttpStatusCode.Created, true);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
    }
}
