import { site } from "../../data";

// Downloads the CV set in site.resume. Renders nothing if there isn't one.
export default function CvButton({ className, label = "Download CV" }: { className: string; label?: string }) {
  if (!site.resume) return null;

  return (
    <a href={site.resume} download={site.resume.split("/").pop()} className={className}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M12 3v12m0 0-4-4m4 4 4-4M5 21h14" />
      </svg>
      {label}
    </a>
  );
}
