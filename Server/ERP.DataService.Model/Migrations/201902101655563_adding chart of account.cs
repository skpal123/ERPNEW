namespace ERP.DataService.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addingchartofaccount : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.tblAccountParentChildRelation",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        ParentGroupId = c.Int(nullable: false),
                        ParentLevelId = c.Int(nullable: false),
                        ChildGroupId = c.Int(nullable: false),
                        ParentAccId = c.Int(nullable: false),
                        ChildAccId = c.Int(nullable: false),
                        ChildLevelId = c.Int(nullable: false),
                        ParentAccount_Id = c.Guid(),
                        ChildAccount_Id = c.Guid(),
                        Branch_Id = c.Guid(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.tblAccount",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        GroupId = c.Int(nullable: false),
                        LevelId = c.Int(nullable: false),
                        AccId = c.Int(nullable: false),
                        AccountDescription = c.String(maxLength: 1000),
                        CloseingStatus = c.Boolean(nullable: false),
                        AccountType = c.Int(nullable: false),
                        ManualAccountCode = c.String(maxLength: 20),
                        AutoAccountCode = c.String(maxLength: 20),
                        IsProfitLoss = c.Boolean(nullable: false),
                        IsLeaf = c.Boolean(nullable: false),
                        IsReciptsPayment = c.Boolean(nullable: false),
                        HasSubLedger = c.Boolean(nullable: false),
                        Currency = c.String(maxLength: 20),
                        PackageId = c.Int(nullable: false),
                        IsSale = c.Boolean(nullable: false),
                        BranchId = c.Guid(),
                        Corporate_Id = c.Guid(),
                        ControlLevelId = c.Int(),
                        ControlLevel_Id = c.Guid(),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.tblRoleControl", "FormName", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.tblRoleControl", "FormName");
            DropTable("dbo.tblAccount");
            DropTable("dbo.tblAccountParentChildRelation");
        }
    }
}
