namespace ERP.DataService.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddIsReadOnly : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.tblUserFormControl", "IsReadOnly", c => c.Boolean());
        }
        
        public override void Down()
        {
            DropColumn("dbo.tblUserFormControl", "IsReadOnly");
        }
    }
}
