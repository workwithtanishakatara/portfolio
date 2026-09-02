import { urlFor } from "@/lib/ImageUrl";
import Link from "next/link";

const navigation = [
  ["About", "/about"],
  ["Speaking", "/speaking"],
  ["Research", "/research"],
  ["Work", "/work"],
  ["Contact", "/contact"],
];

const Footer = ({ data }) => {
  const socialLinks = data?.socialLinks?.socialLinks || [];

  return (
    <footer className="element flex w-full justify-center border-t border-white/10">
      <div className="w-full max-w-[1200px] px-5 py-12">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-start">
          <div>
            <Link href="/" className="text-xl font-semibold md:text-2xl">
              Katara Consulting Group
            </Link>
            <p className="mt-3 max-w-[420px] text-sm leading-relaxed text-white/60">
              Product strategy, technical deployment, and mechanism design across AI systems and blockchain infrastructure.
            </p>
          </div>

          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-7 gap-y-3">
            {navigation.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="text-sm text-white/75 transition-colors hover:text-white"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-5 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-white/45">
            {new Date().getFullYear()} Tanisha Katara
          </p>
          <div className="flex flex-row gap-2">
            {socialLinks.map((link, index) => (
              <a
                key={link._key || link.link || index}
                target="_blank"
                rel="noreferrer noopener"
                href={link.link}
                aria-label={`Open social profile ${index + 1}`}
                className="flex size-9 items-center justify-center rounded-md border border-white/15 transition-colors hover:border-white/50 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <img
                  className="size-[18px] invert"
                  src={urlFor(link.icon).url()}
                  alt=""
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
