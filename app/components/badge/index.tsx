// Small status label, e.g. "In development".
export default function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-[11px] font-medium text-accent">
      {children}
    </span>
  );
}
