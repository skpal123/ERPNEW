namespace ERP.DataService.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class update2 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Menus", "module_Id", "dbo.Modules");
            DropIndex("dbo.Menus", new[] { "module_Id" });
            CreateTable(
                "dbo.UserPermession",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        User_Id = c.Guid(nullable: false),
                        Role_Id = c.Guid(),
                        Permission_Id = c.Guid(),
                        Branch_Id = c.Guid(),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.SubMenus", "ItemName", c => c.String(maxLength: 100));
            AddColumn("dbo.SubMenus", "TableName", c => c.String(maxLength: 100));
            AlterColumn("dbo.Menus", "Module_Id", c => c.Guid(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Menus", "Module_Id", c => c.Guid());
            DropColumn("dbo.SubMenus", "TableName");
            DropColumn("dbo.SubMenus", "ItemName");
            DropTable("dbo.UserPermession");
            CreateIndex("dbo.Menus", "module_Id");
            AddForeignKey("dbo.Menus", "module_Id", "dbo.Modules", "Id");
        }
    }
}
