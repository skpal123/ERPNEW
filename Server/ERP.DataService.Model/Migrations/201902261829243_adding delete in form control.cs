namespace ERP.DataService.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addingdeleteinformcontrol : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.tblUserFormControl", "IsDelete", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.tblUserFormControl", "IsDelete");
        }
    }
}
