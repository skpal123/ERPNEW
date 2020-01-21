using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel.Model
{
    public class AccountParentChildRelationInfo
    {
        public string Id { get; set; }
        public string AccountDescription { set; get; }
        public string AutoAccountCode { set; get; }
        public string ManualAccountCode { set; get; }
        public string AccountId { set; get; }
        public int? AccountType { set; get; }
        public int? ParentGroupId { set; get; }
        public int? ParentLevelId { set; get; }
        public int? ChildGroupId { set; get; }
        public int? ParentAccId { set; get; }
        public int? ChildAccId { set; get; }
        public int? ChildLevelId { set; get; }
        public string ParentAccount_Id { set; get; }
        public string ChildAccount_Id { set; get; }
        public bool? IsLeaf { set; get; }
        public bool? Status { set; get; }
        public bool? IsClicked { set; get; }
        public bool? HasSubleder { set; get; }
        public List<AccountParentChildRelationInfo> Children { set; get; }
    }
}
