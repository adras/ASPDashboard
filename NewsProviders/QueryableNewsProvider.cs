using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace NewsProviders
{
    public class QueryableNewsProvider : IQueryable<NewsItem>
    {
        // See https://msdn.microsoft.com/en-us/library/bb546158.aspx

        IEnumerable<NewsItem> newsItems;
        Expression expression;
        IQueryProvider provider;


        public Type ElementType => typeof(NewsItem);

        public IQueryProvider Provider { get => provider; private set => provider = value; }
        public Expression Expression { get => expression; private set => expression = value; }

        public IEnumerator<NewsItem> GetEnumerator()
        {
            return newsItems.GetEnumerator();
        }

        public QueryableNewsProvider(INewsProvider newsProvider)
        {
            this.newsItems = newsProvider.GetNewsItemFromHtmlDocument();
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return newsItems.GetEnumerator();
        }
    }
}
