namespace ERP.DataService.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class changingdeletetocheckbox : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.tblUserFormControl", "IsCheckbox", c => c.Boolean(nullable: false));
            DropColumn("dbo.tblUserFormControl", "IsDelete");
        }
        
        public override void Down()
        {
            AddColumn("dbo.tblUserFormControl", "IsDelete", c => c.Boolean(nullable: false));
            DropColumn("dbo.tblUserFormControl", "IsCheckbox");
        }
    }
}
