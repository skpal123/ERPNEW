namespace ERP.DataService.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addingusercontroltable : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.tblUserFormControl",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(maxLength: 100),
                        LabelName = c.String(maxLength: 200),
                        Autocomplete = c.Boolean(nullable: false),
                        Editable = c.Boolean(nullable: false),
                        IsEnable = c.Boolean(nullable: false),
                        FormName = c.String(maxLength: 100),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.tblUserFormControl");
        }
    }
}
