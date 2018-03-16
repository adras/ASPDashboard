using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NewsProviders
{
    public sealed class NewsItem
    {
        string title;
        string link;
        string teaser;

        public string Title { get => title; set => title = value; }

        public string Link { get => link; set => link = value; }
        public string Teaser { get => teaser; set => teaser = value; }

        private NewsItem()
        {

        }

        public NewsItem(string title, string link, string teaser)
        {
            this.title = title;
            this.link = link;
            this.teaser = teaser;
        }

        public override string ToString()
        {
            return Title;
        }
    }
}
