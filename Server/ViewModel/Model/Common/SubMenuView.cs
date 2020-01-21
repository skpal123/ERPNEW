using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel.Model
{
    public class SubMenuView
    {
        public Guid Id { get; set; }
        public string Name { set; get; }
        public string RouterPath { set; get; }
        public Guid Menu_Id { set; get; }
        public int? MenuSqId { set; get; }
        public int? SubMenuSqId { set; get; }
        public string ItemName { set; get; }
        public List<PermissionView> Permissions { set; get; }
    }
}
