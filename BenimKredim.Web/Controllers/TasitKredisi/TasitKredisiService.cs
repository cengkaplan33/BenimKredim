using BenimKredim.Common.Enums;
using BenimKredim.EntityFramework;
using BenimKredim.Web.Model;
using System.Linq;

namespace BenimKredim.Web.Services
{
    public class TasitKredisiSearchRequest : ServiceRequest
    {
        public int Vade { get; set; }
        public int Tutar { get; set; }
    }

    public partial class TasitKredisiService
    {
        public ListResponse<TasitKredisiModel> List(TasitKredisiSearchRequest request)
        {
            ListResponse<TasitKredisiModel> response = new ListResponse<TasitKredisiModel>();

            if (request.Vade == 0 || request.Tutar == 0)
                return response;


            using (var db = new BenimKredimModel())
            {
                response.Entities = db.BankCredits.Where(x => x.CreditTypeId == (int)BankCreditType.Car & x.InstalmentCount == request.Vade)
                    .Select(x => new TasitKredisiModel()
                    {
                        BankaAdi = x.Bank.Name,
                        VadeOrani = x.ProfitRate,
                        VadeliTutar = (request.Tutar + request.Tutar * x.ProfitRate)
                    })
                    .ToList();
            }

            return response;
        }

        public ListResponse<VadeModel> VadeListesi()
        {
            ListResponse<VadeModel> response = new ListResponse<VadeModel>();

            using (var db = new BenimKredimModel())
            {
                response.Entities = db.BankCredits.Where(x => x.CreditTypeId == (int)BankCreditType.Car)
                    .Select(x => new VadeModel { Vade = x.InstalmentCount })
                    .Distinct().OrderBy(x => x.Vade)
                    .ToList();

                response.TotalCount = response.Entities.Count();
            }

            return response;
        }

    }
}