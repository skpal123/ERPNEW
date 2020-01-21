namespace ERP.DataService.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddIsreadOnlyIsAutoCode : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.tblFormInfo", "IsAutoCode", c => c.Boolean());
            AddColumn("dbo.tblFormInfo", "IsReadOnly", c => c.Boolean());
        }
        
        public override void Down()
        {
            DropColumn("dbo.tblFormInfo", "IsReadOnly");
            DropColumn("dbo.tblFormInfo", "IsAutoCode");
        }
    }
}
