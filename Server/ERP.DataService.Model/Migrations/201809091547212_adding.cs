namespace ERP.DataService.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class adding : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.tblUserInfo", "LastIPRange2", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.tblUserInfo", "LastIPRange2");
        }
    }
}
