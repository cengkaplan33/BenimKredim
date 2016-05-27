//using System.Collections.Generic;
//using Surat.Data;

//namespace Surat.Site.Services
//{
//    public class CsvExportOptions
//    {
//        public List<string> Columns { get; set; }
//        public Dictionary<string, string> ColumnCaptions { get; set; }
//        public int TimezoneOffset { get; set; }

//        public List<string> GetColumnCaptions(Row row)
//        {
//            var columnCaptions = new List<string>();
//            var clientCaptions = ColumnCaptions;
//            foreach (var column in Columns)
//            {
//                string caption;
//                if (clientCaptions == null ||
//                    !clientCaptions.TryGetValue(column, out caption))
//                {
//                    var field = row.FindField(column);
//                    if (field != null)
//                        caption = field.Title;
//                    else
//                        caption = column;
//                }
//                columnCaptions.Add(caption);
//            }
//            return columnCaptions;
//        }
//    }
//}