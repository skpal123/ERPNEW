namespace ERP.DataService.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addManyToOneInOfferSetup : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.tblOfferSetup", "IsManyToOne", c => c.Boolean());
        }
        
        public override void Down()
        {
            DropColumn("dbo.tblOfferSetup", "IsManyToOne");
        }
    }
}
