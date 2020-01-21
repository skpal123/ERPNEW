namespace ERP.DataService.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class changeDataTypeDouble2 : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.SalaryItem", "Percentage", c => c.Double());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.SalaryItem", "Percentage", c => c.Double(nullable: false));
        }
    }
}
