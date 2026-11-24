import { socials } from "../../data";
import { BrandIcon, brandIcons } from "../icons/brands";

// Renders nothing until profiles are added to `socials` in app/data.ts.
export default function Socials({ className = "" }: { className?: string }) {
  if (socials.length === 0) return null;

  return (
    <ul className={`flex flex-wrap items-center gap-2 ${className}`}>
      {socials.map((social) => (
        <li key={social.url}>
          <a
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={brandIcons[social.platform].title}
            title={brandIcons[social.platform].title}
            className="grid h-10 w-10 place-items-center rounded-full border border-fg/15 bg-fg/5 text-fg/80 transition-colors hover:border-fg/30 hover:bg-fg/10 hover:text-fg"
          >
            <BrandIcon brand={social.platform} className="h-4 w-4" />
          </a>
        </li>
      ))}
    </ul>
  );
}
