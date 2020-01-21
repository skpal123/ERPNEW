using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.DataService.Model.Model
{
    public class Manufacture
    {
        [Key]
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public string Id { set; get; }
        [StringLength(20)]
        public string ManufactureId { set; get; }
        [StringLength(150)]
        public string ManufactureName { set; get; }
        [StringLength(150)]
        public string Address { set; get; }
        public string Country_Id { set; get; }
    }
}
