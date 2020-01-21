namespace ERP.DataService.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addingsupplierupdate2 : DbMigration
    {
        public override void Up()
        {
            RenameTable(name: "dbo.tbCustomer", newName: "tblCustomer");
        }
        
        public override void Down()
        {
            RenameTable(name: "dbo.tblCustomer", newName: "tbCustomer");
        }
    }
}
