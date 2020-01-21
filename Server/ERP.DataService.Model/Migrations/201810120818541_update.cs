namespace ERP.DataService.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class update : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.RolePermissions", "SubMenu_Id", c => c.Guid());
        }
        
        public override void Down()
        {
            DropColumn("dbo.RolePermissions", "SubMenu_Id");
        }
    }
}
