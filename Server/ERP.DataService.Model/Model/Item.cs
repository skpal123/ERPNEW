using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.DataService.Model.Model
{
    public class Item
    {
        [Key]
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public string Id { set; get; }
        [StringLength(200)]
        public string Name { set; get; }
        [StringLength(200)]
        public string RouterPath { set; get; }
        public string SubMenu_Id { set; get; }
    }
}
