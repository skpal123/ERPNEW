namespace ERP.DataService.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class changedatatype : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Offer", "DiscountRate", c => c.Double(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Offer", "DiscountRate", c => c.Boolean());
        }
    }
}
