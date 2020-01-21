namespace ERP.DataService.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addingtypeinusercontroltable : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.tblUserFormControl", "Type", c => c.String(maxLength: 100));
        }
        
        public override void Down()
        {
            DropColumn("dbo.tblUserFormControl", "Type");
        }
    }
}
