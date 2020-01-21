namespace ERP.DataService.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class changeformater : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.tblCodeFormater", "Name", c => c.String(maxLength: 50));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.tblCodeFormater", "Name", c => c.String(maxLength: 30));
        }
    }
}
