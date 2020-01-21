namespace ERP.DataService.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addInheritedItem : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.SalaryItem", "InheritedItem", c => c.String(maxLength: 100, unicode: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.SalaryItem", "InheritedItem");
        }
    }
}
