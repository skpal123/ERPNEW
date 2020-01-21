using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.DataService.Model.Model
{
    [Table("tblSubCategory")]
    public class Subcategory
    {
        [Key]
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public string Id { set; get; }
        [StringLength(20)]
        public string SubCategoryId { set; get; }
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public string Category_Id { set; get; }
        [StringLength(150)]
        public string SubCategoryName { set; get; }
    }
}
