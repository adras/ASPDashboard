using NewsProviders;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace NewsProvidersTest
{
    /// <summary>
    /// Helper class for creation of [InlineData] attributes
    /// </summary>
    internal class TestCreationHelper
    {
        /// <summary>
        /// Creates [InlineData] attributes with title and link values for unit tests
        /// </summary>
        /// <param name="fileName">File to write results to</param>
        /// <param name="newsItems">NewsItems to create data from</param>
        public static void DumpItemsAsInlineDataToFile(string fileName, IEnumerable<NewsItem> newsItems)
        {

            if (File.Exists(fileName))
                File.Delete(fileName);

            foreach (NewsItem item in newsItems)
            {
                File.AppendAllText(fileName, $"[InlineData(\"{item.Title}\", \"{item.Link}\")]");
            }
        }
    }
}
