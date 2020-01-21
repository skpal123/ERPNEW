namespace ERP.DataService.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class changeoffertable : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Offer", "DiscountRate", c => c.Boolean());
            AddColumn("dbo.Offer", "IsOneToMany", c => c.Boolean(nullable: false));
            AddColumn("dbo.Offer", "IsManyToOne", c => c.Boolean(nullable: false));
            AddColumn("dbo.Offer", "IsManyToMany", c => c.Boolean(nullable: false));
            DropColumn("dbo.ProductOfferMaster", "IsSingle");
            DropColumn("dbo.ProductOfferMaster", "IsOneToMany");
            DropColumn("dbo.ProductOfferMaster", "IsManyToOne");
            DropColumn("dbo.ProductOfferMaster", "DiscountRate");
        }
        
        public override void Down()
        {
            AddColumn("dbo.ProductOfferMaster", "DiscountRate", c => c.Decimal(precision: 18, scale: 2));
            AddColumn("dbo.ProductOfferMaster", "IsManyToOne", c => c.Boolean());
            AddColumn("dbo.ProductOfferMaster", "IsOneToMany", c => c.Boolean());
            AddColumn("dbo.ProductOfferMaster", "IsSingle", c => c.Boolean());
            DropColumn("dbo.Offer", "IsManyToMany");
            DropColumn("dbo.Offer", "IsManyToOne");
            DropColumn("dbo.Offer", "IsOneToMany");
            DropColumn("dbo.Offer", "DiscountRate");
        }
    }
}
