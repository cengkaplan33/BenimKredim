namespace BenimKredim.EntityFramework.Migrations
{
    using BenimKredim.Common.Enums;
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
                Id = 1,
                Name = "Akbank",
                IsActive = true,
                InsertByUser = 1,
                InsertDate = DateTime.Now
            }, new Banks()
            {
                Id = 2,
                Name = "Albaraka",
                IsActive = true,
                InsertByUser = 1,
                InsertDate = DateTime.Now
            }, new Banks()
            {
                Id = 3,
                Name = "Ziraat",
                IsActive = true,
                InsertByUser = 1,
                InsertDate = DateTime.Now
            });

            context.BankCredits.AddOrUpdate(e => e.Id, new BankCredits()
            {
                BankId = 1,
                CreditTypeId = (int)BankCreditType.Morgage,
                InstalmentCount = 12,
                ProfitRate = 0.8m,
                IsActive = true,
                InsertByUser = 1,
                InsertDate = DateTime.Now
            }, new BankCredits()
            {
                BankId = 2,
                CreditTypeId = (int)BankCreditType.Morgage,
                InstalmentCount = 12,
                ProfitRate = 0.9m,
                IsActive = true,
                InsertByUser = 1,
                InsertDate = DateTime.Now
            }, new BankCredits()
            {
                BankId = 3,
                CreditTypeId = (int)BankCreditType.Morgage,
                InstalmentCount = 12,
                ProfitRate = 0.10m,
                IsActive = true,
                InsertByUser = 1,
                InsertDate = DateTime.Now
            },
             new BankCredits()
            {
                BankId = 1,
                CreditTypeId = (int)BankCreditType.Morgage,
                InstalmentCount = 24,
                ProfitRate = 0.10m,
                IsActive = true,
                InsertByUser = 1,
                InsertDate = DateTime.Now
            }, new BankCredits()
            {
                BankId = 2,
                CreditTypeId = (int)BankCreditType.Morgage,
                InstalmentCount = 24,
                ProfitRate = 0.11m,
                IsActive = true,
                InsertByUser = 1,
                InsertDate = DateTime.Now
            }, new BankCredits()
            {
                BankId = 3,
                CreditTypeId = (int)BankCreditType.Morgage,
                InstalmentCount = 24,
                ProfitRate = 0.13m,
                IsActive = true,
                InsertByUser = 1,
                InsertDate = DateTime.Now
            }, new BankCredits()
            {
                BankId = 1,
                CreditTypeId = (int)BankCreditType.Morgage,
                InstalmentCount = 48,
                ProfitRate = 0.15m,
                IsActive = true,
                InsertByUser = 1,
                InsertDate = DateTime.Now
            }, new BankCredits()
            {
                BankId = 2,
                CreditTypeId = (int)BankCreditType.Morgage,
                InstalmentCount = 48,
                ProfitRate = 0.18m,
                IsActive = true,
                InsertByUser = 1,
                InsertDate = DateTime.Now
            }, new BankCredits()
            {
                BankId = 3,
                CreditTypeId = (int)BankCreditType.Morgage,
                InstalmentCount = 48,
                ProfitRate = 0.21m,
                IsActive = true,
                InsertByUser = 1,
                InsertDate = DateTime.Now
            },
                //bireysel kredi  
            new BankCredits()
            {
                BankId = 1,
                CreditTypeId = (int)BankCreditType.Personal,
                InstalmentCount = 12,
                ProfitRate = 0.10m,
                IsActive = true,
                InsertByUser = 1,
                InsertDate = DateTime.Now
            }, new BankCredits()
            {
                BankId = 2,
                CreditTypeId = (int)BankCreditType.Personal,
                InstalmentCount = 12,
                ProfitRate = 0.11m,
                IsActive = true,
                InsertByUser = 1,
                InsertDate = DateTime.Now
            }, new BankCredits()
            {
                BankId = 3,
                CreditTypeId = (int)BankCreditType.Personal,
                InstalmentCount = 12,
                ProfitRate = 0.13m,
                IsActive = true,
                InsertByUser = 1,
                InsertDate = DateTime.Now
            },
             new BankCredits()
            {
                BankId = 1,
                CreditTypeId = (int)BankCreditType.Personal,
                InstalmentCount = 24,
                ProfitRate = 0.10m,
                IsActive = true,
                InsertByUser = 1,
                InsertDate = DateTime.Now
            }, new BankCredits()
            {
                BankId = 2,
                CreditTypeId = (int)BankCreditType.Personal,
                InstalmentCount = 24,
                ProfitRate = 0.15m,
                IsActive = true,
                InsertByUser = 1,
                InsertDate = DateTime.Now
            }, new BankCredits()
            {
                BankId = 3,
                CreditTypeId = (int)BankCreditType.Personal,
                InstalmentCount = 24,
                ProfitRate = 0.16m,
                IsActive = true,
                InsertByUser = 1,
                InsertDate = DateTime.Now
            }, new BankCredits()
            {
                BankId = 1,
                CreditTypeId = (int)BankCreditType.Personal,
                InstalmentCount = 48,
                ProfitRate = 0.18m,
                IsActive = true,
                InsertByUser = 1,
                InsertDate = DateTime.Now
            }, new BankCredits()
            {
                BankId = 2,
                CreditTypeId = (int)BankCreditType.Personal,
                InstalmentCount = 48,
                ProfitRate = 0.24m,
                IsActive = true,
                InsertByUser = 1,
                InsertDate = DateTime.Now
            }, new BankCredits()
            {
                BankId = 3,
                CreditTypeId = (int)BankCreditType.Personal,
                InstalmentCount = 48,
                ProfitRate = 0.21m,
                IsActive = true,
                InsertByUser = 1,
                InsertDate = DateTime.Now
            },
                //taþýt kredisi
            new BankCredits()
            {
                BankId = 1,
                CreditTypeId = (int)BankCreditType.Car,
                InstalmentCount = 12,
                ProfitRate = 0.10m,
                IsActive = true,
                InsertByUser = 1,
                InsertDate = DateTime.Now
            }, new BankCredits()
            {
                BankId = 2,
                CreditTypeId = (int)BankCreditType.Car,
                InstalmentCount = 12,
                ProfitRate = 0.11m,
                IsActive = true,
                InsertByUser = 1,
                InsertDate = DateTime.Now
            }, new BankCredits()
            {
                BankId = 3,
                CreditTypeId = (int)BankCreditType.Car,
                InstalmentCount = 12,
                ProfitRate = 0.13m,
                IsActive = true,
                InsertByUser = 1,
                InsertDate = DateTime.Now
            },
             new BankCredits()
             {
                 BankId = 1,
                 CreditTypeId = (int)BankCreditType.Car,
                 InstalmentCount = 24,
                 ProfitRate = 0.10m,
                 IsActive = true,
                 InsertByUser = 1,
                 InsertDate = DateTime.Now
             }, new BankCredits()
             {
                 BankId = 2,
                 CreditTypeId = (int)BankCreditType.Car,
                 InstalmentCount = 24,
                 ProfitRate = 0.15m,
                 IsActive = true,
                 InsertByUser = 1,
                 InsertDate = DateTime.Now
             }, new BankCredits()
             {
                 BankId = 3,
                 CreditTypeId = (int)BankCreditType.Car,
                 InstalmentCount = 24,
                 ProfitRate = 0.16m,
                 IsActive = true,
                 InsertByUser = 1,
                 InsertDate = DateTime.Now
             }, new BankCredits()
             {
                 BankId = 1,
                 CreditTypeId = (int)BankCreditType.Car,
                 InstalmentCount = 48,
                 ProfitRate = 0.18m,
                 IsActive = true,
                 InsertByUser = 1,
                 InsertDate = DateTime.Now
             }, new BankCredits()
             {
                 BankId = 2,
                 CreditTypeId = (int)BankCreditType.Car,
                 InstalmentCount = 48,
                 ProfitRate = 0.24m,
                 IsActive = true,
                 InsertByUser = 1,
                 InsertDate = DateTime.Now
             }, new BankCredits()
             {
                 BankId = 3,
                 CreditTypeId = (int)BankCreditType.Car,
                 InstalmentCount = 48,
                 ProfitRate = 0.21m,
                 IsActive = true,
                 InsertByUser = 1,
                 InsertDate = DateTime.Now
             }

            );
        }
    }
}
