using NewsProviders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Xunit;

namespace NewsProvidersTest
{
    public class HeiseNewsProviderTests
    {
        [Fact]
        public void HeiseNewsProvider_TestProvider_ItemCountCorrect()
        {
            HeiseNewsProvider provider = new HeiseNewsProvider(Constants.heiseNewsFileName);
            var news = provider.GetNewsItemFromHtmlDocument().ToList();
        }

        public void HeiseNewsProvider_TestProvider_ProvidesCorrectItems(string title, string link)
        {
        }
    }
}
