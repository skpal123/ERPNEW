namespace ERP.DataService.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class update7 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.tblItemTransaction", "LotNo", c => c.String(maxLength: 20));
            AddColumn("dbo.tblItemTransaction", "TransactionDate", c => c.DateTime());
            AddColumn("dbo.tblItemTransaction", "Group_Id", c => c.Guid());
            AddColumn("dbo.tblItemTransaction", "Item_Id", c => c.Guid());
            AddColumn("dbo.tblItemTransaction", "Location_Id", c => c.Guid());
        }
        
        public override void Down()
        {
            DropColumn("dbo.tblItemTransaction", "Location_Id");
            DropColumn("dbo.tblItemTransaction", "Item_Id");
            DropColumn("dbo.tblItemTransaction", "Group_Id");
            DropColumn("dbo.tblItemTransaction", "TransactionDate");
            DropColumn("dbo.tblItemTransaction", "LotNo");
        }
    }
}
