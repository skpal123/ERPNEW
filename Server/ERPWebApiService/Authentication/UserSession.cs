using ERP.DataService.Model.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ERPWebApiService.Authentication
{
    public class UserSession:BasicSession
    {
        public UserInfo User { get; private set; }
        public string SelectedBranchId { get; set; }
        public Int32? SelectedPackageId { get; set; }
        public Int32? SelectedLevelId { get; set; }
        public string SelectedProjectId { get; set; }
        public string SelectedCustomUnitId { get; set; }
        public string SelectedBranchCode { get; set; }
        public DateTime? CurrentDate { get; set; }
        public Func<ICollection<IAccessible>> GetAccessibles;

        private ICollection<IAccessible> accessibles;
        public UserSession()
        {

        }
        public UserSession(UserInfo user)
            : base()
        {
            User = user;
        }

        public UserSession(UserSession session)
            : base(session)
        {
            this.User = session.User;
            this.Accessibles = session.Accessibles;
        }
        public ICollection<IAccessible> SelectedAccessibles { get { return this.Accessibles.Where(acc => acc.Selected).ToList(); } }

        public ICollection<IAccessible> Accessibles
        {
            get
            {
                if (this.accessibles == null)
                {
                    // Lazy loading of accessibles, the application need to make sure everything required is loaded when it is trying to read accessible objects.
                    this.accessibles = this.GetAccessibles();
                }

                return this.accessibles;
            }

            set
            {
                this.accessibles = value;
            }
        }
    }
}