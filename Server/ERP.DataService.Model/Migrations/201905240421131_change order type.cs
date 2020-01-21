namespace ERP.DataService.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class changeordertype : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.tblUserFormControl", "OrderNo", c => c.Int());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.tblUserFormControl", "OrderNo", c => c.String());
        }
    }
}
