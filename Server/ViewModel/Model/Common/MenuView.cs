using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel.Model
{
    public class MenuView
    {
        public Guid Id { get; set; }
        public string Name { set; get; }
        public string RouterPath { set; get; }
        public string SideMenuRouterPath { set; get; }
        public string ImagePath { set; get; }
        public int? MenuSqenceId { set; get; }
        public int? ModuleSeqId { set; get; }
        public Guid Module_Id { set; get; }
        public List<SubMenuView> SubMenus { set; get; }
    }
}
