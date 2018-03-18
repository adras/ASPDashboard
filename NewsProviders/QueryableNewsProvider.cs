using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace NewsProviders
{
    /// <summary>
    /// Implementation of <see cref="IQueryable"/> to provide a set of news articles based on a given provider
    /// </summary>
    public class QueryableNewsProvider : IQueryable<NewsItem>
    {
        // See https://msdn.microsoft.com/en-us/library/bb546158.aspx

        IEnumerable<NewsItem> newsItems;
        Expression expression;
        IQueryProvider provider;

        /// <summary>
        /// Gets the ElementType of items this class provides which is typeof(NewsItem)
        /// </summary>
        public Type ElementType => typeof(NewsItem);

        /// <summary>
        /// Gets or sets the Provider
        /// </summary>
        public IQueryProvider Provider { get => provider; private set => provider = value; }

        /// <summary>
        /// Gets or sets the Expression to use
        /// </summary>
        public Expression Expression { get => expression; private set => expression = value; }

        public IEnumerator<NewsItem> GetEnumerator()
        {
            return newsItems.GetEnumerator();
        }

        /// <summary>
        /// Creates a new instance of <see cref="QueryableNewsProvider"/> based on the given provider and stream
        /// </summary>
        /// <param name="newsProvider">NewsProvider to use</param>
        /// <param name="documentStream">Stream to fetch articles from</param>
        public QueryableNewsProvider(NewsProviderBase newsProvider, Stream documentStream)
        {
            this.newsItems = newsProvider.GetNewsItemsFromStream(documentStream);
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return newsItems.GetEnumerator();
        }
    }
}
