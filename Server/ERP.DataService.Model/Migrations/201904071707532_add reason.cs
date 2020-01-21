namespace ERP.DataService.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addreason : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.tblGroupItem", "Reason", c => c.String(maxLength: 20));
        }
        
        public override void Down()
        {
            DropColumn("dbo.tblGroupItem", "Reason");
        }
    }
}
