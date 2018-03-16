using NewsProviders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace PersonalDashboard
{
    public partial class News : System.Web.UI.Page
    {

        protected void Page_Load(object sender, EventArgs e)
        {

        }

        public IQueryable<NewsItem> GetGolemNews()
        {
            GolemNewsProvider provider = new GolemNewsProvider(@"e:\reposNew\Everything\CSharp\ASP.NET\ASPDashboard\NewsProvidersTest\TestData\Golem.de  IT-News für Profis.html");

            QueryableNewsProvider queryableProvider = new QueryableNewsProvider(provider);


            return queryableProvider;
        }

        public IQueryable<NewsItem> GetHeiseNews()
        {
            HeiseNewsProvider provider = new HeiseNewsProvider(@"e:\reposNew\Everything\CSharp\ASP.NET\ASPDashboard\NewsProvidersTest\TestData\heise online - IT-News, Nachrichten und Hintergründe heise online.html");

            QueryableNewsProvider queryableProvider = new QueryableNewsProvider(provider);


            return queryableProvider;
        }
    }
}