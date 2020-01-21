namespace ERP.DataService.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addsettingdate : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.tblSettingSellPrice", "SettingDate", c => c.DateTime());
        }
        
        public override void Down()
        {
            DropColumn("dbo.tblSettingSellPrice", "SettingDate");
        }
    }
}
