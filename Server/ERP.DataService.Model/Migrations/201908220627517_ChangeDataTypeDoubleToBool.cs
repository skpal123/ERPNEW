namespace ERP.DataService.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ChangeDataTypeDoubleToBool : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.SalaryItem", "IsPension", c => c.Boolean());
            AlterColumn("dbo.SalaryItem", "IsTax", c => c.Boolean());
            AlterColumn("dbo.SalaryItem", "IsDefault", c => c.Boolean());
            AlterColumn("dbo.SalaryItem", "IsBasic", c => c.Boolean());
            AlterColumn("dbo.SalaryItem", "IsDaily", c => c.Boolean());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.SalaryItem", "IsDaily", c => c.Double());
            AlterColumn("dbo.SalaryItem", "IsBasic", c => c.Double());
            AlterColumn("dbo.SalaryItem", "IsDefault", c => c.Double());
            AlterColumn("dbo.SalaryItem", "IsTax", c => c.Double());
            AlterColumn("dbo.SalaryItem", "IsPension", c => c.Double());
        }
    }
}
