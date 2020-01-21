namespace ERP.DataService.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addingisFirsttransaction : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.tblPartyTransaction", "IsFirstTransaction", c => c.Boolean());
            AddColumn("dbo.tblSupplierTransaction", "IsFirstTransaction", c => c.Boolean());
        }
        
        public override void Down()
        {
            DropColumn("dbo.tblSupplierTransaction", "IsFirstTransaction");
            DropColumn("dbo.tblPartyTransaction", "IsFirstTransaction");
        }
    }
}
