namespace ERP.DataService.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addingsupplierupdate : DbMigration
    {
        public override void Up()
        {
            RenameTable(name: "dbo.tblCustomer", newName: "tblSupplier");
        }
        
        public override void Down()
        {
            RenameTable(name: "dbo.tblSupplier", newName: "tblCustomer");
        }
    }
}
