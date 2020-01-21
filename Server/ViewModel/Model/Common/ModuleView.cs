using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel.Model
{
    public class ModuleView
    {
        public Guid Id { get; set; }
        public string Name { set; get; }
        public string RouterPath { set; get; }
        public int SequenceId { set; get; }
        public List<MenuView> Menus { set; get; }
    }
}
