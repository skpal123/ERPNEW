namespace ERP.DataService.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddingEmployeeGrade : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Designation",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        DesignationId = c.String(maxLength: 20),
                        DesignationName = c.String(maxLength: 150),
                        Description = c.String(maxLength: 1000),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.EmployeeGrade",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        GradeId = c.String(maxLength: 20),
                        GradeName = c.String(maxLength: 150),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.EmployeeSubGrade",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        SubGradeId = c.String(maxLength: 20),
                        SubGradeName = c.String(maxLength: 150),
                        Grade_Id = c.Guid(),
                        EeectiveDate = c.DateTime(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.GradeStepSalaryItem",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        SalaryItemId = c.String(),
                        SalaryItem_Id = c.Guid(),
                        SalaryAmount = c.Double(),
                        HasComparator = c.String(maxLength: 100),
                        ComparatorItemName = c.String(maxLength: 100),
                        ComparatorItem_id = c.Guid(),
                        Grade_id = c.Guid(),
                        GradeStep_id = c.Guid(),
                        SingleItemAmount = c.Double(),
                        Salary_id = c.Guid(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.SalaryItem",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        ItemId = c.String(maxLength: 20),
                        ItemName = c.String(maxLength: 150),
                        ItemType = c.String(maxLength: 100),
                        ItemTypeName = c.String(maxLength: 100),
                        IsPension = c.Double(),
                        IsTax = c.Double(),
                        IsDefault = c.Double(),
                        IsBasic = c.Double(),
                        IsDaily = c.Double(),
                        Percentage = c.String(),
                        OperatorString = c.String(maxLength: 20),
                        DefaultAmount = c.Double(),
                        IsLoan = c.Boolean(),
                        IsLeave = c.Boolean(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.SalaryItem");
            DropTable("dbo.GradeStepSalaryItem");
            DropTable("dbo.EmployeeSubGrade");
            DropTable("dbo.EmployeeGrade");
            DropTable("dbo.Designation");
        }
    }
}
