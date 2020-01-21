namespace ERP.DataService.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addsettingMethod : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.tblSettingSellPrice", "SellingMethod", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.tblSettingSellPrice", "SellingMethod");
        }
    }
}
