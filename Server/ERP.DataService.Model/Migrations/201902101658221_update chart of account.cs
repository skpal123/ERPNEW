namespace ERP.DataService.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class updatechartofaccount : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.tblAccountParentChildRelation", "ParentGroupId", c => c.Int());
            AlterColumn("dbo.tblAccountParentChildRelation", "ParentLevelId", c => c.Int());
            AlterColumn("dbo.tblAccountParentChildRelation", "ChildGroupId", c => c.Int());
            AlterColumn("dbo.tblAccountParentChildRelation", "ParentAccId", c => c.Int());
            AlterColumn("dbo.tblAccountParentChildRelation", "ChildAccId", c => c.Int());
            AlterColumn("dbo.tblAccountParentChildRelation", "ChildLevelId", c => c.Int());
            AlterColumn("dbo.tblAccount", "GroupId", c => c.Int());
            AlterColumn("dbo.tblAccount", "LevelId", c => c.Int());
            AlterColumn("dbo.tblAccount", "AccId", c => c.Int());
            AlterColumn("dbo.tblAccount", "CloseingStatus", c => c.Boolean());
            AlterColumn("dbo.tblAccount", "IsProfitLoss", c => c.Boolean());
            AlterColumn("dbo.tblAccount", "IsLeaf", c => c.Boolean());
            AlterColumn("dbo.tblAccount", "IsReciptsPayment", c => c.Boolean());
            AlterColumn("dbo.tblAccount", "HasSubLedger", c => c.Boolean());
            AlterColumn("dbo.tblAccount", "PackageId", c => c.Int());
            AlterColumn("dbo.tblAccount", "IsSale", c => c.Boolean());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.tblAccount", "IsSale", c => c.Boolean(nullable: false));
            AlterColumn("dbo.tblAccount", "PackageId", c => c.Int(nullable: false));
            AlterColumn("dbo.tblAccount", "HasSubLedger", c => c.Boolean(nullable: false));
            AlterColumn("dbo.tblAccount", "IsReciptsPayment", c => c.Boolean(nullable: false));
            AlterColumn("dbo.tblAccount", "IsLeaf", c => c.Boolean(nullable: false));
            AlterColumn("dbo.tblAccount", "IsProfitLoss", c => c.Boolean(nullable: false));
            AlterColumn("dbo.tblAccount", "CloseingStatus", c => c.Boolean(nullable: false));
            AlterColumn("dbo.tblAccount", "AccId", c => c.Int(nullable: false));
            AlterColumn("dbo.tblAccount", "LevelId", c => c.Int(nullable: false));
            AlterColumn("dbo.tblAccount", "GroupId", c => c.Int(nullable: false));
            AlterColumn("dbo.tblAccountParentChildRelation", "ChildLevelId", c => c.Int(nullable: false));
            AlterColumn("dbo.tblAccountParentChildRelation", "ChildAccId", c => c.Int(nullable: false));
            AlterColumn("dbo.tblAccountParentChildRelation", "ParentAccId", c => c.Int(nullable: false));
            AlterColumn("dbo.tblAccountParentChildRelation", "ChildGroupId", c => c.Int(nullable: false));
            AlterColumn("dbo.tblAccountParentChildRelation", "ParentLevelId", c => c.Int(nullable: false));
            AlterColumn("dbo.tblAccountParentChildRelation", "ParentGroupId", c => c.Int(nullable: false));
        }
    }
}
