using System;

namespace BenimKredim.Web.Model
{
    public class TasitKredisiModel
    {
        public string BankaAdi { get; set; }
        public Decimal VadeOrani { get; set; }
        public Decimal VadeliTutar { get; set; }
    }

    public class VadeModel
    {
        public int Vade { get; set; }
    }
}