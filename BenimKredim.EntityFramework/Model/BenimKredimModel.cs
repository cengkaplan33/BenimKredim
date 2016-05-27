namespace BenimKredim.EntityFramework
{
    using BenimKredim.Model.Entities;
    using System;
    using System.Data.Entity;
    using System.Linq;

    public class BenimKredimModel : DbContext
    {
        // Your context has been configured to use a 'BenimKredimModel' connection string from your application's 
        // configuration file (App.config or Web.config). By default, this connection string targets the 
        // 'BenimKredim.EntityFramework.BenimKredimModel' database on your LocalDb instance. 
        // 
        // If you wish to target a different database and/or database provider, modify the 'BenimKredimModel' 
        // connection string in the application configuration file.
        public BenimKredimModel()
            : base("name=BenimKredimModel")
        {

            Database.SetInitializer<BenimKredimModel>(null);
        }

        // Add a DbSet for each entity type that you want to include in your model. For more information 
        // on configuring and using a Code First model, see http://go.microsoft.com/fwlink/?LinkId=390109.

        // public virtual DbSet<MyEntity> MyEntities { get; set; }

        #region EntityList

        public DbSet<Banks> Banks { get; set; }
        public DbSet<BankCredits> BankCredits { get; set; }
        public DbSet<SearchLogs> SearchLogs { get; set; }

        #endregion
    }

    //public class MyEntity
    //{
    //    public int Id { get; set; }
    //    public string Name { get; set; }
    //}
}