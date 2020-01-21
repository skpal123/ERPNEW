namespace ERP.DataService.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addingforeignkey : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.ApplicatonAccessLogs",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        User_Id = c.Guid(),
                        Session_Id = c.Guid(),
                        LoginDate = c.DateTime(),
                        Logout = c.DateTime(),
                        UserName = c.String(maxLength: 20),
                        Password = c.String(maxLength: 200),
                        LoginIp = c.String(maxLength: 20),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.PasswordChangeHistories",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        User_Id = c.Guid(),
                        Branch_Id = c.Guid(),
                        Password = c.String(maxLength: 200),
                        PrevPassword = c.String(maxLength: 200),
                        PasswordChangeDate = c.DateTime(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.SessionManagements",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        User_Id = c.Guid(),
                        Session_Id = c.Guid(),
                        Login_Date = c.DateTime(),
                        UserId = c.String(maxLength: 20),
                        UserName = c.String(maxLength: 20),
                        Password = c.String(maxLength: 200),
                        LoginIp = c.String(maxLength: 20),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateIndex("dbo.Menus", "module_Id");
            AddForeignKey("dbo.Menus", "module_Id", "dbo.Modules", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Menus", "module_Id", "dbo.Modules");
            DropIndex("dbo.Menus", new[] { "module_Id" });
            DropTable("dbo.SessionManagements");
            DropTable("dbo.PasswordChangeHistories");
            DropTable("dbo.ApplicatonAccessLogs");
        }
    }
}
