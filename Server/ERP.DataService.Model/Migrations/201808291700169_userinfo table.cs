namespace ERP.DataService.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class userinfotable : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.tblUserInfo",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        User_Id = c.String(maxLength: 20),
                        Password = c.String(maxLength: 20),
                        User_Name = c.String(maxLength: 100),
                        Employee_Id = c.Guid(),
                        Branch_Id = c.Guid(),
                        Status = c.Boolean(nullable: false),
                        User_Level = c.Int(),
                        User_Level_Id = c.Guid(),
                        Role_Id = c.Guid(),
                        passWordCreateDate = c.DateTime(),
                        IsReset = c.Boolean(),
                        AllowedIP = c.String(maxLength: 50),
                        WorkStart = c.String(maxLength: 50),
                        WorkEnd = c.String(maxLength: 50),
                        IsAccessInHoliday = c.Boolean(),
                        HasUserFlexibility = c.Boolean(),
                        TriedLogin = c.Int(),
                        LastIPRange = c.String(maxLength: 50),
                        IsAllowedBackDatedEntry = c.Boolean(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.tblUserInfo");
        }
    }
}
