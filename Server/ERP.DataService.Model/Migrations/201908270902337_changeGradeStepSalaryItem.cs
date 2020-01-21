namespace ERP.DataService.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class changeGradeStepSalaryItem : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.GradeStepSalaryItem", "ComparatorString", c => c.String(maxLength: 100));
        }
        
        public override void Down()
        {
            DropColumn("dbo.GradeStepSalaryItem", "ComparatorString");
        }
    }
}
