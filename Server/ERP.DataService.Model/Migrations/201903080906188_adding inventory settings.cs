namespace ERP.DataService.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addinginventorysettings : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.tblCategory",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        CategoryId = c.String(maxLength: 20),
                        CategoryName = c.String(maxLength: 150),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.tblInventoryItem",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        ItemId = c.String(maxLength: 20),
                        ItemCode = c.String(maxLength: 20),
                        ItemName = c.String(maxLength: 150),
                        Category_Id = c.Guid(),
                        SubCategory_Id = c.Guid(),
                        UnitId = c.Guid(),
                        Ledger_Id = c.Guid(),
                        SubLedger_Id = c.Guid(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.tblItemLocation",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        LocationId = c.String(maxLength: 20),
                        LocationName = c.String(maxLength: 150),
                        Description = c.String(maxLength: 1000),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.tblSubCategory",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        SubCategoryId = c.String(maxLength: 20),
                        Category_Id = c.Guid(),
                        SubCategoryName = c.String(maxLength: 150),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.tblUnit",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        UnitName = c.String(maxLength: 20),
                        Description = c.String(maxLength: 1000),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.tblUnit");
            DropTable("dbo.tblSubCategory");
            DropTable("dbo.tblItemLocation");
            DropTable("dbo.tblInventoryItem");
            DropTable("dbo.tblCategory");
        }
    }
}
