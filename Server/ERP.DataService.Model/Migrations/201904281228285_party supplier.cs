namespace ERP.DataService.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class partysupplier : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.tblPartyTransaction",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        ChalanNo = c.String(maxLength: 20),
                        InvoiceNo = c.String(maxLength: 20),
                        OrderNo = c.String(maxLength: 20),
                        Group_Id = c.Guid(),
                        PaymentMode = c.Int(),
                        PaymentDate = c.DateTime(),
                        Ledger_Id = c.Guid(),
                        SubLedger_Id = c.Guid(),
                        PaidAmount = c.Guid(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.tblSupplierTransaction",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        ChalanNo = c.String(maxLength: 20),
                        InvoiceNo = c.String(maxLength: 20),
                        OrderNo = c.String(maxLength: 20),
                        Group_Id = c.Guid(),
                        PaymentMode = c.Int(),
                        PaymentDate = c.DateTime(),
                        Ledger_Id = c.Guid(),
                        SubLedger_Id = c.Guid(),
                        PaidAmount = c.Guid(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.tblSupplierTransaction");
            DropTable("dbo.tblPartyTransaction");
        }
    }
}
