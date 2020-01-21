namespace ERP.DataService.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addingformcontrol : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.FormControlPermssions",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        Status = c.Boolean(),
                        ControlId = c.Int(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.FormControlPermssions");
        }
    }
}
