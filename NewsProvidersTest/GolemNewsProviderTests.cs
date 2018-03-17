using NewsProviders;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Xunit;

namespace NewsProvidersTest
{
    public class GolemNewsProviderTests
    {
        [Fact]
        public void GolemNewsProvider_TestProvider_ItemCountCorrect()
        {
            using (Stream fileStream = File.OpenRead(Constants.golemNewsFileName))
            {
                GolemNewsProvider provider = new GolemNewsProvider();
                List<NewsItem> newsItems = provider.GetNewsItemsFromStream(fileStream).ToList();
                Assert.Equal(23, newsItems.Count);

                foreach (var item in newsItems)
                {
                    File.AppendAllText(@"D:\news.txt", $"[InlineData(\"{item.Title}\",\"{item.Link}\")]\r\n");
                }
            }
        }

        [Theory]
        [InlineData("Ark Survival Evolved: Die Urzeitviecher kommen aufs Smartphone", "https://www.golem.de/news/ark-survival-evolved-die-urzeitviecher-kommen-auf-s-smartphone-1803-133367.html")]
        [InlineData("Plug-in-Hybrid: Volvo Polestar 1 wird teuer", "https://www.golem.de/news/plug-in-hybrid-volvo-polestar-1-wird-teuer-1803-133366.html")]
        [InlineData("Cyborg: Bodyhacker muss Strafe wegen Schwarzfahrens zahlen", "https://www.golem.de/news/cyborg-bodyhacker-muss-strafe-wegen-schwarzfahrens-zahlen-1803-133368.html")]
        [InlineData("Cryorig Taku im Test: Der Alu-Desktop mit dem Holzbein", "https://www.golem.de/news/cryorig-taku-im-test-der-alu-desktop-mit-dem-holzbein-1803-133303.html")]
        [InlineData("Troopers 2018: &quot;Responsible Disclosure hilft nur dem Hersteller&quot;", "https://www.golem.de/news/troopers-2018-responsible-disclosure-hilft-nur-dem-hersteller-1803-133362.html")]
        [InlineData("Amazon Prime Video: Fernsehserien müssen neue Prime-Kunden gewinnen", "https://www.golem.de/news/amazon-prime-video-fernsehserien-muessen-neue-prime-kunden-gewinnen-1803-133347.html")]
        [InlineData("Elektroauto: GM investiert 100 Millionen Dollar in autonomen Chevy Bolt", "https://www.golem.de/news/elektroauto-gm-investiert-100-millionen-dollar-in-autonomen-chevy-bolt-1803-133365.html")]
        [InlineData("Filmkritik Tomb Raider: Starke Lara, schwacher Film", "https://www.golem.de/news/filmkritik-tomb-raider-starke-lara-schwacher-film-1803-133323.html")]
        [InlineData("Transparenzbericht: Behörden fragen Überwachung meist unverschlüsselt an", "https://www.golem.de/news/transparenzbericht-behoerden-fragen-ueberwachung-meist-unverschluesselt-an-1803-133363.html")]
        [InlineData("Spring Creators Update: Die nächste Windows-Version 1803 kommt bald", "https://www.golem.de/news/spring-creators-update-die-naechste-windows-version-1803-kommt-bald-1803-133326.html")]
        [InlineData("Elektroauto: Audi E-Tron Quattro SUV kostet ab 80.000 Euro", "https://www.golem.de/news/elektroauto-audi-e-tron-quattro-suv-kostet-ab-80-000-euro-1803-133364.html")]
        [InlineData("Datenschutz-Grundverordnung: Was Unternehmen und Admins jetzt tun müssen", "https://www.golem.de/news/datenschutz-grundverordnung-was-unternehmen-und-admins-jetzt-tun-muessen-1803-133122.html")]
        [InlineData("Supersampling: SteamVR erhöht Auflösung mit schneller Grafikkarte", "https://www.golem.de/news/supersampling-steamvr-erhoeht-aufloesung-mit-schneller-grafikkarte-1803-133361.html")]
        [InlineData("Cascade Lake: Intels CPUs werden Meltdown/Spectre-v2-sicher", "https://www.golem.de/news/cascade-lake-intels-cpus-werden-meltdown-spectre-v2-sicher-1803-133359.html")]
        [InlineData("Elektroautos: Tesla soll zahlreiche Teile des Model 3 fehlerhaft bauen", "https://www.golem.de/news/elektroautos-tesla-soll-zahlreiche-teile-des-model-3-fehlerhaft-bauen-1803-133340.html")]
        [InlineData("McFadden-Prozess: OLG München bestätigt Abschaffung der Störerhaftung", "https://www.golem.de/news/mcfadden-prozess-olg-muenchen-bestaetigt-abschaffung-der-stoererhaftung-1803-133358.html")]
        [InlineData("Linux Desktop: Gnome 3.28 bringt schöne Details und Thunderbolt 3", "https://www.golem.de/news/linux-desktop-gnome-3-28-bringt-schoene-details-und-thunderbolt-3-1803-133357.html")]
        [InlineData("Mobilfunk: Vodafone Deutschland baut sein LTE-Netz aus", "https://www.golem.de/news/mobilfunk-vodafone-deutschland-baut-sein-lte-netz-aus-1803-133355.html")]
        [InlineData("Sound Open Firmware: Intel legt Audio-Firmware offen", "https://www.golem.de/news/sound-open-firmware-intel-legt-audio-firmware-offen-1803-133354.html")]
        [InlineData("Filmkritik Auslöschung: Wenn die Erde außerirdisch wird", "https://www.golem.de/news/filmkritik-ausloeschung-wenn-die-erde-ausserirdisch-wird-1803-133210.html")]
        [InlineData("Auftragsfertiger: TSMCs 7-nm-Node soll schon 40 Kunden haben", "https://www.golem.de/news/auftragsfertiger-tsmcs-7-nm-node-soll-schon-40-kunden-haben-1803-133351.html")]
        [InlineData("Internetunternehmen: Europaparlament gegen Steuerdumping bei IT-Konzernen", "https://www.golem.de/news/internetunternehmen-europaparlament-gegen-steuerdumping-bei-it-konzernen-1803-133353.html")]
        [InlineData("Julia Reda: Mit Datenschutz gegen Werbemonopole", "https://www.golem.de/news/julia-reda-leistungsschutzrecht-ist-nur-machtdemonstration-der-verlage-1803-133330.html")]
        public void GolemNewsProvider_TestProvider_ProvidesCorrectItems(string title, string link)
        {
            using (Stream fileStream = File.OpenRead(Constants.golemNewsFileName))
            {
                GolemNewsProvider provider = new GolemNewsProvider();
                List<NewsItem> newsItems = provider.GetNewsItemsFromStream(fileStream).ToList();
                Assert.Contains(newsItems, item => item.Title == title && item.Link == link);
            }
        }
    }
}
