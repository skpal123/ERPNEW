namespace ERP.DataService.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class changestringlength : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.tblOfferSetup", "OfferName", c => c.String(maxLength: 1500));
            AlterColumn("dbo.tblOfferSetup", "OfferId", c => c.String(maxLength: 30));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.tblOfferSetup", "OfferId", c => c.String());
            AlterColumn("dbo.tblOfferSetup", "OfferName", c => c.String());
        }
    }
}
