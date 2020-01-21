namespace ERP.DataService.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addindTable : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Department",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 100, unicode: false),
                        DepartmentId = c.String(maxLength: 20),
                        DepartmentName = c.String(maxLength: 150),
                        Description = c.String(maxLength: 1000),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.EducationLevel",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 100, unicode: false),
                        LevelId = c.String(maxLength: 20),
                        LevelName = c.String(maxLength: 150),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.LeaveType",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 100, unicode: false),
                        LeaveTypeId = c.String(maxLength: 20),
                        LeaveTypeName = c.String(maxLength: 150),
                        IsPaid = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Occupation",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 100, unicode: false),
                        OccupationId = c.String(maxLength: 20),
                        OccupationName = c.String(maxLength: 150),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Occupation");
            DropTable("dbo.LeaveType");
            DropTable("dbo.EducationLevel");
            DropTable("dbo.Department");
        }
    }
}
