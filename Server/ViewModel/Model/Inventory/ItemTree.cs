using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel.Model.Inventory
{
    public class ItemTree
    {
        public string Name { set; get; }
        public bool Status { set; get; }
        public string Id { set; get; }
        public bool Checked { set; get; }
        public bool IsClicked { set; get; }
        public bool IsLeaf { set; get; }
        public int Level { set; get; }
        public List<ItemTree> Children { set; get; }
    }
}
