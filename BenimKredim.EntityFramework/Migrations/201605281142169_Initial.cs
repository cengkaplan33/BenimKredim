namespace BenimKredim.EntityFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.BankCredits",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        BankId = c.Int(nullable: false),
                        CreditTypeId = c.Int(nullable: false),
                        ProfitRate = c.Decimal(nullable: false, precision: 18, scale: 2),
                        InstalmentCount = c.Int(nullable: false),
                        InsertByUser = c.Int(nullable: false),
                        InsertDate = c.DateTime(nullable: false),
                        UpdateByUser = c.Int(),
                        UpdateDate = c.DateTime(),
                        IsActive = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Banks", t => t.BankId, cascadeDelete: true)
                .Index(t => t.BankId);
            
            CreateTable(
                "dbo.Banks",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(maxLength: 40),
                        InsertByUser = c.Int(nullable: false),
                        InsertDate = c.DateTime(nullable: false),
                        UpdateByUser = c.Int(),
                        UpdateDate = c.DateTime(),
                        IsActive = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.Name);
            
            CreateTable(
                "dbo.SearchLogs",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        IP = c.String(maxLength: 40),
                        Parameters = c.String(maxLength: 2000),
                        InsertByUser = c.Int(nullable: false),
                        InsertDate = c.DateTime(nullable: false),
                        UpdateByUser = c.Int(),
                        UpdateDate = c.DateTime(),
                        IsActive = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.IP);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.BankCredits", "BankId", "dbo.Banks");
            DropIndex("dbo.SearchLogs", new[] { "IP" });
            DropIndex("dbo.Banks", new[] { "Name" });
            DropIndex("dbo.BankCredits", new[] { "BankId" });
            DropTable("dbo.SearchLogs");
            DropTable("dbo.Banks");
            DropTable("dbo.BankCredits");
        }
    }
}
