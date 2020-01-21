namespace ERP.DataService.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addingcustomerupdate : DbMigration
    {
        public override void Up()
        {
            RenameTable(name: "dbo.tblSupplier", newName: "tbCustomer");
        }
        
        public override void Down()
        {
            RenameTable(name: "dbo.tbCustomer", newName: "tblSupplier");
        }
    }
}
