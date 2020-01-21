namespace ERP.DataService.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class update4 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.tblFormInfo",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(maxLength: 100),
                        IsEnable = c.Boolean(),
                        IsValidationActive = c.Boolean(),
                        FormName = c.String(maxLength: 100),
                        IsMinLength = c.Boolean(),
                        IsMaxLength = c.Boolean(),
                        IsEmail = c.Boolean(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.tblFormInfo");
        }
    }
}
