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

            List<HtmlNode> articleLinks = allArticleContainers.Select(d => d.SelectSingleNode("a")).ToList();

            // Some articles are null, remove them
            articleLinks.RemoveAll(item => item == null);

            IEnumerable<NewsItem> items = articleLinks.Select(article => new NewsItem(
                article.GetAttributeValue("title", null),
                article.GetAttributeValue("href", null),
                // some articles don't contain a paragraph, set them to null
                (article.SelectSingleNode("div/p") != null) ? article.SelectSingleNode("div/p").InnerHtml : null
                ));

            return items;
        }
    }
}
