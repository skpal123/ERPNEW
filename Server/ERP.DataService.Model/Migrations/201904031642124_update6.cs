namespace ERP.DataService.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class update6 : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.tblItemTransaction", "LotNo");
            DropColumn("dbo.tblItemTransaction", "TransactionDate");
        }
        
        public override void Down()
        {
            AddColumn("dbo.tblItemTransaction", "TransactionDate", c => c.DateTime());
            AddColumn("dbo.tblItemTransaction", "LotNo", c => c.String(maxLength: 20));
        }
    }
}
