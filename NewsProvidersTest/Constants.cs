using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace NewsProvidersTest
{
    internal sealed class Constants
    {
        private static string testDataDirectory = "TestData";
        internal static string golemNewsFileName = Path.Combine(testDataDirectory, "Golem.de  IT-News für Profis.html");
        internal static string heiseNewsFileName = Path.Combine(testDataDirectory, "heise online - IT-News, Nachrichten und Hintergründe heise online.html");
    }
}
