using HtmlAgilityPack;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NewsProviders
{
    public class GolemNewsProvider : INewsProvider
    {
        string path;

        public GolemNewsProvider(string path)
        {
            this.path = path;
        }

        public IEnumerable<NewsItem> GetNewsItemFromHtmlDocument()
        {
            HtmlDocument doc = new HtmlDocument();
            doc.Load(path, Encoding.Default);

            HtmlNodeCollection allArticleContainers = doc.DocumentNode.SelectNodes("/html/body/div[2]/div[1]/div[2]/div[2]/section[2]/ol[@class=\"list-articles\"]");

            foreach (HtmlNode articleContainer in allArticleContainers)
            {
                foreach(HtmlNode node in articleContainer.SelectNodes("li/header/a"))
                {
                    string title = node.GetAttributeValue("title", null);
                    string link = node.GetAttributeValue("href", null);

                    NewsItem newsItem = new NewsItem(title, link, null);
                    yield return newsItem;
                }
            }
        }
    }
}
