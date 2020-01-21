namespace ERP.DataService.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addrouterpath : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Modules", "RouterPath", c => c.String(maxLength: 50));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Modules", "RouterPath");
        }
    }
}
