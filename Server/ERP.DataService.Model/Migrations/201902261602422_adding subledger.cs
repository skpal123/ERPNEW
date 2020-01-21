namespace ERP.DataService.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addingsubledger : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.tblAccountOpening",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        BranchCode = c.String(maxLength: 6),
                        Branch_Id = c.Guid(),
                        Amount = c.Decimal(precision: 18, scale: 2),
                        OpeningDate = c.DateTime(nullable: false),
                        AutoAccountCode = c.String(maxLength: 20),
                        Account_Id = c.Guid(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.tblSubledgerOpening",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        BranchCode = c.String(maxLength: 6),
                        Branch_Id = c.Guid(),
                        Amount = c.Decimal(precision: 18, scale: 2),
                        OpeningDate = c.DateTime(nullable: false),
                        SubledgerCode = c.String(maxLength: 10),
                        Account_Id = c.Guid(),
                        Subledger_Id = c.Guid(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.tblSubledger",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        SubledgerCode = c.String(maxLength: 6),
                        Account_Id = c.Guid(),
                        Description = c.String(maxLength: 500),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.tblSubledgerTransaction",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        Voucher_Id = c.Guid(),
                        Voucher_Detail_Id = c.Guid(),
                        Account_Id = c.Guid(),
                        Subledger_Id = c.Guid(),
                        Amount = c.Decimal(precision: 18, scale: 2),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.tblSubledgerTransaction");
            DropTable("dbo.tblSubledger");
            DropTable("dbo.tblSubledgerOpening");
            DropTable("dbo.tblAccountOpening");
        }
    }
}
