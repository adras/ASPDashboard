﻿using HtmlAgilityPack;

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NewsProviders
{
    public class GolemNewsProvider : NewsProviderBase
    {
        public override IEnumerable<NewsItem> GetNewsItemsFromStream(Stream documentStream)
        {
            HtmlDocument doc = new HtmlDocument();
            doc.Load(documentStream, Encoding.Default);

            HtmlNodeCollection allArticleContainers = doc.DocumentNode.SelectNodes("/html/body/div[2]/div[1]/div[2]/div[2]/section[2]/ol[@class=\"list-articles\"]");

            foreach (HtmlNode articleContainer in allArticleContainers)
            {
                //foreach(HtmlNode node in articleContainer.SelectNodes("li/header/a"))
                //{
                //    string title = node.GetAttributeValue("title", null);
                //    string link = node.GetAttributeValue("href", null);

                //    NewsItem newsItem = new NewsItem(title, link, null);
                //    yield return newsItem;
                //}
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
