namespace ERP.DataService.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class update3 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Manufactures", "Address", c => c.String(maxLength: 150));
            DropColumn("dbo.Manufactures", "Adress");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Manufactures", "Adress", c => c.String(maxLength: 150));
            DropColumn("dbo.Manufactures", "Address");
        }
    }
}
