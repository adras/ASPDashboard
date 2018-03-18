using HtmlAgilityPack;

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NewsProviders
{
    /// <summary>
    /// Implementation of <see cref="NewsProviderBase"/> to fetch news from http://golem.de
    /// </summary>
    public class GolemNewsProvider : NewsProviderBase
    {
        /// <summary>
        /// Fetches a list of <see cref="NewsItem"/> from the given stream which should point to http://golem.de
        /// </summary>
        /// <param name="documentStream">Stream to fetch <see cref="NewsItem"/> from</param>
        /// <returns>List of <see cref="NewsItem"/></returns>
        public override IEnumerable<NewsItem> GetNewsItemsFromStream(Stream documentStream)
        {
            if (documentStream == null)
            {
                throw new ArgumentNullException("documentStream");
            }
            HtmlDocument doc = new HtmlDocument();
            doc.Load(documentStream, Encoding.Default);

            HtmlNodeCollection allArticleContainers = doc.DocumentNode.SelectNodes("/html/body/div[2]/div[1]/div[2]/div[2]/section[2]/ol[@class=\"list-articles\"]");

            foreach (HtmlNode articleContainer in allArticleContainers)
            {
                foreach (HtmlNode node in articleContainer.SelectNodes("li"))
                {
                    string title = node.SelectSingleNode("header/a").GetAttributeValue("title", null);
                    string link =  node.SelectSingleNode("header/a").GetAttributeValue("href", null);

                    string teaser = node.SelectSingleNode("p").InnerHtml;

                    NewsItem newsItem = new NewsItem(title, link, teaser);
                    yield return newsItem;
                }
            }
        }

    }
}
