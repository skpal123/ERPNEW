namespace ERP.DataService.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ChangeOfferModule : DbMigration
    {
        public override void Up()
        {
            RenameTable(name: "dbo.tblOfferSetup", newName: "ProductOfferMaster");
            CreateTable(
                "dbo.CustomerOffers",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 100, unicode: false),
                        ValuableCustomerType_Id = c.String(maxLength: 100, unicode: false),
                        Offer_Id = c.String(maxLength: 100, unicode: false),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.Offer", "OfferId", c => c.String(maxLength: 30));
            AddColumn("dbo.Offer", "OfferName", c => c.String(maxLength: 100));
            AddColumn("dbo.Offer", "CreatedDate", c => c.DateTime());
            AddColumn("dbo.Offer", "EffectiveDate", c => c.DateTime());
            AddColumn("dbo.Offer", "ExpiredDate", c => c.DateTime());
            AddColumn("dbo.ProductOfferMaster", "Offer_Id", c => c.String(maxLength: 100, unicode: false));
            AlterColumn("dbo.Offer", "OfferType", c => c.String(maxLength: 100));
            DropColumn("dbo.Offer", "ValuableCustomerType_Id");
            DropColumn("dbo.Offer", "OfferSetup_Id");
            DropColumn("dbo.Offer", "IsMultiple");
            DropColumn("dbo.ProductOfferMaster", "OfferName");
            DropColumn("dbo.ProductOfferMaster", "OfferId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.ProductOfferMaster", "OfferId", c => c.String(maxLength: 30));
            AddColumn("dbo.ProductOfferMaster", "OfferName", c => c.String(maxLength: 1500));
            AddColumn("dbo.Offer", "IsMultiple", c => c.Boolean());
            AddColumn("dbo.Offer", "OfferSetup_Id", c => c.String(maxLength: 100, unicode: false));
            AddColumn("dbo.Offer", "ValuableCustomerType_Id", c => c.String(maxLength: 100, unicode: false));
            AlterColumn("dbo.Offer", "OfferType", c => c.String());
            DropColumn("dbo.ProductOfferMaster", "Offer_Id");
            DropColumn("dbo.Offer", "ExpiredDate");
            DropColumn("dbo.Offer", "EffectiveDate");
            DropColumn("dbo.Offer", "CreatedDate");
            DropColumn("dbo.Offer", "OfferName");
            DropColumn("dbo.Offer", "OfferId");
            DropTable("dbo.CustomerOffers");
            RenameTable(name: "dbo.ProductOfferMaster", newName: "tblOfferSetup");
        }
    }
}
