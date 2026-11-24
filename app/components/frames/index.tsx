export function BrowserFrame({ url, children }: { url?: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_30px_80px_-40px_rgb(0_0_0/0.9)] light:shadow-[0_24px_60px_-36px_rgb(15_23_42/0.35)]">
      <div className="flex items-center gap-2 border-b border-line bg-fg/5 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-fg/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-fg/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-fg/20" />
        {url && (
          <span className="ml-3 truncate rounded-md bg-fg/10 px-3 py-0.5 text-[11px] text-fg/60">
            {new URL(url).host + new URL(url).pathname.replace(/\/$/, "")}
          </span>
        )}
      </div>
      <div className="relative aspect-[16/10]">{children}</div>
    </div>
  );
}

export function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[2rem] border border-white/15 bg-black p-1.5 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.9)] light:shadow-[0_24px_50px_-28px_rgb(15_23_42/0.4)]">
      <div className="relative aspect-[390/844] overflow-hidden rounded-[1.6rem]">{children}</div>
    </div>
  );
}
