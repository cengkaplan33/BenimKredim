using BenimKredim.Common.Enums;
using BenimKredim.EntityFramework;
using BenimKredim.Web.Model;
using System.Linq;

namespace BenimKredim.Web.Services
{
    public class KonutKredisiSearchRequest : ServiceRequest
    {
        public int Vade { get; set; }
        public int Tutar { get; set; }
    }

    public partial class KonutKredisiService
    {
        public ListResponse<KonutKredisiModel> List(KonutKredisiSearchRequest request)
        {
            ListResponse<KonutKredisiModel> response = new ListResponse<KonutKredisiModel>();

            if (request.Vade == 0 || request.Tutar == 0)
                return response;


            using (var db = new BenimKredimModel())
            {
                response.Entities = db.BankCredits.Where(x => x.CreditTypeId == (int)BankCreditType.Morgage & x.InstalmentCount == request.Vade)
                    .Select(x => new KonutKredisiModel()
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
                response.Entities = db.BankCredits.Where(x => x.CreditTypeId == (int)BankCreditType.Morgage)
                    .Select(x => new VadeModel { Vade = x.InstalmentCount })
                    .Distinct().OrderBy(x => x.Vade)
                    .ToList();

                response.TotalCount = response.Entities.Count();
            }

            return response;
        }

    }
}