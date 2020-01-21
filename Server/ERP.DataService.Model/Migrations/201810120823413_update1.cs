namespace ERP.DataService.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class update1 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Permissions", "SubMenu_id", c => c.Guid());
            DropColumn("dbo.Permissions", "Item_d");
            DropColumn("dbo.RolePermissions", "SubMenu_Id");
        }
        
        public override void Down()
        {
            AddColumn("dbo.RolePermissions", "SubMenu_Id", c => c.Guid());
            AddColumn("dbo.Permissions", "Item_d", c => c.Guid());
            DropColumn("dbo.Permissions", "SubMenu_id");
        }
    }
}
