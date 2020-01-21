namespace ERP.DataService.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addingsupplierpartyandfanufacture : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Manufactures",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        ManufactureId = c.String(maxLength: 20),
                        ManufactureName = c.String(maxLength: 150),
                        Adress = c.String(maxLength: 150),
                        Country_Id = c.Guid(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.tblParty",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        PartyId = c.String(maxLength: 20),
                        ContactPerson = c.String(maxLength: 150),
                        PartyName = c.String(maxLength: 150),
                        PnoneNo = c.String(maxLength: 20),
                        Email = c.String(maxLength: 100),
                        Address = c.String(maxLength: 200),
                        Ledger_Id = c.Guid(),
                        SubLedger_Id = c.Guid(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.tblSupplier",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        SupplierId = c.String(maxLength: 20),
                        ContactPerson = c.String(maxLength: 150),
                        SupplierName = c.String(maxLength: 150),
                        PnoneNo = c.String(maxLength: 20),
                        Email = c.String(maxLength: 100),
                        Address = c.String(maxLength: 200),
                        Ledger_Id = c.Guid(),
                        SubLedger_Id = c.Guid(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.tblSupplier");
            DropTable("dbo.tblParty");
            DropTable("dbo.Manufactures");
        }
    }
}
