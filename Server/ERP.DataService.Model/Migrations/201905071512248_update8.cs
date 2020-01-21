namespace ERP.DataService.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class update8 : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.tblPartyTransaction", "PaidAmount", c => c.Decimal(nullable: false, precision: 18, scale: 2));
            AlterColumn("dbo.tblSupplierTransaction", "PaidAmount", c => c.Decimal(nullable: false, precision: 18, scale: 2));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.tblSupplierTransaction", "PaidAmount", c => c.Guid());
            AlterColumn("dbo.tblPartyTransaction", "PaidAmount", c => c.Guid());
        }
    }
}
