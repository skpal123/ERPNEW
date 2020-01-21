namespace ERP.DataService.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class changecodeformater : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.tblCodeFormater", "MiddleSymbol", c => c.String(maxLength: 10));
        }
        
        public override void Down()
        {
            DropColumn("dbo.tblCodeFormater", "MiddleSymbol");
        }
    }
}
