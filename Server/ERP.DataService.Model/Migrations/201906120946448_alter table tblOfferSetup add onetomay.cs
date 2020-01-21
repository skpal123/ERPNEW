namespace ERP.DataService.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class altertabletblOfferSetupaddonetomay : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.tblOfferSetup", "IsOneToMany", c => c.Boolean());
        }
        
        public override void Down()
        {
            DropColumn("dbo.tblOfferSetup", "IsOneToMany");
        }
    }
}
