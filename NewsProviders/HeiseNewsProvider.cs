using HtmlAgilityPack;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace NewsProviders
{
    public class HeiseNewsProvider : NewsProviderBase
    {
        public override IEnumerable<NewsItem> GetNewsItemsFromStream(Stream documentStream)
        {
            HtmlDocument doc = new HtmlDocument();
            doc.Load(documentStream, Encoding.Default);

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
