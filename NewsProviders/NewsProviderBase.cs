using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace NewsProviders
{
    public abstract class NewsProviderBase
    {
        public abstract IEnumerable<NewsItem> GetNewsItemsFromStream(Stream documentStream);

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
