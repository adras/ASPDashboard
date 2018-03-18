using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace NewsProviders
{
    /// <summary>
    /// Base class to implement a news provider which fetches news articles composed of a title/link/teaser from a web site
    /// </summary>
    public abstract class NewsProviderBase
    {
        /// <summary>
        /// Fetches a list of <see cref="NewsItem"/> from the given stream
        /// </summary>
        /// <param name="documentStream">Stream to fetch <see cref="NewsItem"/> from</param>
        /// <returns>List of <see cref="NewsItem"/></returns>
        public abstract IEnumerable<NewsItem> GetNewsItemsFromStream(Stream documentStream);

        /// <summary>
        /// Fetches a list of <see cref="NewsItem"/> from the given url using a <see cref="WebClient"/>
        /// </summary>
        /// <param name="url">url to fetch <see cref="NewsItem"/> from</param>
        /// <returns>List of <see cref="NewsItem"/></returns>
        public virtual IEnumerable<NewsItem> GetNewsItemsFromUrl(string url)
        {
            using (WebClient client = new WebClient())
            {
                Stream documentStream = client.OpenRead(url);
                return GetNewsItemsFromStream(documentStream);
            }
        }
    }
}
