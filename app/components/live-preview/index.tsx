"use client";

import { useRef, useState } from "react";
import { ArrowUpRight } from "../icons/arrows";

// Opens the real site inside the portfolio so visitors can try it without leaving.
export default function LivePreview({ title, url }: { title: string; url: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");

  const show = () => {
    setDevice(window.innerWidth < 768 ? "mobile" : "desktop");
    setOpen(true);
    dialogRef.current?.showModal();
  };

  const close = () => dialogRef.current?.close();

  return (
    <>
      <button
        type="button"
        onClick={show}
        className="inline-flex h-10 items-center gap-2 rounded-full bg-accent-strong px-5 text-sm font-semibold text-white transition-colors hover:bg-accent-strong/85"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-75 motion-safe:animate-ping" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
        </span>
        Try it live
      </button>

      <dialog
        ref={dialogRef}
        onClose={() => setOpen(false)}
        onClick={(e) => e.target === dialogRef.current && close()}
        aria-label={`${title}: live preview`}
        className="m-auto h-[100dvh] max-h-none w-screen max-w-none bg-transparent p-0 backdrop:bg-black/80 backdrop:backdrop-blur-sm sm:h-[92dvh] sm:w-[94vw]"
      >
        <div className="flex h-full flex-col overflow-hidden border border-line bg-surface sm:rounded-2xl">
          <div className="flex items-center gap-2 border-b border-line px-3 py-2 sm:px-4">
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-fg">{title}</p>
              <p className="truncate text-[11px] text-muted">{new URL(url).host}</p>
            </div>

            <div className="hidden rounded-full border border-line p-0.5 sm:flex" role="group" aria-label="Preview size">
              {(["desktop", "mobile"] as const).map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDevice(d)}
                  aria-pressed={device === d}
                  className={`rounded-full px-3 py-1 text-xs font-medium capitalize transition-colors ${
                    device === d ? "bg-fg text-ink" : "text-muted hover:text-fg"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>

            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:bg-fg/10 hover:text-fg"
            >
              Open in new tab
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <button
              type="button"
              onClick={close}
              aria-label="Close preview"
              className="grid h-9 w-9 place-items-center rounded-full text-fg transition-colors hover:bg-fg/10"
            >
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden>
                <path d="M5 5l10 10M15 5L5 15" />
              </svg>
            </button>
          </div>

          <div className="relative flex flex-1 justify-center overflow-hidden bg-ink">
            <p className="absolute inset-0 grid place-items-center text-sm text-muted">Loading live site…</p>
            {open && (
              <iframe
                src={url}
                title={`${title}: live site`}
                className={`relative h-full bg-white transition-[width] duration-300 ${
                  device === "mobile" ? "w-[390px] max-w-full sm:my-4 sm:h-[calc(100%-2rem)] sm:rounded-2xl" : "w-full"
                }`}
              />
            )}
          </div>

          <p className="border-t border-line px-4 py-2 text-center text-[11px] text-muted">
            You’re viewing the live site. Some things, like signing in, only work when it’s opened in its own tab.
          </p>
        </div>
      </dialog>
    </>
  );
}
