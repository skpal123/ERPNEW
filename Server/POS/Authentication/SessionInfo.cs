using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ViewModel.Model;

namespace ERPWebApiService.Autentication
{
    public class SessionInfo
    {
        public string SessionId { get; set; }

        public UserInfoView UserInfo { get; set; }

        public double SessionTime { get; set; }

        public List<BranchInfo> BranchInfos { set; get; }
        public List<ModuleView> Modules { set; get; }
        public List<MenuView> Menus { set; get; }
        public List<SubMenuView> SubMenus { set; get; }
        public int? UserLevel { get; set; }

        public Guid? LevelId { get; set; }

        public string PluginName { get; set; }

        public string OrgHierarchy { get; set; }
    }
}