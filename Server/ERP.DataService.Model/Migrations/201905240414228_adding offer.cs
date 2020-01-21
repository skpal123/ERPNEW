namespace ERP.DataService.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addingoffer : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Offer",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        ValuableCustomerType_Id = c.Guid(),
                        OfferSetup_Id = c.Guid(),
                        OfferType = c.String(),
                        IsMultiple = c.Boolean(),
                        IsDiscountRate = c.Boolean(),
                        IsSingle = c.Boolean(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.tblOfferSetup",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        Product_Id = c.Guid(),
                        FreeProduct_Id = c.Guid(),
                        DiscountRate = c.Decimal(precision: 18, scale: 2),
                        BundleSize = c.Int(),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.tblUserFormControl", "OrderNo", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.tblUserFormControl", "OrderNo");
            DropTable("dbo.tblOfferSetup");
            DropTable("dbo.Offer");
        }
    }
}
