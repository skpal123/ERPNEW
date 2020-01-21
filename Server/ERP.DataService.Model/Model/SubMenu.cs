using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.DataService.Model.Model
{
    public class SubMenu
    {
        public Guid Id { get; set; }
        [StringLength(200)]
        public string Name { set; get; }
        [StringLength(200)]
        public string RouterPath { set; get; }
        public Guid Menu_Id { set; get; }
        public int MenuSqId { set; get; }
        public int SubMenuSqId { set; get; }
        [StringLength(100)]
        public string ItemName { set; get; }
        [StringLength(100)]
        public string TableName { set; get; }
    }
}
