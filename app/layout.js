import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/nav/Navbar";
import Footer from "@/components/footer/Footer";
import { cn } from "@/lib/utils";
import Providers from "@/components/ProgressBar";
import { fetchData } from "@/lib/FetchData";
import Script from "next/script";

const inter = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Tanisha Katara’s Website",
  description:
    "Tanisha Katara is an independent blockchain consultant with 5 years of experience, specializing in governance, technical research, and business strategy.",
  other: {
    keywords:
      "Blockchain consultant, Governance, Blockchain governance, Web3 adoption, DAO tooling, Crypto payments Product management, Technical research, Polygon Technology, Juno Finance, Independent consultant, Blockchain expert, Layer2, Crypto-friendly neobank, Blockchain keynote speaker",
  },
  other: {
    author: "Tanisha Katara",
  },
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
      </head>
      <body className={cn(inter.className, "!tracking-tight")}>
        <Navbar homeData={homeData} data={navbarData} />
        <Providers>{children}</Providers>
        <Footer data={navbarData} />
      </body>
    </html>
  );
}
