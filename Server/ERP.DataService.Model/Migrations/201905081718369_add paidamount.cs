namespace ERP.DataService.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addpaidamount : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.tblGroupItem", "PaidAmount", c => c.Decimal(nullable: false, precision: 18, scale: 2));
        }
        
        public override void Down()
        {
            DropColumn("dbo.tblGroupItem", "PaidAmount");
        }
    }
}
