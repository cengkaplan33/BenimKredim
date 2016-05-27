//using System;
//using System.Collections.Generic;
//using Surat.Data;
//using Surat.Script.FilterPanel;

//namespace BenimKredim.Web.Services
//{
//    public static class QueryHelper
//    {
//        public static SqlSelect ApplySort(this SqlSelect query, string sort, bool descending)
//        {
//            if (query == null)
//                throw new ArgumentNullException("query");

//            sort = sort.TrimToNull();

//            if (sort != null)
//            {
//                string expr = query.GetExpression(sort);
//                if (expr != null)
//                    query.FieldsByNone().OrderByFirst(expr, descending);
//            }

//            return query;
//        }

//        public static SqlSelect ApplySort(this SqlSelect query, SortBy sortBy)
//        {
//            if (sortBy != null)
//                return ApplySort(query, sortBy.Field, sortBy.Descending);

//            return query;
//        }

//        public static SqlSelect ApplySort(this SqlSelect query, IList<SortBy> sortByList, params SortBy[] defaultSortBy)
//        {
//            if (sortByList == null || sortByList.Count == 0)
//                sortByList = defaultSortBy;

//            if (sortByList != null)
//                for (var i = sortByList.Count - 1; i >= 0; i--)
//                {
//                    var sortBy = sortByList[i];
//                    if (sortBy != null)
//                        ApplySort(query, sortBy.Field, sortBy.Descending);
//                }

//            return query;
//        }

//        public static SqlSelect ApplySkipTakeAndCount(this SqlSelect query, int skip, int take)
//        {
//            query.Limit(skip, take);
//            if (query.Take() > 0)
//                query.CountRecords = true;
//            return query;
//        }

//        public static SqlSelect ApplyContainsText(this SqlSelect query, string containsText,
//            Field idField, params Filter[] fields)
//        {
//            var flt = GetContainsTextFilter(containsText, idField, fields);
//            query.Where(flt);
//            return query;
//        }

//        public static Filter GetContainsTextFilter(string containsText, int joinIndex, params Field[] fields)
//        {
//            containsText = containsText.TrimToNull();
//            if (containsText != null)
//            {
//                var flt = new Filter();
//                foreach (var field in fields)
//                    flt |= new Filter(0, field).Contains(containsText);
//                flt = ~(flt);
//                return flt;
//            }

//            return null;
//        }

//        public static Filter GetContainsTextFilter(string containsText, Field idField, params Filter[] fields)
//        {
//            Filter ctFilter = GetContainsTextFilter(containsText, fields);
//            if (idField == null)
//                return ctFilter;

//            containsText = containsText.TrimToNull();
//            if (containsText == null)
//                return ctFilter;

//            Int64 idValue;
//            if (Int64.TryParse(containsText, out idValue))
//                if (Object.ReferenceEquals(null, ctFilter) || ctFilter.IsEmpty)
//                    ctFilter = new Filter(0, idField) == idValue;
//                else
//                    ctFilter = ~(new Filter(0, idField) == idValue | ~(ctFilter));

//            return ctFilter;
//        }

//        public static Filter GetContainsTextFilter(string containsText, params Filter[] fields)
//        {
//            containsText = containsText.TrimToNull();
//            if (containsText != null && fields.Length > 0)
//            {
//                var flt = new Filter();
//                foreach (var field in fields)
//                    flt |= field.ContainsIn(containsText);
//                flt = ~(flt);

//                return flt;
//            }
//            return null;
//        }

//        public static SqlSelect ApplyFilters(this SqlSelect query, ICollection<FilterLine> lines, FilterFields filterFields,
//            IDictionary<string, string> fieldExpressions = null, Row row = null, Func<FilterLine, Filter> process = null)
//        {
//            if (lines != null &&
//                lines.Count > 0)
//            {
//                string where = FilterLine.ToWhereString(query, lines, filterFields, fieldExpressions, row, process);
//                if (!where.IsEmptyOrNull())
//                    query.Where(where);
//            }
//            return query;
//        }
//    }
//}