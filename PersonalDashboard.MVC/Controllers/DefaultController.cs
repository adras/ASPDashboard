using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NewsProviders;

namespace PersonalDashboard.Controllers
{
    public class DefaultController : Controller
    {
        public IActionResult Index()
        {
            HeiseNewsProvider provider = new HeiseNewsProvider(@"e:\reposNew\Everything\CSharp\ASP.NET\ASPDashboard\NewsProvidersTest\TestData\heise online - IT-News, Nachrichten und Hintergründe heise online.html");

            ViewBag.NewsList = provider.GetNewsItemFromHtmlDocument();

            return View();
        }
    }
}