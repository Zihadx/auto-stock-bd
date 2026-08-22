import Link from "next/link";
import { publicNav, siteConfig, vehicleBrands } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-charcoal-line bg-charcoal text-paper/70">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4 md:px-8">
        <div>
          <p className="font-display text-lg font-semibold text-paper">
            {siteConfig.name}
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed">
            {siteConfig.tagline}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-paper/40">
            Explore
          </p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {publicNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-paper">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-paper/40">
            Popular Brands
          </p>
          <ul className="mt-4 grid grid-cols-2 gap-2.5 text-sm">
            {vehicleBrands.slice(0, 6).map((brand) => (
              <li key={brand}>
                <Link
                  href={`/inventory?brands=${encodeURIComponent(brand)}`}
                  className="hover:text-paper"
                >
                  {brand}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-paper/40">
            Contact
          </p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>{siteConfig.address}</li>
            <li>
              <a href={`tel:${siteConfig.phone}`} className="hover:text-paper">
                {siteConfig.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="hover:text-paper"
              >
                {siteConfig.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-charcoal-line px-4 py-5 text-center text-xs text-paper/40 md:px-8">
        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </div>
    </footer>
  );
}
