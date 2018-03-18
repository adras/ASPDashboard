using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NewsProviders
{
    /// <summary>
    /// Represents the contents of a news article with a title, link and teaser
    /// </summary>
    public sealed class NewsItem
    {
        string title;
        string link;
        string teaser;

        /// <summary>
        /// Gets or sets the title of the news article
        /// </summary>
        public string Title { get => title; set => title = value; }

        /// <summary>
        /// Gets or sets the link to the complete article
        /// </summary>
        public string Link { get => link; set => link = value; }

        /// <summary>
        /// Gets or sets the teaser of the article
        /// </summary>
        public string Teaser { get => teaser; set => teaser = value; }

        private NewsItem()
        {
        }

        /// <summary>
        /// Creates a new instance of <see cref="NewsItem"/>
        /// </summary>
        /// <param name="title">Title of article</param>
        /// <param name="link">Link to article</param>
        /// <param name="teaser">Teaser of article</param>
        /// <remarks>A link is in the form of an http-url</remarks>
        public NewsItem(string title, string link, string teaser)
        {
            this.title = title;
            this.link = link;
            this.teaser = teaser;
        }

        /// <summary>
        /// Return the title of the news article
        /// </summary>
        /// <returns></returns>
        public override string ToString()
        {
            return Title;
        }
    }
}
