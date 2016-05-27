using BenimKredim.EntityFramework;
using BenimKredim.Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleForDbTest
{
    class Program
    {
        static void Main(string[] args)
        {
            using(var db  = new BenimKredimModel())
            {
                try
                {

                
                Banks bank = new Banks() { Name = "Garanti", InsertByUser = 1, InsertDate = DateTime.Now };
                db.Banks.Add(bank);

                db.SaveChanges();

                }
                catch (Exception)
                {

                    throw;
                }

            }
        }
    }
}
