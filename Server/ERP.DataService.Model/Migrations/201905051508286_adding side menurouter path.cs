namespace ERP.DataService.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addingsidemenurouterpath : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Menus", "SideMenuRouterPath", c => c.String(maxLength: 200));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Menus", "SideMenuRouterPath");
        }
    }
}
