namespace ERP.DataService.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addingbranchandconfigurationtable : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.tblBranchConfiguration",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        OrgBrachCode = c.String(maxLength: 200),
                        Branch_Id = c.Guid(nullable: false),
                        OrgBrachId = c.String(maxLength: 200),
                        CurrentDate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.tblBranch",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        BranchName = c.String(maxLength: 200),
                        BranchId = c.String(),
                        BranchCode = c.String(maxLength: 200),
                        OpeningDate = c.DateTime(nullable: false),
                        Location = c.String(maxLength: 200),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.tblBranch");
            DropTable("dbo.tblBranchConfiguration");
        }
    }
}
