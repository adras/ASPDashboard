using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using NewsProviders;

namespace PersonalDashboard.Pages
{
    public class NewsModel : PageModel
    {
        public List<NewsItem> HeiseNews { get; set; }

        public List<NewsItem> GolemNews { get; set; }

        public void OnGet()
        {
            HeiseNewsProvider heiseProvider = new HeiseNewsProvider();
            GolemNewsProvider golemProvider = new GolemNewsProvider();

            HeiseNews = heiseProvider.GetNewsItemsFromUrl("http://heise.de").ToList();
            GolemNews = golemProvider.GetNewsItemsFromUrl("http://golem.de").ToList();
        }
    }
}