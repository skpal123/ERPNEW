namespace ERP.DataService.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addingtransactiondetails : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.tblCustomerSupplierTransactionDetail",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        InvoiceNo = c.String(maxLength: 20),
                        TransactionId = c.String(maxLength: 20),
                        Group_Id = c.Guid(),
                        CustomerTransaction_Id = c.Guid(),
                        SupplierTransaction_Id = c.Guid(),
                        PaymentDate = c.DateTime(),
                        PaidAmount = c.Decimal(nullable: false, precision: 18, scale: 2),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.tblCustomerSupplierTransactionDetail");
        }
    }
}
