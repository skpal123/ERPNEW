namespace ERP.DataService.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class changeoffersetup : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.tblOfferSetup", "OfferName", c => c.String());
            AddColumn("dbo.tblOfferSetup", "OfferId", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.tblOfferSetup", "OfferId");
            DropColumn("dbo.tblOfferSetup", "OfferName");
        }
    }
}
