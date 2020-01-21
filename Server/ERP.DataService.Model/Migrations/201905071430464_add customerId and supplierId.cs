namespace ERP.DataService.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addcustomerIdandsupplierId : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.tblPartyTransaction", "Customer_Id", c => c.Guid());
            AddColumn("dbo.tblSupplierTransaction", "Supplier_Id", c => c.Guid());
        }
        
        public override void Down()
        {
            DropColumn("dbo.tblSupplierTransaction", "Supplier_Id");
            DropColumn("dbo.tblPartyTransaction", "Customer_Id");
        }
    }
}
