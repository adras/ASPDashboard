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
            List<NewsItem> news = provider.GetNewsItemFromHtmlDocument().ToList();
            Assert.Equal(81, news.Count);
        }

        [Theory]
        [InlineData("Workarounds für Probleme mit virtuellen Netzwerkkarten", "https://www.heise.de/security/meldung/Problematische-Windows-Updates-Workarounds-fuer-Schwierigkeiten-mit-virtuellen-Netzwerkkarten-3996689.html")]
        [InlineData("Die Suche nach Passierschein A38 im Büro 4.0", "https://www.heise.de/newsticker/meldung/KI-Assistenten-Die-Suche-nach-Passierschein-A38-im-Buero-4-0-3996162.html")]
        [InlineData("Notruf 112 mit fatalem Datenleck", "https://www.heise.de/security/meldung/c-t-deckt-auf-Notruf-112-mit-fatalem-Datenleck-3996008.html")]
        [InlineData("&quot;Hello, World!&quot; – das Programmiersprachen-Quiz", "https://www.heise.de/newsticker/meldung/TGIQF-das-Programmiersprachen-Quiz-Hello-World-3995341.html")]
        [InlineData("Cyberangriff sollte Explosion auslösen", "https://www.heise.de/newsticker/meldung/Saudi-Arabien-Cyberangriff-haette-Explosion-ausloesen-koennen-Ermittler-sind-alarmiert-3996010.html")]
        [InlineData("VW Polo TGI mit bivalentem Erdgas-Antrieb", "https://www.heise.de/autos/artikel/Test-VW-Polo-TGI-3985611.html")]
        [InlineData("Weiterer Experte bestätigt Lücke", "https://www.heise.de/security/meldung/Weiterer-Experte-bestaetigt-Sicherheitsprobleme-in-AMD-Ryzen-und-Epyc-3996453.html")]
        [InlineData("Medion Life X14903 von Aldi im Test", "https://www.heise.de/ct/artikel/HDR-4K-TV-Medion-Life-X14903-von-Aldi-im-Test-3996093.html")]
        [InlineData("Hirnkonservierung für Wiederaufleben", "https://www.heise.de/newsticker/meldung/Gehirn-Backup-per-Sterbehilfe-Start-up-will-Hirnkonservierung-fuer-spaeteres-Wiederaufleben-anbieten-3996411.html")]
        [InlineData("App Store sperrte offenbar iranische iPhone-Nutzer aus", "https://www.heise.de/mac-and-i/meldung/App-Store-sperrte-offenbar-iranische-iPhone-Nutzer-aus-3996883.html")]
        [InlineData("Autonome Autos: General Motors rüstet Fabriken für Serienfertigung des Cruise AV auf", "https://www.heise.de/newsticker/meldung/Autonome-Autos-General-Motors-ruestet-Fabriken-fuer-Serienfertigung-des-Cruise-AV-auf-3996822.html")]
        [InlineData("Apple will &quot;tastenloses Keyboard&quot; für Notebooks patentieren", "https://www.heise.de/mac-and-i/meldung/Apple-will-tastenloses-Keyboard-fuer-Notebooks-patentieren-3996776.html")]
        [InlineData("Schöner leben mit dem Internet of Shrimps", "https://www.heise.de/make/meldung/Schoener-leben-mit-dem-Internet-of-Shrimps-3995656.html")]
        [InlineData("Would You Rather?: Rihanna kritisiert Snapchat für Werbeanzeige", "https://www.heise.de/newsticker/meldung/Would-You-Rather-Rihanna-kritisiert-Snapchat-fuer-Werbeanzeige-3996697.html")]
        [InlineData("Social Media: Wie die Polizei mit Internet-Streifen gegen Hetze im Netz vorgeht", "https://www.heise.de/newsticker/meldung/Social-Media-Wie-die-Polizei-mit-Internet-Streifen-gegen-Hetze-im-Netz-vorgeht-3996656.html")]
        [InlineData("Quellcode-Editor: Atom 1.25 verbessert die GitHub-Anbindung", "https://www.heise.de/developer/meldung/Quellcode-Editor-Atom-1-25-verbessert-die-GitHub-Anbindung-3996613.html")]
        [InlineData("Streaming-Dienst Spotify geht an die Börse", "https://www.heise.de/newsticker/meldung/Streaming-Dienst-Spotify-geht-an-die-Boerse-3996603.html")]
        [InlineData("GrayKey: Kleine Box entsperrt angeblich iPhones", "https://www.heise.de/mac-and-i/meldung/GrayKey-Kleine-Box-entsperrt-angeblich-iPhones-3996645.html")]
        [InlineData("Aus Android Wear wird Wear OS by Google", "https://www.heise.de/developer/meldung/Aus-Android-Wear-wird-Wear-OS-by-Google-3996577.html")]
        [InlineData("Ex-Chef von Qualcomm prüft mögliche Übernahme", "https://www.heise.de/newsticker/meldung/Ex-Chef-von-Qualcomm-prueft-moegliche-Uebernahme-3996565.html")]
        [InlineData("Höchststrafe: Spanische Datenschützer bitten Facebook und WhatsApp zur Kasse", "https://www.heise.de/newsticker/meldung/Hoechststrafe-Spanische-Datenschuetzer-bitten-Facebook-und-WhatsApp-zur-Kasse-3996469.html")]
        [InlineData("Bundestag: Tschechische Firma erhält Zuschlag für neue Parlaments-App", "https://www.heise.de/newsticker/meldung/Bundestag-Tschechische-Firma-erhaelt-Zuschlag-fuer-neue-Parlaments-App-3996445.html")]
        [InlineData("Schwachstelle in Chrome RDP für macOS: Gast kann vollen Remote-Zugriff erhalten", "https://www.heise.de/mac-and-i/meldung/Schwachstelle-in-Chrome-RDP-fuer-macOS-Gast-kann-vollen-Remote-Zugriff-erhalten-3996450.html")]
        [InlineData("Benchmark-Ergebnisse im Netz: Cinebench-Werte der Intel-Prozessoren Core i9-8950HK, Core i7-8850H und Core i7-8750H", "https://www.heise.de/newsticker/meldung/Benchmark-Ergebnisse-im-Netz-Cinebench-Werte-der-Intel-Prozessoren-Core-i9-8950HK-Core-i7-8850H-und-3996418.html")]
        [InlineData("Spectre und Meltdown: Intel-Prozessoren mit vollem Hardwareschutz bereits 2018", "https://www.heise.de/security/meldung/Spectre-und-Meltdown-Intel-Prozessoren-mit-vollem-Hardwareschutz-bereits-2018-3995993.html")]
        [InlineData("Historischer Meilenstein: Microsoft-KI übersetzt Chinesisch so gut wie Menschen", "https://www.heise.de/newsticker/meldung/Historischer-Meilenstein-Microsoft-KI-uebersetzt-Chinesisch-so-gut-wie-Menschen-3995552.html")]
        [InlineData("Raspberry Pi 3B+: Neuer Bastelrechner ist schneller zum gleichen Preis", "https://www.heise.de/ct/artikel/Der-neue-Raspberry-Pi-3B-schneller-zum-gleichem-Preis-3994036.html")]
        [InlineData("Let's Encrypt stellt ab sofort Wildcard-Zertifikate aus", "https://www.heise.de/security/meldung/Let-s-Encrypt-stellt-ab-sofort-Wildcard-Zertifikate-aus-3994552.html")]
        [InlineData("Nicht diese Art Lara Croft: Tomb-Raider-Reboot kommt ins Kino", "https://www.heise.de/newsticker/meldung/Nicht-diese-Art-Lara-Croft-Tomb-Raider-Reboot-kommt-ins-Kino-3991789.html")]
        [InlineData("Kunden von Amazon Prime bekommen über Twitch monatlich PC-Spiele geschenkt – jetzt verfügbar", "https://www.heise.de/newsticker/meldung/Kunden-von-Amazon-Prime-bekommen-ueber-Twitch-monatlich-PC-Spiele-geschenkt-jetzt-verfuegbar-3994512.html")]
        [InlineData("Shadow of the Tomb Raider: Dritter Teil des Lara-Croft-Reboots am 14. September", "https://www.heise.de/newsticker/meldung/Shadow-of-the-Tomb-Raider-Dritter-Teil-des-Lara-Croft-Reboots-am-14-September-3995538.html")]
        [InlineData("c't zockt LIVE ab 17 Uhr: Umwelt-Simulation Eco", "https://www.heise.de/ct/artikel/c-t-zockt-LIVE-ab-17-Uhr-Umwelt-Simulation-Eco-3991731.html")]
        [InlineData("Marktforscher: Gebrauchte iPhones bedrängen billige Smartphones", "https://www.heise.de/mac-and-i/meldung/Marktforscher-Gebrauchte-iPhones-bedraengen-billige-Smartphones-3995221.html")]
        [InlineData("Mehr Pixel für VR: Google arbeitet an 18-Megapixel-OLED", "https://www.heise.de/newsticker/meldung/Mehr-Pixel-fuer-VR-Google-arbeitet-an-18-Megapixel-OLED-3993822.html")]
        [InlineData("Überhitzungsgefahr: Amazon ruft AmazonBasics-Powerbanks zurück ", "https://www.heise.de/newsticker/meldung/Ueberhitzungsgefahr-Amazon-ruft-AmazonBasics-Powerbanks-zurueck-3992174.html")]
        [InlineData("&quot;Saarmojis&quot;: Das Saarland hat nun eigene Emojis", "https://www.heise.de/newsticker/meldung/Saarmojis-Das-Saarland-hat-nun-eigene-Emojis-3993845.html")]
        [InlineData("Beeinflussung der US-Wahl, NotPetya, Krim: USA verhängen Sanktionen gegen Russen", "https://www.heise.de/newsticker/meldung/Beeinflussung-der-US-Wahl-NotPetya-Krim-USA-verhaengen-Sanktionen-gegen-Russen-3996241.html")]
        [InlineData("ICANN: Datenschutzgrundverordnung muss auf Whois angewendet werden", "https://www.heise.de/newsticker/meldung/ICANN-Datenschutzgrundverordnung-muss-auf-Whois-angewendet-werden-3994698.html")]
        [InlineData("Das DNS ist in die Jahre gekommen: Braucht das Domain Name System ein Re-Design?", "https://www.heise.de/newsticker/meldung/Das-DNS-ist-in-die-Jahre-gekommen-Braucht-das-Domain-Name-System-ein-Re-Design-3985669.html")]
        [InlineData("EU-Studie zu &quot;Fake News&quot;: Plattformen sollen Algorithmen offenlegen", "https://www.heise.de/newsticker/meldung/EU-Studie-zu-Fake-News-Plattformen-sollen-Algorithmen-offenlegen-3993366.html")]
        [InlineData("Elektro- und Hybridautos auf dem Genfer Autosalon 2018", "https://www.heise.de/autos/artikel/Hybrid-und-E-Fahrzeuge-in-Genf-3986680.html")]
        [InlineData("Elektroautos: Audi kündigt Sportwagen e-tron GT an", "https://www.heise.de/newsticker/meldung/Elektroautos-Audi-kuendigt-Sportwagen-e-tron-GT-an-3995648.html")]
        [InlineData("EU-Parlament fordert Steuer für IT-Unternehmen wie Apple, Amazon oder Google", "https://www.heise.de/newsticker/meldung/EU-Parlament-fordert-Steuer-fuer-IT-Unternehmen-wie-Apple-Amazon-oder-Google-3995113.html")]
        [InlineData("Abgas-Skandal: VW hält Hardware-Nachrüstung von Dieselautos angeblich für möglich", "https://www.heise.de/newsticker/meldung/Abgas-Skandal-VW-haelt-Hardware-Nachruestung-von-Dieselautos-angeblich-fuer-moeglich-3994844.html")]
        [InlineData("Tank fast leer: Weltraumteleskop Kepler hat wohl nur noch Monate", "https://www.heise.de/newsticker/meldung/Tank-fast-leer-Weltraumteleskop-Kepler-hat-wohl-nur-noch-Monate-3995611.html")]
        [InlineData("Stephen Hawking ist tot", "https://www.heise.de/newsticker/meldung/Stephen-Hawking-ist-tot-3994039.html")]
        [InlineData("European Robotics Forum: Roboter erkunden den Ozean und bauen Straßen", "https://www.heise.de/newsticker/meldung/European-Robotics-Forum-Roboter-erkunden-den-Ozean-und-bauen-Strassen-3995196.html")]
        [InlineData("European Robotics Forum: Angst vor zweitem Oppenheimer und Kritik an Science Fiction", "https://www.heise.de/newsticker/meldung/European-Robotics-Forum-Angst-vor-zweitem-Oppenheimer-und-Kritik-an-Science-Fiction-3993935.html")]
        [InlineData("#heiseshow: EU fordert Upload-Filter: Was soll das - und wieso kümmert's niemand?", "https://www.heise.de/newsticker/meldung/heiseshow-EU-fordert-Upload-Filter-Was-soll-das-und-wieso-kuemmert-s-niemand-3994998.html")]
        [InlineData("Kommentar: Ode an die Ignoranz, oder: Wider die gehackte Aufmerksamkeit", "https://www.heise.de/autos/artikel/Klartext-Ode-an-die-Ignoranz-3993950.html")]
        [InlineData("Zahlen bitte! 105 Tasten zum Tippen", "https://www.heise.de/newsticker/meldung/Zahlen-bitte-105-Tasten-zum-Tippen-3991760.html")]
        [InlineData("Was war. Was wird. Am Anfang war das Wort und das Wort war Digitalisierung.", "https://www.heise.de/newsticker/meldung/Was-war-Was-wird-Am-Anfang-war-das-Wort-und-das-Wort-war-Digitalisierung-3990493.html")]
        [InlineData("Fotografen vorgestellt", "https://www.heise.de/foto/galerie/fullscreen/?sort=neueste&amp;page=1&amp;album=29758&amp;fotoID=05d763a25103a6dc0b96396681ca22e3")]
        [InlineData("Wissen schützt, gerüstet für die DSGVO und WannaCry auf der Spur", "https://www.heise.de/security/meldung/heisec-Tour-2018-Wissen-schuetzt-geruestet-fuer-die-DSGVO-und-WannaCry-auf-der-Spur-3961386.html")]
        [InlineData("parallel 2018", "https://www.heise.de/developer/artikel/parallel-2018-Grenzen-und-Chancen-der-Parallelprogrammierung-3996187.html")]
        [InlineData("Rasen Sie mit Ihren Ski so weit wie nur möglich", "https://spiele.heise.de/#!SkiRacer2")]
        [InlineData("Das geplante Grundrecht auf schnelles Internet lähmt den Ausbau", "https://www.heise.de/ct/ausgabe/2018-6-Warum-das-geplante-Grundrecht-auf-schnelles-Internet-den-Ausbau-laehmt-3979701.html")]
        [InlineData("Intel Management Engine", "https://www.heise.de/ct/hotline/FAQ-Intel-Management-Engine-3978291.html")]
        [InlineData("eSIM: Das Ende der klassischen SIM-Karte kommt", "https://www.heise.de/ct/artikel/eSIM-Das-Ende-der-klassischen-SIM-Karte-kommt-3877351.html")]
        [InlineData("Cross-Plattform-Apps mit Cordova", "https://www.heise.de/ix/heft/Tragbar-gemacht-3973095.html")]
        [InlineData("Moderne Textanalyse, Teil 1:  Texte zerlegen und Zusammenhänge visualisieren", "https://www.heise.de/ix/heft/Ein-Bild-sagt-mehr-als-tausend-Artikel-3973108.html")]
        [InlineData("Todesstrafe: Oklahoma will die Todesspritze durch Stickstoff ersetzen ", "https://heise.de/-3996540")]
        [InlineData("Mythos Nowitschok? ", "https://heise.de/-3996384")]
        [InlineData("Apple sieht keinen Anlass für Rauswurf von NRA TV", "https://www.heise.de/mac-and-i/meldung/Streit-um-NRA-TV-Apples-Content-Chef-sieht-keinen-Anlass-fuer-Rauswurf-3993870.html")]
        [InlineData("Datenverkehr von iPhone und Mac überwachen", "https://www.heise.de/mac-and-i/artikel/Datenverkehr-von-iPhone-und-Mac-ueberwachen-3986944.html")]
        [InlineData("Warum iPhone-Nutzer nicht auf das iPhone X umsteigen", "https://www.heise.de/mac-and-i/meldung/Warum-iPhone-Nutzer-nicht-auf-das-iPhone-X-umsteigen-3987496.html")]
        [InlineData("c't Fotografie: Foto-Ideen für zu Hause", "https://www.heise.de/foto/meldung/c-t-Fotografie-Foto-Ideen-fuer-zu-Hause-3918932.html")]
        [InlineData(" Knipst Du noch oder fotografierst Du schon?", "https://www.heise.de/newsticker/meldung/Smartphone-Fotografie-Knipst-Du-noch-oder-fotografierst-Du-schon-3826966.html")]
        [InlineData("Edle Scherben für wenig Geld", "https://www.heise.de/foto/artikel/Edle-Scherben-fuer-wenig-Geld-3946640.html")]
        [InlineData("Praxis: Schärfen in Photoshop und Lightroom", "https://www.heise.de/foto/artikel/Praxis-Schaerfen-in-Photoshop-und-Lightroom-3919084.html")]
        [InlineData("Raspberry Pi und BeagleBone wie Arduino programmieren", "https://www.heise.de/make/meldung/Raspberry-Pi-und-BeagleBone-wie-Arduino-programmieren-3995580.html")]
        [InlineData("DIY-Unterwasserkamera: Raspi taucht unter", "https://www.heise.de/make/meldung/DIY-Unterwasserkamera-Raspi-taucht-unter-3994365.html")]
        [InlineData("Leguino: Smarte Steine mit Arduino-Anschluss", "https://www.heise.de/make/meldung/Leguino-Smarte-Steine-mit-Arduino-Anschluss-3991878.html")]
        [InlineData("Schlaue Verträge voller Lücken", "https://www.heise.de/tr/artikel/Schlaue-Vertraege-voller-Luecken-3986434.html")]
        [InlineData("Carsharing verstopft die Straßen", "https://www.heise.de/tr/artikel/Carsharing-verstopft-die-Strassen-3985880.html")]
        [InlineData("Die besten Innovatoren unter 35 gesucht ", "https://www.heise.de/tr/artikel/Die-besten-Innovatoren-unter-35-gesucht-3944978.html")]
        [InlineData("Zwanzig unkomplizierte Gebraucht-Motorräder", "https://www.heise.de/autos/artikel/Zwanzig-unkomplizierte-Gebraucht-Motorraeder-3995516.html")]
        [InlineData("Test: Skoda Karoq 2.0 TDI ", "https://www.heise.de/autos/artikel/Test-Skoda-Karoq-2-0-TDI-3969569.html")]
        [InlineData("Diese Woche bei Aldi: Moto E4 für 80 Euro", "https://www.techstage.de/ratgeber/Smartphone-bei-Aldi-Lohnt-sich-das-Moto-E4-fuer-80-Euro-3989315.html?wt_mc=intern.newsticker.buehne.techstage")]
        [InlineData("Samsung Galaxy S9 Plus im Test: Hardware top, Software flop", "https://www.techstage.de/test/Samsung-Galaxy-S9-Plus-im-Test-Hardware-top-Software-flop-3991958.html?wt_mc=intern.newsticker.buehne.techstage")]
        [InlineData("Gratis Virenschutz für Windows 10", "https://www.heise.de/download/specials/Gratis-Virenschutz-fuer-Windows-10-3148982")]
        public void HeiseNewsProvider_TestProvider_ProvidesCorrectItems(string title, string link)
        {
            HeiseNewsProvider provider = new HeiseNewsProvider(Constants.heiseNewsFileName);
            
            // Uncomment to create inline data attributes for this test
            //List<NewsItem> news = provider.GetNewsItemFromHtmlDocument().ToList();
            //TestCreationHelper.DumpItemsAsInlineDataToFile(@"D:\news.txt", news);
            Assert.Contains(provider.GetNewsItemFromHtmlDocument(), item => item.Title == title && item.Link == link);

        }
    }
}
