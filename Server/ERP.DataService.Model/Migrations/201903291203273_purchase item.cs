namespace ERP.DataService.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class purchaseitem : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.tblGroupItem",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        TransactionId = c.String(maxLength: 20),
                        TransactionType = c.String(maxLength: 20),
                        Quantity = c.Int(nullable: false),
                        TotalAmount = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Vat = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Tax = c.Decimal(nullable: false, precision: 18, scale: 2),
                        DiscountRate = c.Decimal(nullable: false, precision: 18, scale: 2),
                        DiscountAmount = c.Decimal(nullable: false, precision: 18, scale: 2),
                        NetPayableAmount = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Group_Id = c.Guid(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.tblItemTransaction",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        TransactionId = c.String(maxLength: 20),
                        Reason = c.String(maxLength: 20),
                        TransactionType = c.String(maxLength: 20),
                        Quantity = c.Int(nullable: false),
                        UnitCost = c.Decimal(nullable: false, precision: 18, scale: 2),
                        UnitSale = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Vat = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Tax = c.Decimal(nullable: false, precision: 18, scale: 2),
                        DiscountAmount = c.Decimal(nullable: false, precision: 18, scale: 2),
                        SerialNo = c.String(),
                        LotNo = c.String(maxLength: 20),
                        ChalanNo = c.String(maxLength: 20),
                        InvoiceNo = c.String(maxLength: 20),
                        Comments = c.String(maxLength: 1000),
                        TransactionDate = c.DateTime(),
                        GrvNo = c.String(maxLength: 20),
                        Item_Id = c.Guid(),
                        Location_Id = c.Guid(),
                        Supplier_Id = c.Guid(),
                        GrvDate = c.DateTime(nullable: false),
                        Approver_Id = c.Guid(),
                        Ledger_Id = c.Guid(),
                        SubLedger_Id = c.Guid(),
                        PaymentMode = c.Int(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.tblItemTransaction");
            DropTable("dbo.tblGroupItem");
        }
    }
}
