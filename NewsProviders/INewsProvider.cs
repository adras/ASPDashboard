using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NewsProviders
{
    public interface INewsProvider
    {
        IEnumerable<NewsItem> GetNewsItemFromHtmlDocument();
    }
}
