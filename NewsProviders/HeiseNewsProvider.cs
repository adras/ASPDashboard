using HtmlAgilityPack;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NewsProviders
{
    public class HeiseNewsProvider : INewsProvider
    {
        string path;

        public HeiseNewsProvider(string path)
        {
            this.path = path;
        }

        public IEnumerable<NewsItem> GetNewsItemFromHtmlDocument()
        {
            HtmlDocument doc = new HtmlDocument();
            doc.Load(path, Encoding.Default);

            HtmlNodeCollection allArticleContainers = doc.DocumentNode.SelectNodes("/descendant::article");

            var articleLinks = allArticleContainers.Select(d => d.SelectSingleNode("a"));



            yield return null;
        }
    }
}
