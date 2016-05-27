namespace BenimKredim.EntityFramework.Migrations
{
    using BenimKredim.Model.Entities;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<BenimKredim.EntityFramework.BenimKredimModel>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(BenimKredim.EntityFramework.BenimKredimModel context)
        {
            context.Banks.AddOrUpdate(e => e.Name, new Banks()
            {
                Name = "Akbank",
                IsActive = true,
                InsertByUser = 1,
                InsertDate = DateTime.Now
            }, new Banks()
            {
                Name = "Albaraka",
                IsActive = true,
                InsertByUser = 1,
                InsertDate = DateTime.Now
            }, new Banks()
            {
                Name = "Ziraat",
                IsActive = true,
                InsertByUser = 1,
                InsertDate = DateTime.Now
            });
        }
    }
}
