namespace ERP.DataService.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class changenatpaidamounttonetpayableamount : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.tblGroupItem", "NetPayableAmount", c => c.Decimal(nullable: false, precision: 18, scale: 2));
            DropColumn("dbo.tblGroupItem", "NetPaidAmount");
        }
        
        public override void Down()
        {
            AddColumn("dbo.tblGroupItem", "NetPaidAmount", c => c.Decimal(nullable: false, precision: 18, scale: 2));
            DropColumn("dbo.tblGroupItem", "NetPayableAmount");
        }
    }
}
