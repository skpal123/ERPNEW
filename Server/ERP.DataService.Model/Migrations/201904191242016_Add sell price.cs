namespace ERP.DataService.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Addsellprice : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.tblSettingSellPrice",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        ItemCode = c.String(maxLength: 20),
                        ItemId = c.String(maxLength: 20),
                        PurchaseDate = c.DateTime(),
                        PreviousAmount = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Amount = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Item_Id = c.Guid(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.tblSettingSellPrice");
        }
    }
}
