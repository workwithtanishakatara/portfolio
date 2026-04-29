import "./globals.css";
import Navbar from "@/components/nav/Navbar";
import Footer from "@/components/footer/Footer";
import { cn } from "@/lib/utils";
import Providers from "@/components/ProgressBar";
import { fetchData } from "@/lib/FetchData";
import Script from "next/script";
import CalendlyPopupNative from "@/components/ui/CalendlyPopupNative";

export const metadata = {
  title: "Tanisha Katara’s Website",
  metadataBase: new URL("https://tanishakatara.com"),
  description:
    "Katara Consulting Group (KCG) Blockchain governance strategist & researcher. Power distribution, staking design, and Al-driven coordination. Turning protocol complexity into resilient systems.",
  other: {
    keywords:
      "Blockchain consultant, Governance, Blockchain governance, Web3 adoption, DAO tooling, Crypto payments Product management, Technical research, Polygon Technology, Juno Finance, Independent consultant, Blockchain expert, Layer2, Crypto-friendly neobank, Blockchain keynote speaker",
  },
  other: {
    author: "Tanisha Katara",
  },
  openGraph: {
    images: [
      {
        url: `https://tanishakatara.com/assets/opengraph-image.png/?${Math.random() * 1000}`,
      },
    ],
  },
  applicationName: "Tanisha Katara",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" },
    ],
  },
  manifest: "/site.webmanifest",
  // other: {
  //   "og:title": "Tanisha Katara’s Website",
  //   "og:description":
  //     "Tanisha Katara is an independent blockchain consultant with 5 years of experience, specializing in governance, technical research, and business strategy.",
  //   "og:image":
  //     "https://tanishakatara.com/opengraph-image.png?974640cc067ef151",
  // },
};

export default async function RootLayout({ children }) {
  const navbarData = await fetchData(
    "https://9wlw9jiw.api.sanity.io/v2022-03-07/data/query/production?query=%7B%0A++%22about%22%3A+*%5B_type+%3D%3D+%22aboutPage%22%5D%7Btitle%2C+description%7D%5B0%5D%2C%0A++%22speaking%22%3A+*%5B_type+%3D%3D+%22speakPage%22%5D%7Btitle%2C+description%7D%5B0%5D%2C%0A++%22writing%22%3A+*%5B_type+%3D%3D+%22writingPage%22%5D%7Btitle%2C+description%7D%5B0%5D%2C%0A++++%22contact%22%3A+*%5B_type+%3D%3D+%22contactPage%22%5D%7Btitle%2C+description%7D%5B0%5D%2C%0A++%22socialLinks%22%3A+*%5B_type+%3D%3D+%22homePage%22%5D%7BsocialLinks%7D%5B0%5D%0A%7D%0A"
  );

  const homeData = await fetchData(
    "https://9wlw9jiw.api.sanity.io/v2022-03-07/data/query/production?query=*%5B_type+%3D%3D+%22homePage%22%5D%5B0%5D%7B%0A++title%2C%0A++++words+%0A%7D"
  );

  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="fX4smDOhgL5tJ-P6KY52aC-qk3MnRs8F94c72je0_hM"
        />
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-N4KEZFQLVW"
        />
        <Script id="google-analytics">
          {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-N4KEZFQLVW');`}
        </Script>
        <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet"/>
<script src="https://assets.calendly.com/assets/external/widget.js" type="text/javascript" async></script>
      </head>
      <body className={cn("!tracking-tight overflow-x-hidden")}>
        <Navbar homeData={homeData} data={navbarData} />
        <Providers>{children}</Providers>
        <Footer data={navbarData} />
        <div className="fixed bottom-0 right-0 z-50 p-10">
          <CalendlyPopupNative
          buttonText={"Schedule a call"}
          url={"https://calendly.com/tanisha-katara/office-hours-with-tanisha-katara"}
          />
        </div>
      </body>
    </html>
  );
}
