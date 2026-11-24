import { site } from "../../data";
import Socials from "../socials";
import { ArrowUp } from "../icons/arrows";

export default function Footer() {
  return (
    <footer className="border-t border-line px-4 pb-24 pt-8 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-muted sm:flex-row">
        <p>
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
        <Socials />
        <a href="#top" className="inline-flex items-center gap-1.5 transition-colors hover:text-fg">
          Back to top
          <ArrowUp className="h-4 w-4" />
        </a>
      </div>
    </footer>
  );
}
