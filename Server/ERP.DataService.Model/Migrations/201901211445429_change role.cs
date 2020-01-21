namespace ERP.DataService.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class changerole : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Roles", "Description", c => c.String(maxLength: 500));
            AlterColumn("dbo.Roles", "Status", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Roles", "Status", c => c.String());
            DropColumn("dbo.Roles", "Description");
        }
    }
}
