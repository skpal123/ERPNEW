namespace ERP.DataService.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addingrouterpath : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Menus", "RouterPath", c => c.String(maxLength: 50));
            AddColumn("dbo.Modules", "RouterPath", c => c.String(maxLength: 50));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Modules", "RouterPath");
            DropColumn("dbo.Menus", "RouterPath");
        }
    }
}
