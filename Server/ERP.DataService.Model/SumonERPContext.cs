using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ERP.DataService.Model.Model;
namespace ERP.DataService.Model
{
    public class SumonERPContext : DbContext
    {
        public SumonERPContext()
            : base("SumonPOSContext")
        {

        }
        public SumonERPContext(string connectionString)
            : base(connectionString)
        {

        }
        public DbSet<UserInfo> UserInfos { set; get; }
        public DbSet<Module> Modules { set; get; }
        public DbSet<Menu> Menus { set; get; }
        public DbSet<SubMenu> SubMenus { set; get; }
        public DbSet<Item> Items { set; get; }
        public DbSet<Permission> Permissions { set; get; }
        public DbSet<Role> Roles { set; get; }
        public DbSet<RolePermission> RolePermissions { set; get; }
        public DbSet<UserPermission> UserPermissions { set; get; }

        public DbSet<PasswordChangeHistory> PasswordChangeHistorys { set; get; }
        public DbSet<SessionManagement> SessionManagements { set; get; }
        public DbSet<ApplicatonAccessLog> ApplicatonAccessLogs { set; get; }
        public DbSet<Branch> Branchs { set; get; }
        public DbSet<BranchConfiguration> BranchConfigurations { set; get; }
        public DbSet<RoleControl> RoleControls { set; get; }
        public DbSet<Account> Accounts { set; get; }
        public DbSet<AccountParentChildRelation> AccountParentChildRelations { set; get; }
        public DbSet<Voucher> Vouchers { set; get; }
        public DbSet<VoucherDetails> VoucherDetailList { set; get; }
        public DbSet<FormControlPermssion> FormControlPermssions { set; get; }
        public DbSet<AccountOpening> AccountOpenings { set; get; }
        public DbSet<Subledger> Subledgers { set; get; }
        public DbSet<SubledgerOpening> SubledgerOpenings { set; get; }
        public DbSet<SubledgerTransaction> SubledgerTransactions { set; get; }
        public DbSet<UserFormControl> UserFormControls { set; get; }
        public DbSet<Unit> Units { set; get; }
        public DbSet<ItemName> ItemNames { set; get; }
        public DbSet<Location> Locations { set; get; }
        public DbSet<Category> Categorys { set; get; }
        public DbSet<Subcategory> Subcategorys { set; get; }
        public DbSet<InventoryItem> InventoryItems { set; get; }
        public DbSet<Supplier> Suppliers { set; get; }
        public DbSet<Party> Partys { set; get; }
        public DbSet<Manufacture> Manufactures { set; get; }
        public DbSet<FormInfo> FormInfos { set; get; }
        public DbSet<GroupItem> GroupItems { set; get; }
        public DbSet<ItemTransaction> ItemTransactions { set; get; }
        public DbSet<Customer> Customers { set; get; }
        public DbSet<SettingSellPrice> SettingSellPrices { set; get; }
        public DbSet<CodeFormater> CodeFormaters { set; get; }
        public DbSet<SupplierTransaction> SupplierTransactions { set; get; }
        public DbSet<PartyTransaction> PartyTransactions { set; get; }
        public DbSet<CustomerSupplierTransactionDetail> CustomerSupplierTransactionDetailsList { set; get; }
        public DbSet<Offer> Offers { set; get; }
        public DbSet<CustomerOffer> CustomerOffers { set; get; }
        public DbSet<ProductOfferMaster> ProductOfferMasters { set; get; }
        public DbSet<Designation> Designations { set; get; }
        public DbSet<EmployeeGrade> EmployeeGrades { set; get; }
        public DbSet<EmployeeSubGrade> EmployeeSubGrades { set; get; }
        public DbSet<SalaryItem> SalaryItems { set; get; }
        public DbSet<GradeStepSalaryItem> GradeStepSalaryItems { set; get; }
        public DbSet<EducationLevel> EducationLevels { set; get; }
        public DbSet<Department> Departments { set; get; }
        public DbSet<Occupation> Occupations { set; get; }
        public DbSet<LeaveType> LeaveTypes { set; get; }
    }
}
