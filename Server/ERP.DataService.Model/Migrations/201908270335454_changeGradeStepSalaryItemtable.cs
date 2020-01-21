namespace ERP.DataService.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class changeGradeStepSalaryItemtable : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.GradeStepSalaryItem", "InheritedItem_Id", c => c.String(maxLength: 100, unicode: false));
            AddColumn("dbo.GradeStepSalaryItem", "Percentage", c => c.Double());
            AlterColumn("dbo.GradeStepSalaryItem", "HasComparator", c => c.Boolean());
            DropColumn("dbo.GradeStepSalaryItem", "ComparatorItemName");
            DropColumn("dbo.GradeStepSalaryItem", "ComparatorItem_id");
        }
        
        public override void Down()
        {
            AddColumn("dbo.GradeStepSalaryItem", "ComparatorItem_id", c => c.String(maxLength: 100, unicode: false));
            AddColumn("dbo.GradeStepSalaryItem", "ComparatorItemName", c => c.String(maxLength: 100));
            AlterColumn("dbo.GradeStepSalaryItem", "HasComparator", c => c.String(maxLength: 100));
            DropColumn("dbo.GradeStepSalaryItem", "Percentage");
            DropColumn("dbo.GradeStepSalaryItem", "InheritedItem_Id");
        }
    }
}
