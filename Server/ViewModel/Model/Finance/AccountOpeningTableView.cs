using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel.Model.Finance
{
    public class AccountOpeningTableView
    {
       public Guid Id {set;get;}
       public string Group {set;get;}
       public string AccountDescription {set;get;}
       public decimal? DebitAmount {set;get;}
       public decimal? CreditAmount {set;get;}
       public int? AccountType {set;get;}
       public string AccountId { set; get; }
    }
}
